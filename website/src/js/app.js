var vinElem = document.getElementById('vin');
gm.info.getVehicleConfiguration(function(data) {
  var VIN = gm.info.getVIN();
  console.log(VIN);
});
