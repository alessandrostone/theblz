/* global AFRAME, THREE */

const glsl = require('glslify');
const vertexShader = glsl.file('../shaders/vertex.glsl');
const fragmentShader = glsl.file('../shaders/fragment.glsl');
//const Tone = require('Tone');

var players = {};

var fileEnding = ".mp3";
var parts = [
    "bass",
    //"bell",
    //"high hit",
    //"low hit",
    "reverb"
];
var baseUrl = "https://andrescuervo.github.io/assets/chamber/mp3/";
console.log("PARTSssss", parts);
parts.forEach(function (part) {
  //console.log(baseUrl + part + fileEnding);
  var player = new Tone.Player({
  url: encodeURI(baseUrl + part + fileEnding),
  loop: true
}).toMaster().sync().start(0);
  players[part] = player;
}
);

Tone.Transport.loop = true;
Tone.Transport.start(0);
console.log("sanity check");

AFRAME.registerComponent('scale-on-bell', {
  /**
   * Creates a new THREE.ShaderMaterial using the two shaders defined
   * in vertex.glsl and fragment.glsl.
   */
  init: function () {
    // this.material  = new THREE.ShaderMaterial({
    //   uniforms: {
    //     time: { value: 0.0 },
    //     displaceBy: {value : 1.0},
    //     opacity: {value : 1.0}
    //   }      ,
    //   vertexShader,
    //   fragmentShader
    // });
    // this.el.addEventListener('model-loaded', () => this.update());    
    
    this.player = players["bell"];
    this.meter = new Tone.Meter("level");
    this.player.connect(this.meter);  
  },

  /**
   * Apply the material to the current entity.
   */
  update: function () {
    // const mesh = this.el.getObject3D('mesh');
    // if (mesh) {
    //   mesh.material = this.material;
    // }
  },

  /**
   * On each frame, update the 'time' uniform in the shaders.
   */
  tick: function (t) {
    let s = this.meter.value * 15
    //this.el.setAttribute('scale', `${s} ${s} ${s}`)
    // this.el.setAttribute('color', `hsl(240, 60%, ${val * 10}%)`)
    // this.el.setAttribute('color', `hsl(240, 60%, ${Math.floor(this.meter.value * 15)}%)`)
   this.el.setAttribute('color', `hsl(${Math.floor(360 / val)}, 60%, 80%)`)
  // this.el.setAttribute('color', `hsl(240, 60%, ${Math.floor(80 - (val * 4))}%)`)
    // console.log("%cscale-on-bell's components new scale value: " + val, `color: hsl( 340, 80%, ${val * 10}%)`)
  }
  
})

AFRAME.registerComponent('material-displacement', {
  /**
   * Creates a new THREE.ShaderMaterial using the two shaders defined
   * in vertex.glsl and fragment.glsl.
   */
  init: function () {
    this.material  = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        displaceBy: {value : 1.0},
        opacity: {value : 1.0}
      }      ,
      vertexShader,
      fragmentShader
    });
    this.el.addEventListener('model-loaded', () => this.update());    
    
    this.player = players["bass"];
    this.meter = new Tone.Meter("level");
    this.player.connect(this.meter);  
  },

  /**
   * Apply the material to the current entity.
   */
  update: function () {
    const mesh = this.el.getObject3D('mesh');
    if (mesh) {
      mesh.material = this.material;
    }
  },

  /**
   * On each frame, update the 'time' uniform in the shaders.
   */
  tick: function (t) {
    this.material.uniforms.time.value = t / 1000;
    
    
    var val = this.meter.value * 1005;
    this.el.object3D.scale.set(val,val,val);
    this.material.uniforms.displaceBy.value = val * 10;
    this.material.uniforms.opacity.value = val * 10.55;
    
    //console.log(val);
    var colorObject = this.el.components['material'].material.color;
    colorObject['g'] = val * 0.6;
    colorObject['b'] = val * 0.6;
  }
  
})


AFRAME.registerComponent('displace-model', {
  init: function () {
    
    // TODO : Replace this with accessing the global Buffer's bass.wav
    this.player = new Tone.Player({
        url: "https://andrescuervo.github.io/assets/chamber/parts/bass.wav",
        loop: true
      }).toMaster();
    
    //this.player.autostart = true;
    
    this.player = players["bass"];
    this.player.playbackRate /= 1;
    
    this.meter = new Tone.Meter("level");
    this.player.connect(this.meter);    
  },

  /**
   * Apply the material to the current entity.
   */
  update: function () {
    const mesh = this.el.getObject3D('mesh');
    if (mesh) {
      mesh.material = this.material;
    }
  },

  /**
   * On each frame, update the 'time' uniform in the shaders.
   */
  tick: function (t) {
    var val = this.meter.value;
    var currentPosition = this.el.object3D.position;
    this.el.object3D.position.set(currentPosition.x, currentPosition.y, val * 25);
  }
})