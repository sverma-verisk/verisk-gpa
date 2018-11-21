// Global imports -
import * as THREE from 'three';
//import TWEEN from 'tween.js';
import { TweenMax } from 'gsap';

// Local imports -
// Components
import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';
import Controls from './components/controls';

// Helpers
//import Geometry from './helpers/geometry';
import SVGLoader from './../utils/SVGLoader';
//import Stats from './helpers/stats';


// Managers
//import Interaction from './managers/interaction';
//import DatGUI from './managers/datGUI';

// data
import Config from './../data/config';
// -- End of imports



// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
    
    constructor(container) {


        // Set container property to container element
        this.container = container;
        this.rotSpeed = .005;
        this.slowDown = false;
        this.group = new THREE.Group();
        var _this = this;

        // Main scene creation
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

        // Main renderer constructor
        this.renderer = new Renderer(this.scene, container);


        // Components instantiations
        this.camera = new Camera(this.renderer.threeRenderer);
        this.controls = new Controls(this.camera.threeCamera, container);
        this.controls.threeControls.enabled = false;


        this.camera.threeCamera.lookAt(0, 0, 0)
        //  this.camera.threeCamera.position.set(-10, 0, -200)
        /*
            // Create and place lights in scene
            const lights = ['ambient', 'directional', 'point', 'hemi'];
            lights.forEach((light) => this.light.place(light));
        */


        // Everything is now fully loaded
        Config.isLoaded = true;
        this.container.querySelector('#loading').style.display = 'none';
        var mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, color: 0xFFFFFF, side: THREE.DoubleSide });
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), mat);
        this.scene.add(this.plane)
        this.plane.rotation.y = Math.PI / 2;
        this.plane.position.z = -4;


        // load ring svg

        var loader = new THREE.SVGLoader();
        loader.load('./assets/img/segment-circle15.svg', function(paths) {
            //  var group = new THREE.Group();
            _this.group.scale.multiplyScalar(0.25);
            _this.group.position.x = -75; //- 75;
            _this.group.position.y = 75;
            // _this.group.position.z = 75;
            _this.group.scale.y *= -1;
            //   _this.group.rotation.y = Math.PI / 2;

            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                var material = new THREE.MeshBasicMaterial({
                    color: path.color,
                    side: THREE.DoubleSide,
                    depthWrite: false
                });
                var shapes = path.toShapes(true);

                for (var j = 0; j < shapes.length; j++) {
                    var shape = shapes[j];

                    var geometry = new THREE.ShapeBufferGeometry(shape);
                    var mesh = new THREE.Mesh(geometry, material);

                    _this.group.add(mesh);
                }
            }

            _this.plane.add(_this.group);
        });


        // Start render which does not wait for model fully loaded
        this.render();



        TweenMax.to(this.camera.threeCamera.position, 4, {
            x: -180,
            y: 0,
            z: 0,
            delay: 1,
            ease: "Power3.easeInOut",
            onComplete: function() {
                _this.slowDown = true;
            }

        })



    }


    hideBoxes() {
        TweenMax.to(this.camera.threeCamera.position, 4, {
            x: 0,
            y: 0,
            // z: 300,
            //   delay: 1,
            ease: "Power3.easeOut"

        })
    }

    showBoxes() {
        TweenMax.to(this.camera.threeCamera.position, .5, {
            x: -200,
            y: 0,
            z: 0,
            //   delay: 1,
            ease: "Power3.easeOut"

        })
    }

    render() {

        // Call render function and pass in created scene and camera
        this.renderer.render(this.scene, this.camera.threeCamera);
        this.camera.threeCamera.lookAt(0, 0, 0)
        /*
            // rStats has finished determining render call now
            if(Config.isDev && Config.isShowingStats) {
              Stats.end();
            }
        */

        //   this.controls.threeControls.update();

        if (this.slowDown) {
            if (this.rotSpeed > 0) this.rotSpeed -= .00005;
        }


        this.plane.rotation.x += this.rotSpeed;


        // RAF
        requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
    }
}
