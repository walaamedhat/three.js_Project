var objects = []
//SCENE
var scene = new THREE.Scene();

//RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-2, window.innerHeight-5 );
document.body.appendChild( renderer.domElement );
// document.addEventListener( 'mousedown', onDocumentMouseDown);

//CAMERA
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 30;

// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 1.80
controls.enableZoom = true

//LIGHTS
var frontLight = new THREE.DirectionalLight(0xffffff, 1.0)
frontLight.position.set(100, 0, 100).normalize()
var backLight = new THREE.DirectionalLight(0xffffff, 1.0)
backLight.position.set(100, 0, -100).normalize()
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
scene.add(frontLight)
scene.add(backLight)

// MODEL/MATERIAL LOADING!
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath("models/test/");
mtlLoader.setPath("models/fullKidny/");
mtlLoader.load("full kidny.mtl", function (materials) {

    materials.preload();
//     // OBJECT LOADER
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("models/fullKidny/");
    objLoader.load("full kidny.obj", function (object) {
        console.log(object, 'object');
        scene.add(object);
        object.position.y -= 20;
        object.addEventListener( 'mousedown', onDocumentMouseDown);
        scene.traverse(function(children){
          objects.push(children)
        });
//
    });
//
});

//// mouse picking
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onDocumentMouseDown( event ) {
    event.preventDefault();
    console.log('hello');

     var mouseX = (event.clientX / window.innerWidth)*2-1;
     var mouseY = -(event.clientY /window.innerHeight)*2+1;
     raycaster.setFromCamera(mouse, camera)
     // var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
     // projector.unprojectVector( vector, camera );
     // var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
     // var intersects = raycaster.intersectObjects( scene.children );
     var intersects = raycaster.intersectObjects( objects);
     console.log(intersects);
     var color = '0xffffff'
    // event.preventDefault();

    // find intersections
    // _mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // _mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    //
    // var vector = new THREE.Vector3( _mouse.x, _mouse.y, 1 );
    //
    // var ray = _projector.pickingRay( vector, camera );
    //
    // var intersects = ray.intersectObjects( scene.children );
    //
    if ( intersects.length > 0 ) {
      // console.log(intersects[0],'intersects[0]');
      // console.log(scene,'scene');
      // controls.enabled = false;
      scene.remove(scene.children[3])
      // let camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      // camera2.position.z = 30;
      // let controls2 = new THREE.OrbitControls(camera2, renderer.domElement)
      // controls2.enableDamping = true
      // controls2.campingFactor = 0.25
      let mtlLoader = new THREE.MTLLoader();
      mtlLoader.setTexturePath("models/test/");
      mtlLoader.setPath("models/test/");
      mtlLoader.load("part1.mtl", function (materials) {
          materials.preload();
          var objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath("models/test/");
          objLoader.load("part1.obj", function (object) {
              console.log(object, 'object');
              scene.add(object);
              object.position.y -= 5;
              camera.position.z = 10;
          });
      //
      });
      // if (intersects[0].faceIndex === 1818) {
      //   console.log(scene,'scene');
      // }

    }
}


var controlers = new function () {
  console.log('hi');
    this.digestiveSystem = false ;
    this.urinarySystem = true;
    this.fullKidny = false;
    this.rotSpeed = 0.005;
};

var gui = new dat.GUI();
gui.add(controlers, 'rotSpeed', -0.1, 0.1);
const digestiveSystem = gui.addFolder('الجهاز الهضمي')
digestiveSystem.add(controlers, 'digestiveSystem').name('الجهاز الهضمي كاملاَ').listen().onChange(function (e) {
    controlers.urinarySystem = !controlers.digestiveSystem
    controlers.fullKidny = !controlers.digestiveSystem
    scene.remove(scene.children[3]);

    // MODEL/MATERIAL LOADING!
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath("models/DigestiveSystem/");
    mtlLoader.setPath("models/DigestiveSystem/");
    mtlLoader.load("The digestive system is full.mtl", function (materials) {
        materials.preload();
    //     // OBJECT LOADER
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("models/DigestiveSystem/");
        objLoader.load("The digestive system is full.obj", function (object) {
            console.log(object, 'object');
            scene.add(object);
            object.position.y -= 3;
            camera.position.z = 5;
        });
    });

});
const urinarySystem = gui.addFolder('الجهاز البولي')
urinarySystem.add(controlers, 'urinarySystem').name('الجهاز البولي كاملاَ').listen().onChange(function (e) {
    controlers.digestiveSystem = !controlers.urinarySystem
    controlers.fullKidny = !controlers.urinarySystem
    console.log(controlers, 'controlers');
    scene.remove(scene.children[3]);
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath("models/test/");
    mtlLoader.setPath("models/test/");
    mtlLoader.load("3.mtl", function (materials) {

        materials.preload();
    //     // OBJECT LOADER
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("models/test/");
        objLoader.load("3.obj", function (object) {
            console.log(object, 'object');
            scene.add(object);
            object.position.y -= 20;
            camera.position.z = 30;
        });
    //
    });


});

urinarySystem.add(controlers, 'fullKidny').name('الكلية').listen().onChange(function (e) {
    controlers.digestiveSystem = !controlers.fullKidny
    controlers.urinarySystem = !controlers.fullKidny
    console.log(controlers, 'controlers');
    scene.remove(scene.children[3]);
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath("models/onlyKidny/");
    mtlLoader.setPath("models/onlyKidny/");
    mtlLoader.load("only kidny.mtl", function (materials) {

        materials.preload();
    //     // OBJECT LOADER
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath("models/onlyKidny/");
        objLoader.load("only kidny.obj", function (object) {
            console.log(object, 'object');
            scene.add(object);
            object.position.y -= 20;
            camera.position.z = 30;
        });
    //
    });


});

var animate = function () {
	requestAnimationFrame( animate );

	controls.update()

	renderer.render(scene, camera);
};

animate();
