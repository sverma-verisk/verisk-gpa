import * as THREE from 'three';

import Keyboard from '../../utils/keyboard';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';

// Manages all input interactions
export default class Interaction {
  constructor(renderer, scene, camera, controls, spinner) {
    // Properties
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.spinner = spinner;

    this.timeout = null;

    this.mouse = new THREE.Vector2();
    this.mouse.moved = false;

    // Instantiate keyboard helper
    this.keyboard = new Keyboard();

    this.startPoint = {
        x: 0,
        y: 0
      };

    this.lastMoveTimestamp = new Date();
    this.moveReleaseTimeDelta = 50;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    // Listeners
    // Mouse events
  //  this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.onMouseMove(event), 250), false);
  //  this.renderer.domElement.addEventListener('mouseleave', (event) => this.onMouseLeave(event), false);
  //  this.renderer.domElement.addEventListener('mouseover', (event) => this.onMouseOver(event), false);

    this.renderer.domElement.addEventListener('touchstart', (event) => this.mousedown(event), false);
    this.renderer.domElement.addEventListener('mousedown', (event) => this.mousedown(event), false);

   // this.renderer.domElement.addEventListener('touchmove', (event) => Helpers.throttle(this.mousedown(event), 250), false);
   // this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.mousedown(event), 250), false);
   
    this.renderer.domElement.addEventListener('touchmove', (event) => this.mousedown(event), false);
    this.renderer.domElement.addEventListener('mousemove', (event) => this.mousedown(event), false);
   


    this.renderer.domElement.addEventListener('touchend', (event) => this.mouseup(event), false);
    this.renderer.domElement.addEventListener('mouseup', (event) => this.mouseup(event), false);


    // Keyboard events
    this.keyboard.domElement.addEventListener('keydown', (event) => {
      // Only once
      if(event.repeat) {
        return;
      }

      if(this.keyboard.eventMatches(event, 'escape')) {
        console.log('Escape pressed');
      }
    });
  }


  mousedown(event) {
    console.error('DOWN')
        event.preventDefault();
        this.getMousePos(event);

        Config.isMouseDown = true;

          if ( event.changedTouches ) {
            this.startPoint = {
                    x:event.changedTouches[ 0 ].pageX,
                    y:event.changedTouches[ 0 ].pageY
                  }

          } else {
            this.startPoint = {
              x: event.clientX,
              y: event.clientY
            }

          }

        //  if (targSpinner){
          this.spinner.rotateStartPoint = this.spinner.rotateEndPoint = this.spinner.projectOnTrackball(0, 0);

      //    console.log(this.spinner.rotateStartPoint)
        //  }

       //   checkIntersection()

/*
        if ( INTERSECTED ) {
          INTERSECTED.mesh.material.uniforms.color.value.offsetHSL(0,0,-0.35); // darken
  //        orbitControls.enabled = false;
        }

        */
  }

  mousemove(event){
        event.preventDefault();
      //  if ( !mouse.moved ) mouse.moved = true;
        // normalized device coordinates
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.getMousePos(event);

          if (Config.isMouseDown){
           // if (targSpinner){
                if ( event.changedTouches ) {
                
                    this.spinner.setDeltaX = event.changedTouches[ 0 ].pageX - this.startPoint.x;
                    this.spinner.setDeltaY = event.changedTouches[ 0 ].pageY - this.startPoint.y;

                    this.spinner.handleRotation();
              

                    this.startPoint.x = event.changedTouches[ 0 ].pageX;
                    this.startPoint.y = event.changedTouches[ 0 ].pageY;

                  } else {
                  
                    this.spinner.setDeltaX = event.x - this.startPoint.x;
                    this.spinner.setDeltaY = event.y - this.startPoint.y;

                    this.spinner.handleRotation();
               
                    this.startPoint.x = event.x;
                    this.startPoint.y = event.y;

                  }
             // }




            }

/*
            clearTimeout(this.timeout);

            this.timeout = setTimeout(function() {
              Config.isMouseMoving = false;
            }, 200);
*/
       //     Config.isMouseDown = true;

          //  checkIntersection();

            

          this.lastMoveTimestamp = new Date();

  }

  mouseup(event) {
    console.error('UP')
      event.preventDefault();
      /*
      if ( INTERSECTED ) {
        INTERSECTED.mesh.material.uniforms.color.value.setHex( INTERSECTED.currentHex );
        INTERSECTED.mesh.material.uniforms.color.value.offsetHSL(0,0,0.25);
      }
      */
//        orbitControls.enabled = true;

   //   if (targSpinner){
      //  console.log(this.lastMoveTimestamp)
      //  console.log(this.lastMoveTimestamp.getTime())

          if (new Date().getTime() - this.lastMoveTimestamp.getTime() > this.moveReleaseTimeDelta)
          {
            this.spinner.setDeltaX = event.x - this.startPoint.x;
            this.spinner.setDeltaY = event.y - this.startPoint.y;
          }
    //    }

        Config.isMouseDown = false;
    }
/*
  onMouseOver(event) {
    event.preventDefault();

    Config.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();

    Config.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function() {
      Config.isMouseMoving = false;
    }, 200);

    Config.isMouseMoving = true;
  }
*/

  getMousePos(event){
        var x, y;


        if ( event.changedTouches ) {

          x = event.changedTouches[ 0 ].pageX;
          y = event.changedTouches[ 0 ].pageY;

        } else {

          x = event.clientX;
          y = event.clientY;

        }

        //console.log(x)

        this.mouse.x = ( x / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( y / window.innerHeight ) * 2 + 1;
    //    console.log(this.mouse.y.toFixed(2))



          
      }
}
