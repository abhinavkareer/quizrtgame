(function($){
	
	$.getJSON('resources/tournament.json').done(function(data){
		var template = $.trim($("#myTournamentsTemplate").html()),
						fragment="";
		

		$.each( data.tournaments.playing, function( i, item ) {
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);

			if(i<3){
				$("div .item.active").append(fragment);
				fragment ="";

			}else if((i!= 0) && (i%3 == 0)){
				var temp= $("<div class='item'></div>").append(fragment);
				$("div .carousel-inner").append(temp);
				
				fragment = "";
			}
		});


		template = $.trim($("#createdTournamentsTemplate").html());
		fragment="";

		$.each( data.tournaments.created, function( i, item ) {
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);
		});


		$("#created_tournaments").append(fragment);

		template = $.trim($("#tournamentsHistoryTemplate").html());
		fragment="";

		$.each( data.tournaments.history, function( i, item ) {
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);
		});

		$("#tournaments_history").append(fragment);
	})
	.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
	});
})(jQuery);