/**
 * 
 *
 */
var webSql = {};
webSql.webdb = {};

webSql.webdb.db = null;

webSql.webdb.open = function() {
  var dbSize = 10 * 1024 * 1024; // 10MB
  webSql.webdb.db = openDatabase('chromeMate', '1.0', 'Editor for Chrome', dbSize);
}

webSql.webdb.onError = function(tx, e) {
  alert('There was an error: ' + e.message );
}

webSql.webdb.onSuccess = function(tx, r) {
  // re-render all the data
  webSql.webdb.getAllFiles(loadFileItems);
}

webSql.webdb.createTable = function() {
  webSql.webdb.db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 
                  'files(ID INTEGER PRIMARY KEY ASC, name TEXT, content TEXT, added_on DATETIME, updated_on DATETIME)', []);
  });
}

webSql.webdb.newFile = function(file) {
  webSql.webdb.db.transaction(function(tx){
    var addedOn = new Date();
    tx.executeSql('INSERT INTO files(name, content, added_on, updated_on) VALUES (?,?,?,?)', 
        [file.name, file.data, addedOn, addedOn],
        webSql.webdb.onSuccess,
        webSql.webdb.onError);
    });
}

webSql.webdb.getAllFiles = function(renderFunc) {
  webSql.webdb.db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM files', [], renderFunc, 
        webSql.webdb.onError);
  });
}

webSql.webdb.getFile = function(id) {
  webSql.webdb.db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM files where ID=?', [id], loadFile, 
        webSql.webdb.onError);
  });
}

webSql.webdb.deleteFile = function(id) {
  webSql.webdb.db.transaction(function(tx) {
    tx.executeSql('DELETE FROM files WHERE ID=?', [id],
        loadFileItems, webSql.webdb.onError);
  });
}

function loadFile(tx, rs) {
  if (rs.rows.length) {
   console.log(rs.rows); 
  }
}

function loadFileItems(tx, rs) {
  var rowOutput = "";
  for (var i=0; i < rs.rows.length; i++) {
    $("#fileList").append(renderTodo(rs.rows.item(i)));
  }
}

function renderTodo(row) {
  return '<li><a href="#" onclick="chromeMate.loadFile('+row.ID+')">' + row.name  +'</a></li>';
}


function addFile() {
  var file = chromeMate.formatFile();

  webSql.webdb.newFile(file);
  file.content = '';
}