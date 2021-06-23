# Cross Browser testing locally [Chrome, Safari, Edge]

## Safari
1. Open new terminal and run (the safari driver is already on mac, windows not applicable)
```bash
safaridriver -p 4445
```
2. Allow automation control (Go to Safari -> Develop -> Allow Remote Automation)

![](https://seetyah.s3.amazonaws.com/Screen%20Shot%202021-06-23%20at%206.48.44%20AM.png)

## MircosoftEdge
1. Download the latest driver for your system from their [website](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/)

1.b Download the Edge browser if you don't have it already

2. Unzip the file, and paste the driver in the drivers folder of this project

3. Open a new terminal and run
```bash
./drivers/msedgedriver --port=4444
```

## Chrome
This should already be setup in your project with the chromedriver service


> Additional info for binaries: https://webdriver.io/docs/driverbinaries/
