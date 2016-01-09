(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'];
	$.getJSON('resources/user1_teams.json').done( function(data) {
    var rows = Object.keys(data),
        len = rows.length,
				noData = $('<p>').css('color','red')
												 .css('font-style', 'italic')
												 .html('No Data Found');

    for (var i = 0; i < len; i++) {
      var rowTemplateElement = $( ('#' + rows[i]) );
      if( rowTemplateElement ) {
        var teamsInRow = data[ rows[i] ],
            noOfTeams = teamsInRow.length,
            rowTemplateHtml = $.trim(rowTemplateElement.html());
				if ( noOfTeams > 0 ) {
					for (var j = 0; j < noOfTeams; j++) {
	          var teamTile = rowTemplateHtml;
	          teamTile = teamTile.replace(/{{image}}/ig, 'images/team-icons/' + teamsInRow[j].icon )
	                             .replace(/{{name}}/ig, teamsInRow[j].teamName );

	          rowTemplateElement.closest('.row').append( teamTile );
	        }
				}else {
					rowTemplateElement.closest('.row').append( noData );
				}

      }
    }
  });

	var modalBodyElements = $('#createTeamModal').find('.modal-body'),
			noOfModalBodyElements = modalBodyElements.length,
			pos = 0;
	$('#btnNextCreateTeamModal').on( 'click', function() {
		// runs the loop only till penultimate member.
		for (var i = pos; i < noOfModalBodyElements-1; i++) { // last modal-body should not be slided (hence noOfModalBodyElements-1)
			var $modalBody = $( modalBodyElements[i] );
			if( pos == $modalBody.data('pos')) {
				$modalBody.slideUp();
				$modalBody.next('.modal-body').slideDown();
				pos++;
				break;
			}
		}
	});
	$('#btnBackCreateTeamModal').on( 'click', function() {
		// runs the loop only till first member.
		for (var i = noOfModalBodyElements-1; i > 0; i--) { // first modal-body should not be slided
			var $modalBody = $( modalBodyElements[i] );
			if( pos == $modalBody.data('pos')) {
				$modalBody.slideUp();
				$modalBody.prev('.modal-body').slideDown();
				pos--;
				break;
			}
		}
	});


})(jQuery);
