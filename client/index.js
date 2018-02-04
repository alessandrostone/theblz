/* global AFRAME, THREE */

const glsl = require('glslify');
const vertexShader = glsl.file('../shaders/vertex.glsl');
const fragmentShader = glsl.file('../shaders/fragment.glsl');
const quicksettings = require('quicksettings');
//require(["quicksettings"]);
$(document).ready(function(){
  var dist   = new Tone.Distortion(1.0).toMaster();
  var player = new Tone.Player({
        url: "https://cdn.glitch.com/e6e85513-e78c-4f1f-a548-e117d0e514d4%2Floop.mp3?1517704399354",
        loop: true
        
      }).connect(dist).sync();
  player.autostart = true;
     
  
  
  AFRAME.registerComponent('funktion', {
  init: function () {
  
  this.meter = new Tone.Meter("level");
  player.connect(this.meter);
  player.playbackRate /= 1;
  Tone.Transport.loop = true;
  Tone.Transport.start(0);
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
    
    var val = this.meter.value * 2;
    var currentPosition = this.el.object3D.position;
    this.el.object3D.position.set(currentPosition.x, currentPosition.y, val * 2);
  }
  
});
  
  
    function openSettings() {
  var panel1 = quicksettings.create(10, 10, "Panel 1")
		.addRange("Pitch", 0, 100, 0, 1, function(value) { setPitch(value)});
};
  var distWet = 0;
  function setPitch(value) {
  console.log(value);
    dist.wet.value = value / 100;
};
    $("#btn-sett").click(openSettings());
});


//console.log("sanity check");
// Component to change to random color on click.



