const QuickSettings = require('quicksettings');
function openSettings() {
  var panel1 = QuickSettings.create(10, 10, "Panel 1")
		.addRange("Pitch", 0, 100, 0, 1, function(value) { setPitch(value)});
}
function setPitch(value) {
  console.log(value);
}