//import TWEEN from 'tween.js';

export default {
  isDev: false,
  isShowingStats: true,
  isLoaded: false,
  isTweening: false,
  isRotating: false,//true,
  isMouseDown: false,
  isMouseMoving: false,
  isMouseOver: false,
  maxAnisotropy: 1,
  dpr: 1,
 // easing: TWEEN.Easing.Quadratic.InOut,
  duration: 500,
  mesh: {
    enableHelper: false,
    wireframe: false,
    translucent: false,
    material: {
      color: 0xffffff,
      emissive: 0xffffff
    }
  },
  fog: {
    color: 0x006BA6,//ffffff,
    near: 0.00008
  },
 camera: {
    fov: 40,
    near: 1,
    far: 2000,
    aspect: 1,
    posX: 0,
    posY: 0,
    posZ: 100
  },

  controls: {
    autoRotate: false,//true,
    autoRotateSpeed: -0.5,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    minDistance: 60,
    maxDistance: 600,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 2,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    enableDamping: true,
    dampingFactor: 0.5,
    enableZoom: true,
    target: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  ambientLight: {
    enabled: true,//false,
    color: 0x006BA6,//0x2028a7//0x141414
  },
  directionalLight: {
    enabled: true,
    color: 0x006BA6,//0x39397d,//0xc876a,//0xf0f0f0,
    intensity: 0.4,
    x: 266,//-75,
    y: 280,
    z: 150
  },
  shadow: {
    enabled: true,
    helperEnabled: false,//true,
    bias: 0,
    mapWidth: 2048,
    mapHeight: 2048,
    near: 250,
    far: 400,
    top: 100,
    right: 100,
    bottom: -100,
    left: -100
  },
  pointLight: {
    enabled: false,//true,
    color: 0xffffff,
    intensity: 0.34,
    distance: 115,
    x: 0,
    y: 0,
    z: 0
  },
  hemiLight: {
    enabled: false,//true,
    color: 0xc8c8c8,
    groundColor: 0xffffff,
    intensity: 0.55,
    x: 0,
    y: 0,
    z: 0
  }
};
