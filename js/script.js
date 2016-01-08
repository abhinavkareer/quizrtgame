(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'];
	$.getJSON('resources/user1_teams.json').done( function(data) {
    var rows = Object.keys(data),
        len = rows.length;

    for (var i = 0; i < len; i++) {
      var rowTemplate = $( ('#' + rows[i]) );
      if( rowTemplate ) {
        var teamsInRow = data[ rows[i] ],
            noOfTeams = teamsInRow.length,
            rowTemplateHtml = $.trim(rowTemplate.html());

        for (var j = 0; j < noOfTeams; j++) {
          var teamTile = rowTemplateHtml;
          teamTile = teamTile.replace(/{{image}}/ig, 'images/team-icons/' + teamsInRow[j].icon ) //'images/team-icons/team_default_64x64.png'
                             .replace(/{{name}}/ig, teamsInRow[j].teamName );

          rowTemplate.closest('.row').append( teamTile );
        }
      }
    }
  });
})(jQuery);
