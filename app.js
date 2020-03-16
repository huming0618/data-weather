//https://www.wolframalpha.com/input/?i=weather+on+9%2F3%2F1973+in+chengdu%2C+china
const host = `https://www.wolframalpha.com`
const util = require('./util')

const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    const url = host + util.getQuery('chengdu', 'china', 1983, 9, 3)
    console.log(url)
    await page.goto(url)
    const waiting = new Promise((resolve, reject) => {
        const timer = setInterval(async () => {
            const data = await page.evaluate(() => {
                const images = Array.from(document.querySelectorAll('img[alt]'))
                const target = images.filter(x => x && x.alt && x.alt.indexOf('temperature') > 0)[0]
                const result = target ? target.alt : ''
                // for (let img in images) {
                //     if (img.alt && img.alt.indexOf('temperature') > 0) {
                //         result.text = img.alt
                //     }
                // }
                return result
            });
            console.log('fetching ...', data)
            if (data) {
                clearInterval(timer)
                resolve(data)
            }
        }, 1000)
    })

    //waiting.then(x => console.log('data =>\n', x))


    return waiting


    // await page.screenshot({
    //     path: 'example.png'
    // });

    //await browser.close();
}

module.exports = main