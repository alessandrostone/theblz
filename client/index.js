/* global AFRAME, THREE */

const glsl = require('glslify');
const vertexShader = glsl.file('../shaders/vertex.glsl');
const fragmentShader = glsl.file('../shaders/fragment.glsl');
//const Tone = require('Tone');
//var player = require("Tone").Player;

var theplayer = require("Tone").player;
Tone.Transport.loop = true;
Tone.Transport.start(0);
console.log("sanity check");

/**var player = new Tone.Player({
  url: "https://cdn.glitch.com/e6e85513-e78c-4f1f-a548-e117d0e514d4%2Floop.mp3?1517704399354",
  loop: true
}).toMaster().sync().start(0);

Tone.Transport.loop = true;
Tone.Transport.start(0);
console.log("sanity check");
**/



AFRAME.registerComponent('funktion', {
  init: function () {
    
    // TODO : Replace this with accessing the global Buffer's bass.wav
    this.player = new Tone.Player({
        url: "https://cdn.glitch.com/e6e85513-e78c-4f1f-a548-e117d0e514d4%2Floop.mp3?1517704399354",
        loop: true
        
      }).toMaster().sync().start(0);
    
    this.player.autostart = true;
    
    //this.player = player;
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
    this.el.object3D.position.set(currentPosition.x, currentPosition.y, val * -32);
  }
})

