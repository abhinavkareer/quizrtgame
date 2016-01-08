(function () {
  // var fs = require("fs");
  //
  // console.log("Started reading file " + file );
  // var rawData = fs.readFileSync( file );
  // console.log("Completed reading file " + file );
  // rawData = rawData.toString();
  // console.log(JSON.parse(rawData));
  console.log("Started");
  var file = "resources/user1_teams.json";
  $.getJSON( file, function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
console.log(data);
  $( "<ul>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
})();
console.log("executing");
