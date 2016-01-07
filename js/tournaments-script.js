(function($){
	
	$.getJSON('resources/tournament.json').done(function(data){
		var template = $.trim($("#myTournmentsTemplate").html()),
						fragment="";
		console.log(template);

		$.each( data.tournaments.playing, function( i, item ) {
			fragment += template.replace(/{{name}}/ig , item.name)
								.replace(/{{image}}/ig , "images/" +item.image)
								.replace(/{{prize}}/ig , "$" +item.prize)
								.replace(/{{topic}}/ig , item.topic);
		});

		$("#myTournments").append(fragment);
	})
	.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
	});
})(jQuery);