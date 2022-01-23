# pi-dashboard-2
Scraps temperatures from Teco PLC temperature control (custom non standard build) using Node.js and headless Chromium. Runs on Raspberry Pi server. Also fetches data from NodeMCU. Showing data on Svelte dashboard.

![pi-dashboard](https://github.com/MichalSkoula/pi-dashboard-2/blob/master/assets/pi-dashboard-2.jpg)

## nodejs-scrapper
Scraps data from Teco PLC webpage using javascript.

For just scrapping:

* npm install
* app-config-example.js -> app-config.js
* node app.js 

For running via cron & uploading to webserver:

* sudo apt install libffi-dev
* pip install paramiko scp
* cron_config_example.py -> cron_config.py
* python cron.py

## nodemcu-sensor
In my garage, I dont have heating nor thermometer. So I used NodeMCU (ESP8266) and LM75 temperature module. It acts like a web server, returning json with temperate. It's like a REST wireless thermometer (lol).

* https://github.com/jlz3008/lm75 (download zip and import to Arduino IDE)
* sketch.ino -> NodeMCU (update Wifi creds)

![Fritzing](https://github.com/MichalSkoula/pi-dashboard-2/blob/master/assets/nodemcu.png)

![NodeMcu wireless thermometer](https://github.com/MichalSkoula/pi-dashboard-2/blob/master/assets/sensor.jpg)

## web-dashboard 
Vue3 application to show it on floor plan - frontend. Fetches teco_result.json periodically.

* npm install

![Heating dashboard](https://github.com/MichalSkoula/pi-dashboard-2/blob/master/assets/screenshot.png)
