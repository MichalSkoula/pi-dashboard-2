const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require("node-fetch");

var config = require('./app-config');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: config.headless, // default is true
        slowMo: config.slowMo, // 250ms slow down
		args: ["--no-sandbox"],
		executablePath: config.browserUrl
    }); 

    try {
        const page = await browser.newPage();

        // jdu na stránku
        await page.goto(config.tecoUrl, { waitUntil: 'networkidle0' });

        // lognu se
        await page.type('#USER', config.user);
        await page.type('#PASS', config.pass);
        await page.click('.theSubmit');

        // počkám až se načte tabulka
        await page.waitForSelector('#INPUT13', {
            visible: true,
        });

        // shrábnu html
        const data = await page.content();
        
        // naparsuju do cheerio
        const $ = cheerio.load(data);

        let result = {
            vchod: $('#INPUT13').val(),
            vchod_topi: $('#INPUT15').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,
            
            obyvak: $('#INPUT17').val(),
            obyvak_topi: $('#INPUT19').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,
            
            loznice: $('#INPUT21').val(),
            loznice_topi: $('#INPUT23').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,
            
            pokoj_predni: $('#INPUT1').val(),
            pokoj_predni_topi: $('#INPUT3').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,
            
            koupelna: $('#INPUT4').val(),
            koupelna_topi: $('#INPUT6').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,
            
            pokoj_zadni: $('#INPUT7').val(),
            pokoj_zadni_topi: $('#INPUT9').css('background-image') == 'url(IMAGES/LED_GR_1.PNG)' ? 0 : 1,

            venku: $('#INPUT26').val(),

            rezim: $('#INPUT29').css('background-image') == 'url(IMAGES/08B.PNG)' ? 1 : 0,

            time: new Date().toLocaleString('cs-CZ')
        };

        // eště by to chtělo data z garáže - zeptáme se NodeMCU
        await fetch(config.nodeMcuUrl) 
                .then(response => response.json())
                .then(data => { 
                    result.garaz = data.temp.toFixed(1);
                });

        fs.writeFileSync('teco_result.json', JSON.stringify(result));    

        console.log(new Date().toLocaleString('cs-CZ') + " ok");
    } catch (e) {
        console.log(new Date().toLocaleString('cs-CZ') + " error " + e);
    } finally {
        await browser.close();
    }
})();
