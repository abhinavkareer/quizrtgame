(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'],
		template = $.trim($("#tournamentTemplate").html());
	
	// ajax call to load json file
	$.getJSON('resources/tournament.json').done(function(data){

		// update partOfTournament Carousel
		updateCarousel( $("#partofTournammentCarousel"), template, data.tournaments.playing);
		
		// update created Tournament Carousel
		updateCarousel( $("#createdTournammentsCarousel"), template, data.tournaments.created);

		// update played Tournament Carousel
		updateCarousel( $("#playedTournammentsCarousel"),template ,  data.tournaments.history);
	
	})
	// failure callback
	.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    alert("Request Failed: " + err );
    console.log( "Request Failed: " + err );
	});

	function updateCarousel($container , template , data){
		var fragment ="";
		
		$.each( data, function( i, item ) {
			fragment = template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				
				$container.find(".item.active").append(fragment);

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				$container.find(".carousel-inner").append(temp);

			}else if(i%3 > 0){
				$container.find("div.item").last().append(fragment);
			}

			$container.find(".tournament").last()
							.css("background" ,"url('images/" +item.image+ "') left top no-repeat")
							.css("background-size" , "100% 100%")
							.find(".tournament-details")
							.css("background-color" , tile_colors[i%6]);
		});

	}
})(jQuery);