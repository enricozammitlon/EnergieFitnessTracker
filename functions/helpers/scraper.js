const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getDataPoint(email,password){
    const login_page = 'https://members.energiefitness.com/'
    const main_page = 'https://members.energiefitness.com/kilburn/inthevenue'

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: [
        "--no-sandbox",
        "--disable-gpu",
        ]
    });
    const page = await browser.newPage();

    await page.goto(login_page, {waitUntil: 'load'});


    await page.type('#Email',email);
    await page.type('#Password',password);
    await page.focus("#Password");
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    //console.log( await page.evaluate(() => document.querySelector('*').outerHTML))

    const cookies = await page.cookies();
    const page2 = await browser.newPage();

    await page2.setCookie(...cookies);
    await page2.goto(main_page);
    //await page2.waitForNavigation();

    const final_page = await page2.evaluate(() => document.querySelector('*').outerHTML);
    let $ = cheerio.load(final_page);
    const main = $("main")
    const members = main.find('h1').text()
    await browser.close();
    //console.log(members)
    return members
}

module.exports = {
    getDataPoint : getDataPoint   
}