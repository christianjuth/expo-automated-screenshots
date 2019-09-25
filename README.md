
# Expo Automated Screenshots

This is an example of what automated screenshots might look like using Expo. I am using expo web and puppeteer to capture screenshots. The downside to this approach is that iOS and Android screenshots are actually rendering the web version of the app. This is not ideal, but I think it's a good first step. Personally I am of the mindset that apps should look the same across platforms, which makes this less of an issue for me, but if you want your app to strictly abide by the Material Design and Cupertino style guides per platform, this approach to capturing screenshots will be less useful to you.

**My goal ultimately is to speed up my workflow to ludicrous**

![ludicrous](https://media.giphy.com/media/ZfNGHnl4eZQRy/giphy.gif)

### Getting Started

For now, you have to manually start expo web. Puppeteer will default to port 19006.

```bash
# start expo web
npm run web

# capture screenshots
npm run screenshot

# screenshots will appear as ./screenshots/deviceName/screenshotName.png
```

### Navigation Setup

Since screenshots are generated trough the browser, you will need to configure paths for each screen you want to reach. Additionally, I changed `navigation/AppNavigator.web.js` to not use the hash router because that is what I prefer.

```javascript
const StaticStack = createStackNavigator(
  {
    Text: {
      screen: StaticText,
      path: 'text'
    },
    List: {
      screen: StaticList,
      path: 'list'
    },
  },
  config
);
StaticStack.path = 'static';
```

### Configuration

All options

```json
{
  "devices": [
    "iPhone SE",
    "iPhone 8",
    "iPhone X",
    "Pixel 2",
    "Pixel 2 XL"
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
