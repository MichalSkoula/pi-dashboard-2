const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: true, // default is true
        slowMo: 0, // 250ms slow down
		args: ["--no-sandbox"],
		executablePath: "chromium"
    }); 

    const page = await browser.newPage();

    // jdu na stránku
    await page.goto('http://192.168.8.11', { waitUntil: 'networkidle0' });

    // lognu se
    await page.type('#USER', '*****');
    await page.type('#PASS', '*****');
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
        obyvak: $('#INPUT17').val(),
        loznice: $('#INPUT21').val(),
        pokoj_predni: $('#INPUT1').val(),
        koupelna: $('#INPUT4').val(),
        pokoj_zadni: $('#INPUT7').val(),
    };

    fs.writeFileSync('teco_result.json', JSON.stringify(result));

    // console.log(result);

    await browser.close();
})();
