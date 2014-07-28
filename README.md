# Solar-power-battery-monitoring

Tessel project to monitor battery load status using Hall-effect sensor.

We have samll off-the-grid solar power system at our summer cottage which
provides electricity for LED-lights and devices. I have explored ways
to monitor this system as a hobby.

This repository might in future contain software for this monitoring system.
Readme contains description of the solar power and monitoring systems and
work log my progress of monitoring project.

## Hardware

### Solar power system

- 200W of PV panels
- [Morningstar SunSaver MPPT 15A Charge controller](http://www.morningstarcorp.com/products/sunsaver-mppt/)
- Victron 220Ah battery
- 600W inverter

### Monitoring electronics

- [Tessel](http://tessel.io/)
    - Climate module if I want to monitor temperature or humidity
    - GPRS module which can be used to send data to server
- [Panucatt Devices 50A hall-effect Bi-directional current sensor](http://www.panucatt.com/product_p/cs-50a.htm)
    - Non-invasive version would be easier to install, but this accepts wider supply voltage
- [Texas Instruments ADS1115 Analog to Digital converter, 16bit preciesion](http://www.ti.com/product/ads1115)
    - Precision of integrated ADC on Tessel is only 10bit and I think more is required for precise measurement
    - Pre-soldered board available from [Adafruit](http://www.adafruit.com/products/1085)
    - I ported [a library for Tessel](https://github.com/Deraen/adc-ads1x15) from Adafruit's Python code

## Software

- [Tessel program, `tessel/`](./tessel)
- Server software
    - Store measurement data
    - Display graphs

## Work log

### 23-25.7.

![Image of ADC connected to Tessel using solderless breadboard](https://www.dropbox.com/s/1hzi83b4j7446da/2014-07-24%2019.38.48.jpg?dl=1)

- I managed to solder ADC ics to MSOP adapter boards, 2 of 3 chips survived
- Ported basic functionality of Adafruits ADS1115 library to Node
- Connected ADC to Tessel using solderless breadboard
    - Added pull-up resistors to *SCL* and *SCLK* lines
    - 100nF capacitor on *Vdd*
    - AIN0 connected to Hall-sensor *Vout*
    - AIN1 connected to *0.5 Vdd*, to provide comparison for Hall-sensor (resistive voltage divider, *R1,R2 = 12kOhm*)
- Tested current sensor by measuring current of 3W led
