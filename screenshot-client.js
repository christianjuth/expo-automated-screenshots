/*
 * File: screenshot-client.js
 * Description:
 *   These functions allow components to
 *   to manually trigger a screenshot. This
 *   could be used to wait for a get request
 *   to complete before capturing a screenshot.
 */



/*
 * THIS FUNCTION IS NOT IMPLEMENTED YET!
 * This function can be used to prepare
 * a screenshot. It will only be called
 * in the screenshot environment. An
 * example use cause would be if you
 * have a text input and you want to fill
 * it with text before capturing a screenshot.
 */
function prepare(fn) {
  if(__DEV__){
    console.log('IMPLEMENTED PREPARE FUNCTION')
    fn();
  } else{
    return false;
  }
}



/*
 * This function captures a screenshot
 * by dispatching an event to puppeteer.
 * To prevent errors, the event will only
 * be dispatched one time, even if
 * capture is called more than once.
 */
let captured = false;
function capture() {
  if(__DEV__ && !captured){
    captured = true;
    let event = new Event('screenshot');
    document.dispatchEvent(event);
    return true;
  } else{
    return false;
  }
}



export default {
  prepare,
  capture
};
