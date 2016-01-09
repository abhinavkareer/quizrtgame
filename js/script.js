var quizRTData = {
	'teamsData': '',
	'displaySize': ''
};

(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'];
	$.getJSON('resources/user1_teams.json').done( function(data) {
		quizRTData.teamsData = data;
		constructRowsAndTiles( data );
  });

	function constructRowsAndTiles( data ) {
		var rows = Object.keys(data),
        len = rows.length,
				noData = $('<p>').css('color','red')
												 .css('font-style', 'italic')
												 .html('No Data Found');

    for (var i = 0; i < len; i++) {
      var rowTemplateElement = $( ('#' + rows[i]) ); // json 'key' should match html 'id'
      if( rowTemplateElement ) {
        var teamsInRow = data[ rows[i] ],
            noOfTeams = teamsInRow.length,
            rowTemplateHtml = rowTemplateElement.html();
				if ( noOfTeams > 0 ) {
					var splitContent = [],
							index,
							rowCarousel = rowTemplateElement.closest('.carousel'),
							carouselIndicatorContainer  = rowCarousel.find('.carousel-indicators');

					for (var j = 0; j < noOfTeams; j++) {
						if( $(window).width() > 992 ) { // if width > 992 display 4 tiles in a row
							index = parseInt(j/4) ;
						}else if( $(window).width() > 767 ) { // display 3 tiles in a row
							index = parseInt(j/3) ;
						}else { // display 2 tiles in a row
							index = parseInt(j/2) ;
						}
						var teamTile = rowTemplateHtml;
						teamTile = teamTile.replace(/{{image}}/ig, 'images/team-icons/' + teamsInRow[j].icon )
															 .replace(/{{name}}/ig, teamsInRow[j].teamName );
						splitContent[index] != undefined ? splitContent[index].push(teamTile) : splitContent[index] = [teamTile];
					} // End for


					for (var a = 0; a < splitContent.length; a++) {
						// Create the carousel indicators
						var indicator = $('<li data-target="#' + rowCarousel.attr('id') + '" data-slide-to="' + a + '"></li>');

						if (a == 0) {
							rowTemplateElement.closest('.item').addClass('active'); // To make the first slide visible
							indicator.addClass('active');
							for (var b = 0; b < splitContent[a].length; b++) {
								rowTemplateElement.closest('.item').append( splitContent[a][b] );
							}
						} else {
							var newItem = rowTemplateElement.closest('.item').clone(true);
							newItem.removeClass('active').html("");
							for (var b = 0; b < splitContent[a].length; b++) {
								newItem.append( splitContent[a][b] );
							}
							rowTemplateElement.closest('.carousel-inner').append( newItem );
						}
						carouselIndicatorContainer.append( indicator ); // add the indicator to the container
					}
				}else {
					rowTemplateElement.closest('.carousel').html("").append( noData );
				}
      }
    }// end for
	} // End constructRowsAndTiles


	/*...........................................................................
			Event handlers for Next and Back buttons in createTeamModal window
..............................................................................*/

	var modalBodyElements = $('#createTeamModal').find('.modal-body'),
			noOfModalBodyElements = modalBodyElements.length,
			pos = 0;
	$('#btnNextCreateTeamModal').on( 'click', function() {
		// runs the loop only till penultimate member.
		for (var i = pos; i < noOfModalBodyElements-1; i++) { // last modal-body should not be slided next (hence noOfModalBodyElements-1)
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
		for (var i = noOfModalBodyElements-1; i > 0; i--) { // first modal-body should not be slided back
			var $modalBody = $( modalBodyElements[i] );
			if( pos == $modalBody.data('pos')) {
				$modalBody.slideUp();
				$modalBody.prev('.modal-body').slideDown();
				pos--;
				break;
			}
		}
	});

	// Reconstruct the page when break-points are encountered eg. width == 992px, width == 767px
	$(window).on('resize', function() {
		if( ($(window).width() > 992) && (quizRTData.displaySize != 'large') ) {
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'large';
		}else if( ($(window).width() > 767) && ($(window).width() < 993) && (quizRTData.displaySize != 'medium') ) {
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'medium';
		}else if( $(window).width() < 768 && quizRTData.displaySize != 'small' ){
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'small';
		}
	});

})(jQuery);
