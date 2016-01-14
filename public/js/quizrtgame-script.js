(function () {

    // To select the backgrounds randomly
    var url = 'url(images/backgrounds/' + Math.floor(Math.random()*3) + '.png)';
    document.body.style.backgroundImage = url;

  })();
