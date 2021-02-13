/* Les assets, on pourra plus tard ajouter des sons et des musiques */
const assetsToLoadURLs = {
    aileG: { url: "assets/images/aileG.png" },
    aileD: { url: "assets/images/aileD.png" },
    ailes: { url: "assets/images/ailes.png" },

    bouleFeu: { url: "assets/images/BoulesFeu.png" },
    pieces: { url: "assets/images/piece.png" },
    tresor: { url: "assets/images/tresor.png" },
    monstreImage: { url: "assets/images/monstre.png" },
    explosion: { url: "assets/images/explosionGIF.gif" },

    explosion: { url: "assets/images/explosionSprite.jpg" },

    //croissantHighlighted: { url: "assets/images/Croissant-Highlighted@2x.png" },
    

    //musique --> buffer: true (pour les streamer)
    //effet sonore --> buffer et loop : true 
   
    musique: {
      url:
        "assets/audios/musique.wav",
      buffer: true,
      loop: true,
      volume: 0.5,
    },
    coins: {
      url:
        "assets/audios/coins.wav",
      buffer: true,
      loop: false,
      volume: 1.0,
    },
    
    fire: {
      url:
        "assets/audios/fire.wav",
      buffer: true,
      loop: false,
      volume: 1.5,
    },
  };
  
  function loadAssets(callback) {
    // here we should load the souds, the sprite sheets etc.


    // then at the end call the callback function
    loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);

  }
  
  // You do not have to understand in details the next lines of code...
  // just use them!
  
  /* ############################
      BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
      files have been loaded and decoded 
   ############################## */
  function isImage(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  
  function isAudio(url) {
    return url.match(/\.(mp3|ogg|wav)$/) != null;
  }
  
  function loadAssetsUsingHowlerAndNoXhr(assetsToBeLoaded, callback) {
    var assetsLoaded = {};
    var loadedAssets = 0;
    var numberOfAssetsToLoad = 0;
  
    // define ifLoad function
    var ifLoad = function () {
      if (++loadedAssets >= numberOfAssetsToLoad) {
        callback(assetsLoaded);
      }
      console.log("Loaded asset " + loadedAssets);
    };
  
    // get num of assets to load
    for (var name in assetsToBeLoaded) {
      numberOfAssetsToLoad++;
    }
  
    console.log("Nb assets to load: " + numberOfAssetsToLoad);
  
    for (name in assetsToBeLoaded) {
      var url = assetsToBeLoaded[name].url;
      console.log("Loading " + url);
      if (isImage(url)) {
        assetsLoaded[name] = new Image();
  
        assetsLoaded[name].onload = ifLoad;
        // will start async loading.
        assetsLoaded[name].src = url;
      } else {
        // We assume the asset is an audio file
        console.log(
          "loading " + name + " buffer : " + assetsToBeLoaded[name].loop
        );
        assetsLoaded[name] = new Howl({
          src: [url],
          buffer: assetsToBeLoaded[name].buffer,
          loop: assetsToBeLoaded[name].loop,
          autoplay: false,
          volume: assetsToBeLoaded[name].volume,
          onload: function () {
            if (++loadedAssets >= numberOfAssetsToLoad) {
              callback(assetsLoaded);
            }
            console.log("Loaded asset " + loadedAssets);
          },
        }); // End of howler.js callback
      } // if
    } // for
  } // function