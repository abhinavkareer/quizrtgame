(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'],
		template = $.trim($("#tournamentTemplate").html())
	
	// ajax call to load json file
	$.getJSON('resources/tournament.json').done(function(data){

		var temp = $("#partofTournammentCarousel");
		
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
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				//.css("background-image" ,"url('images/" +item.image+ "') left top no-repeat")
				
				$container.find(".item.active")
						  .append(fragment);
				//console.log("url('images/" +item.image+ "') left top no-repeat");
				var temp = $container.find(".tournament").last()
							.css("background" ,"url('images/" +item.image+ "') left top no-repeat")
							.css("background-size" , "100% 100%")
							.find(".tournament-details")
							.css("background-color" , tile_colors[i%6]);
				//console.log($(".tournament").last().html());
				//addClass('tile-'+ (i%6));
				fragment ="";

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				//temp.addClass('tile-'+ (i%6));
				$container.find(".carousel-inner").append(temp);
				$container.find(".tournament").last()
							.css("background" ,"url('images/" +item.image+ "') no-repeat center fixed")
							.css("background-size" , "cover")
							.find(".tournament-details")
							.css("background-color" , tile_colors[i%6]);

				
				fragment = "";
			}else if(i%3 > 0){
				
				$container.find("div.item").last().append(fragment);
				$container.find(".tournament").last()
							.css("background" ,"url('images/" +item.image+ "') left top no-repeat")
							.css("background-size" , "cover")
							.find(".tournament-details")
							.css("background-color" , tile_colors[i%6]);
				
				fragment = "";
			}
		});

	}
})(jQuery);