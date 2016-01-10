var quizRTData = {
	'teamsData': '',
	'displaySize': '',
	'teamTemplates':{}
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
			var key = rows[i];
      var rowTemplateElement = $( ('#' + key) ); // json 'key' should match html 'id'
			if ( rowTemplateElement.length ) {
				var teamTemplateObj = {};
				if( !quizRTData.teamTemplates.hasOwnProperty(key) )
					quizRTData.teamTemplates[key] = rowTemplateElement; // Save the templates for dynamic reconstruction of tiles
			} else{
				if ( quizRTData.teamTemplates.hasOwnProperty(key) ) {
						rowTemplateElement = quizRTData.teamTemplates[key];
				}else {
					console.log('Template for ' + rows[i] + ' is not available. Skipping the construction.');
				}
			}

			if( rowTemplateElement.length ) {
        var teamsInRow = data[ key ],
            noOfTeams = teamsInRow.length,
            rowTemplateHtml = rowTemplateElement.html();
				if ( noOfTeams > 0 ) {
					var splitContent = [],
							index,
							rowCarousel = rowTemplateElement.closest('.carousel'),
							carouselIndicatorContainer  = rowCarousel.find('.carousel-indicators').html('');
					var viewPortWidth = $(window).width() ;
					for (var j = 0; j < noOfTeams; j++) {
						if( viewPortWidth > 992 ) { // if width > 992 display 4 tiles in a row
							index = parseInt(j/4) ;
							quizRTData.displaySize = 'large';
						}else if( viewPortWidth > 767 ) { // display 3 tiles in a row
							index = parseInt(j/3) ;
							quizRTData.displaySize = 'medium';
						}else { // display 2 tiles in a row
							index = parseInt(j/2) ;
							quizRTData.displaySize = 'small';
						}
						var teamTile = rowTemplateHtml;
						teamTile = teamTile.replace(/{{image}}/ig, 'images/team-icons/' + teamsInRow[j].icon )
															 .replace(/{{name}}/ig, teamsInRow[j].teamName );
						splitContent[index] != undefined ? splitContent[index].push(teamTile) : splitContent[index] = [teamTile];
					} // End for
					/*   Clear the containers before appending any DOM Elements  */
					var rowCarouselInner = rowTemplateElement.closest('.carousel-inner'),
							rowItem = rowTemplateElement.closest('.item'),
					rowCarouselInner = rowCarouselInner.html('');

					for (var a = 0; a < splitContent.length; a++) {
						var newRowItem = rowItem.clone(true);
						newRowItem = newRowItem.html('');
						// Create the carousel indicators
						var indicator = $('<li data-target="#' + rowCarousel.attr('id') + '" data-slide-to="' + a + '"></li>');

						console.log("a = " + a);
						if (a == 0) {
							newRowItem.addClass('active'); // To make the first slide visible
							indicator.addClass('active');
							for (var b = 0; b < splitContent[a].length; b++) {
								newRowItem.append( splitContent[a][b] );
							}
							console.log(newRowItem);
							rowCarouselInner.append( newRowItem );
						} else {
							// var newItem = rowItem.clone(true).html('');
							newRowItem.removeClass('active');
							for (var b = 0; b < splitContent[a].length; b++) {
								newRowItem.append( splitContent[a][b] );
							}
							console.log(newRowItem);
							rowCarouselInner.append( newRowItem );
						}
						carouselIndicatorContainer.append( indicator ); // add the indicator to the container
						if( a == 0 ) {
							carouselIndicatorContainer.hide();
							carouselIndicatorContainer.siblings('.carousel-control').hide();
						}else {
							carouselIndicatorContainer.show();
							carouselIndicatorContainer.siblings('.carousel-control').show();
						}
					}
				}else {
					rowTemplateElement.closest('.carousel').html("").append( noData );
				}
      }
    }// end for
	} // End constructRowsAndTiles

	$('#btnRedraw').on('click', function () {
		forceRedraw($('.carousel-inner .item').eq(0)[0]);
	});

	var forceRedraw = function ( element ) {
		if( !element )
			return;

		var n = document.createTextNode(' ');
		var disp = element.style.display;
		element.appendChild(n);
		element.style.display = 'none';
		setTimeout( function() {
			element.style.display = disp;
			n.parentNode.removeChild(n);
		}, 20 );
	};
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
		if( ($(window).width() > 992) && quizRTData.displaySize && (quizRTData.displaySize != 'large') ) {
			console.log("large");
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'large';
		}else if( ($(window).width() > 768) && quizRTData.displaySize && ($(window).width() < 993) && (quizRTData.displaySize != 'medium') ) {
			console.log("medium");
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'medium';
		}else if( $(window).width() < 769 && quizRTData.displaySize && quizRTData.displaySize != 'small' ){
			console.log("small");
			quizRTData.teamsData ? constructRowsAndTiles( quizRTData.teamsData ) : console.log('Teams Data is undefined');
			quizRTData.displaySize = 'small';
		}
	});

})(jQuery);
