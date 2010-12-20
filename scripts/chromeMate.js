/**
 * 
 *
 */
var chromeMate = {};

// Show menu when a list item is clicked
chromeMate.attachContextMenu = function () {
  $("#drawer ul li").contextMenu({
  	menu: 'rightMenu'
  }, chromeMate.rightClick);
}

// Get the Bespin editor.
chromeMate.rightClick = function (action, el, pos) {
  var fid = $(el).attr('data-fid');
  if(action == 'delete') {
    chromeMate.delete(fid, el);
  }
}

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

chromeMate.save = function (fid) {
  console.log("Save fid " + name);
}

chromeMate.delete = function (fid, element) {
  $( "#dialog-confirm" ).dialog({
		resizable: false,
		height: 140,
		modal: true,
		buttons: {
			"Delete": function() {
			  webSql.webdb.deleteFile(fid);
			  element.remove();
				$(this).dialog("close");
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
}

chromeMate.saveAs = function (name) {
  console.log("Save as " + name);
}

chrome