# pi-dashboard-2
Scraps temperatures from Teco PLC temperature control (custom non standard build) using Node.js and headless Chromium. Runs on Raspberry Pi server. Also fetches data from NodeMCU. Showing data on Svelte dashboard.

## nodejs-scrapper
Scraps data from Teco PLC webpage.

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
TODO In garage, I dont have heating nor sensor. So I used NodeMCU and some temperature module.

## web-dashboard 
Vue3 application to show it on floor plan - frontend. Fetches teco_result.json periodically.

* npm install
