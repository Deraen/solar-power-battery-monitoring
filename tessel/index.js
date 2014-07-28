var tessel = require('tessel');
var Ads1x15 = require('adc-ads1x15');

var port = tessel.port.D;
var adc = new Ads1x15(port, {
  address: 0x48,
  ic: 'ads1115'
});

// Hall effect sensor datasheet: http://files.panucatt.com/datasheets/cs50_100_200a_datasheet.pdf
var sens = 26; // mV/A, when Vdd = 3.3v

// The sensor should output 0.5*Vdd when no current is going through it.
// To provide comparison value I use resistive voltage divider (R1, R2 = 12kOhm), which
// should provide 0.5*Vdd to AIN1.
// Thus differential value of AIN0 and AIN1 should be from -0.5*Vdd to 0.5Vdd and 0 being no current.

// But for some(*) reason value is not quite 0 ever.
// *) Hall sensors might be quite sensitive and e.g. earths magnetic field might influence the value
// This value is quick and dirty way to balance the value.
// For proper solution there should be some way to automatically calibrate sensor...
// Problem: How to detect when there is no load?
var bias = 14.500;

setImmediate(function receive() {
  adc.readADCDifferential({chP: 0, chN: 1, pga: 4096, sps: 8}, function(err, result) {
    if (err) {
      console.log('error', err);
      return;
    }

    result += bias;
    var current = result / sens;

    console.log('received: ' + result + ' mV');
    console.log('current: ' + current + ' A');

    setTimeout(receive, 1000);
  });
});
