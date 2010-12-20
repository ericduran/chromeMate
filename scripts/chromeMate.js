/**
 * 
 *
 */
var chromeMate = {};

// Get the Bespin editor.

chromeMate.formatFile = function () {
  var file = new Object;
  file.data = editor.value; 
  file.name = 'adfs';
  return file;
}


chromeMate.openTab = function (id) {
  var file = webSql.webdb.getFile(id);
  console.log(file);
  var newTab = $('li');
  $("#tabs").append(newTab);
  return false;
}

chromeMate.loadFile = function (id) {
  var newTab = $('li');
  $("#tabs").append(newTab);
  var file = webSql.webdb.getFile(id);
  console.log(file);
  return false;
}


chromeMate.new = function () {
  $("#new").dialog({
  	modal: true,
  	buttons: {
			"Save": function() {
				var bValid = true;
				if ( bValid ) {
				  chromeMate.saveAs($("#new-name").val());
				  $("#new-name").val('');
				  $( this ).dialog( "close" );
				}
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
		}
		
  });
}

chromeMate.save = function (id) {
  
}

chromeMate.delete = function (id) {

}

chromeMate.saveAs = function (name) {
  console.log("Save as " + name);
}

chrome