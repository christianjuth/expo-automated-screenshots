const puppeteer = require('puppeteer');
const fs = require('fs');


const DEFAULT_CONFIG = {
  "devices": [
    "iPhone SE",
    "iPhone 8",
    "iPhone X"
  ],
  "captureEvent": "networkidle2",
  "screenshots": {},
  "timeout": 20000,
  "port": 19006
};
const config = Object.assign({}, DEFAULT_CONFIG, require('./screenshot-config'));



async function capture({ page, deviceName, screenshots, captureEvent, done }) {

  // Name is used to keeps track of
  // which screenshot it is currently
  // being processed. There is probably
  // a better way to do this.
  let name = '';
  async function screenshot() {
    try{
      await page.screenshot({path: `screenshots/${deviceName}/${name}.png`});
      startCapture();
    } catch(e) {
      console.error(`screenshot failed: ${deviceName} ${name}`);
    }
  }

  // Define a window.onCustomEvent function on the page.
  // let captureStarted = false;
  page.exposeFunction('onScreenshot', async (e) => {
    if(e.type == 'screenshot')
      screenshot();
  });
  function listenFor(type) {
    return page.evaluateOnNewDocument(type => {
      document.addEventListener(type, e => {
        window.onScreenshot({type, detail: e.detail});
      });
    }, type);
  }
  await listenFor('screenshot');


  // create a stack of screenshot capture jobs
  // each item containing a function that
  // loads a url and captures a screnshot
  let captureJobs = Object.keys(screenshots).map(key => {

    // load config for this screenshot
    let screenshotConfig = screenshots[key], url, trigger;
    if(typeof screenshotConfig === 'string') {
      url = screenshotConfig;
      trigger = captureEvent;
    } else {
      url = screenshotConfig.url;
      trigger = screenshotConfig.captureEvent || captureEvent;
    }

    // capture screenshot
    // if manual wait for screen
    // to trigger screenshot, else
    // wait use puppeteer waitUntil
    // (defaults to networkidle2)
    return async () => {
      name = key;
      if(trigger !== 'manual'){
        await page.goto(`http://localhost:${config.port}${url}`, {waitUntil: trigger});
        screenshot();
      } else{
        await page.goto(`http://localhost:${config.port}${url}`);
      }
    };
  });


  let timeout;
  function startCapture() {
    clearTimeout(timeout);
    if(captureJobs.length == 0) {
      console.log('- '+deviceName);
      done();
    } else{
      let job = captureJobs.pop();
      job();

      // cut off screenshot
      // if it takes too long
      timeout = setTimeout(() => {
        console.error('screenshot took too long');
        startCapture();
      }, config.timeout);
    }
  }
  startCapture();
}




async function createDevice(config) {
  let { deviceName, browser } = config;
  const page = await browser.newPage();
  const device = puppeteer.devices[deviceName];
  await page.emulate(device);

  if (!fs.existsSync('./screenshots/'+deviceName)){
    fs.mkdirSync('./screenshots/'+deviceName);
  }

  capture({
    ...config,
    page
  });
}



(async () => {
  const browser = await puppeteer.launch();
  let { devices, screenshots } = config;

  if (!fs.existsSync('./screenshots')){
    fs.mkdirSync('./screenshots');
  }

  // keep track of how many devices
  // have finished their screenshots,
  // so browser.close() can be called
  // upon completion
  let devicesRemaining = devices.length;
  function done() {
    devicesRemaining--;
    if(devicesRemaining == 0){
      console.log('');
      browser.close();
    }
  }

  console.log('Capturing');
  devices.forEach(function(deviceName) {
    createDevice({
      deviceName,
      screenshots,
      captureEvent: config.captureEvent,
      browser,
      done,
    });
  });
})();
