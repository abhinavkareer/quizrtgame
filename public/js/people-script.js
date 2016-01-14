(function(){

  var jsonDataFile = "/getHallOFFameJson",
  template = $.trim($("#stackTemplate").html()),
          fragment="";
  $.getJSON(jsonDataFile,function(data){



    $.each( data, function( i, item ) {
        console.log(data);
      if(i<15)
      fragment += template.replace(/{{name}}/ig , item.name)
                .replace(/{{img}}/ig , item.img)
                .replace(/{{points}}/ig ,  item.points)
                .replace(/{{games}}/ig , item.games)
                .replace(/{{badge}}/ig , item.badge)
                .replace(/{{win}}/ig , item.win)
                .replace(/{{cat}}/ig , item.cat)
                .replace(/{{rank}}/ig , i+1);
    });



    $("#content").append(fragment);


		});


})();
