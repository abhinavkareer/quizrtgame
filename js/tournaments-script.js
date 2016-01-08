(function($){
	var tile_colors = ['#2672EC' , '#5133AB' , '#AC193D' , '#D24726' , '#008A00' , '#00A3A3'];
	$.getJSON('resources/tournament.json').done(function(data){
		var template = $.trim($("#tournamentTemplate").html()),
						fragment="";
		

		$.each( data.tournaments.playing, function( i, item ) {

			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				
				$("div #partofTournammentCarousel .item.active").append(fragment);
				var temp = $("div #partofTournammentCarousel .item.active div").last();
				
				//addClass('tile-'+ (i%6));
				fragment ="";

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				//temp.addClass('tile-'+ (i%6));
				$("#partofTournammentCarousel .carousel-inner").append(temp);
				
				fragment = "";
			}else if(i%3 > 0){
				
				$("#partofTournammentCarousel .carousel-inner div.item").last().append(fragment);
				
				fragment = "";
			}
		});


		//template = $.trim($("#createdTournamentsTemplate").html());
		fragment="";

		$.each( data.tournaments.created, function( i, item , array) {
			
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				
				$("#createdTournammentsCarousel .item.active").append(fragment);
				var temp = $("#createdTournammentsCarousel .item.active div").last();
				
				//addClass('tile-'+ (i%6));
				fragment ="";

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				//temp.addClass('tile-'+ (i%6));
				$("#createdTournammentsCarousel .carousel-inner").append(temp);
				
				fragment = "";
			}else if(i%3 > 0){
				
				$("#createdTournammentsCarousel div.item").last().append(fragment);
				
				fragment = "";
			}
		});

		
		fragment="";

		$.each( data.tournaments.history, function( i, item ) {
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				
				$("#playedTournammentsCarousel .item.active").append(fragment);
				var temp = $("#createdTournammentsCarousel .item.active div").last();
				
				//addClass('tile-'+ (i%6));
				fragment ="";

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				//temp.addClass('tile-'+ (i%6));
				$("#playedTournammentsCarousel .carousel-inner").append(temp);
				
				fragment = "";
			}else if(i%3 > 0){
				
				$("#playedTournammentsCarousel div.item").last().append(fragment);
				
				fragment = "";
			}
		});

		
	})
	.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
	});
})(jQuery);