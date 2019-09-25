
# Expo Automated Screenshots

This is a mock of what automated screenshots might look like in Expo. I am expo web and puppeteer to capture screenshots. The downside to this approach is that iOS and Android screenshots are actually rendering the web version of the app. This is not ideal, but I think it's a good first step.


### Getting Started

For now, you have to manually start expo web. Puppeteer will default to port 19006.

```bash
# start expo web
npm run web

# capture screenshots
npm run screenshot

# screenshots will appear as ./screenshots/deviceName/screenshotName.png
```

### Configuration

All options

```json
{
  "devices": [
    "iPhone SE",
    "iPhone 8",
    "iPhone X"
  ],
  "screenshots": {
    "screen-one": {
      "url": "/screen-one",
      "captureEvent": "networkidle2"
    },
    "screen-two": {
      "url": "/screen-two",
      "captureEvent": "manual"
    },
    "screen-three": "/static/text",
  },
  "timeout": 20000,
  "port": 19006
}
```

[A list of supported devices can be found here](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js)


### Manual Capture
By default the screenshot will be captured once the page finishes loading, or rather once the network traffic idles (using puppeteer networkidle2). If however you set captureEvent to manual, the screenshot will not be capture until you manually trigger it (assuming you do so before within the specified timeout).

```javascript
// manual capture

import screenshot from '../../screenshot-client';

class DynamicScreen extends React.PureComponent{

  state = {
    title: "you shouldn't see this in the screenshot"
  }

  componentDidMount() {
    this.setState({
      title: 'dynamic text!'
    }, () => {
      screenshot.capture();
    });
  }

  render() {
    let { title } = this.state;
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    );
  }
}
```
