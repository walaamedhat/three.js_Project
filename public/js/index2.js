var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 250;

  // scene

  scene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  // model

  var onProgress = function ( xhr ) {

    if ( xhr.lengthComputable ) {

      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

    }

  };

  var onError = function () { };

  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader()
    mtlLoader.setTexturePath("models2/obj/male02/");
    mtlLoader.setPath("models2/obj/male02/");
    mtlLoader.load( 'male02_dds.mtl', function ( materials ) {

      materials.preload();

        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials( materials )
        objLoader.setPath("models2/obj/male02/");
        objLoader.load("male02.obj", function (object) {

          object.position.y = - 95;
          scene.add( object );

        }, onProgress, onError );

    } );

  // var mtlLoader = new THREE.MTLLoader();
  // mtlLoader.setTexturePath("models/test/");
  // mtlLoader.setPath("models/test/");
  // mtlLoader.load("3.mtl", function (materials) {
  //
  //     materials.preload();
  // //     // OBJECT LOADER
  //     var objLoader = new THREE.OBJLoader();
  //     objLoader.setMaterials(materials);
  //     objLoader.setPath("models/test/");
  //     objLoader.load("3.obj", function (object) {
  //         console.log(object, 'object');
  //         scene.add(object);
  //         object.position.y -= 20;
  //         scene.traverse(function(children){
  //           console.log(children, 'children');
  //           objects.push(children)
  //         });
  // //
  //     });
  // //
  // });

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}
