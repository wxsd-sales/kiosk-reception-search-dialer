# Kiosk Reception Demo

**A simple Reception Kiosk Demo for RoomOS devices.**

This is a proof-of-concept application that is intended to be used as a simple reception desk Kiosk on a [RoomOS 11](https://help.webex.com/en-us/article/n01kjh1/New-user-experience-with-RoomOS-11) device in Kiosk/PWA mode.
Kiosk and PWA (Persistent Web App) are new modes that make use of the in-built Web Engine on modern RoomOS devices to display a webpage or custom-made web application on the device.

<p align="center">
   <a href="https://app.vidcast.io/share/bb910329-f398-4f04-baec-18ddaf46f493" target="_blank">
       <img src="https://github.com/wxsd-sales/kiosk-reception-demo/assets/6129517/5e99058f-d4fd-4973-aaae-0d768f10837f" alt="kiosk-reception-demo"/>
    </a>
</p>

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Table of Contents (click to expand)</summary>

* [Overview](#overview)
* [Setup](#setup)
* [Demo](#demo)
* [Support](#support)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->

## Overview

This application allows you to customize the contact cards, brand logo, background, etc. that make up the UI/controls of a RoomOS device in PWA/Kiosk device. You can create multiple URLs and activate them on a compatible device of your choice. Once activated, the application uses [cloud xAPI requests](https://roomos.cisco.com/docs/Introduction.md#the-xapi) with a Webex Bot token to control the device (make calls, etc.).

## Setup

These instructions assume that you have administrator access to an Org's Webex Control Hub and a compatible RoomOS 11 device **in a shared workspace**.

1. Create a [Webex Bot Token](https://developer.webex.com/my-apps/new/bot) and [give it full access to your device](https://developer.webex.com/docs/devices#giving-a-bot-or-user-access-to-the-xapi-of-a-device). Note the bot token in a notepad as `WEBEX_TOKEN`.

2. Create a [OWM account](https://home.openweathermap.org/users/sign_up) and get the API token for weather data lookup. You can find the key on your account page under the ["API key"](https://home.openweathermap.org/api_keys) tab. Note the OWM token in a notepad as `OWM_TOKEN`.

3. Note the device identifier by executing the [List Devices API request](https://developer.webex.com/docs/api/v1/devices/list-devices) on the Webex developer portal, it’s the `id` field in the response as `DEVICE_ID`.

4. Create the URL for the reception kiosk by replacing the appropriate values below; you can have as many people as you want. Those are separated by a comma "`,`" and a corresponding Webex Calling extension/number/sip address can be provided by a colon "`:`". For example:

   ```text
   https://wxsd-sales.github.io/kiosk-reception-demo?people=john@pubhub-01.wbx.ai:0610,jane@pubhub-01.wbx.ai:1006&background=https://cf-images.us-east-1.prod.boltdns.net/v1/static/1384193102001/46e1a133-643e-435c-b073-8fd26be857e7/757bc84f-02c4-4468-b90b-7f097d265106/1280x720/match/image.jpg&logo=https://www.webexone.com/content/dam/www/us/en/images/webexone/2024/save-the-date/webexone24-logo-white.svg&owmCityId=4164138&owmToken=OWM_TOKEN&webexToken=WEBEX_TOKEN&deviceId=DEVICE_ID
   ```

5. Visit the org's [Control Hub device page](https://admin.webex.com/devices), choose your device and make the following changes using the "All configuration" link:
   - Set the value for `NetworkServices > HTTP > Mode` to `HTTP+HTTPS`
   - Set the value for `WebEngine > Mode` to `On`
   
   Additionally, if running in Kiosk Mode (Desk and Board series devices):
   - Set the value for `UserInterface > Kiosk > URL` to the URL you created in Step 4 above
   - Set the value for `UserInterface > Kiosk > Mode` to `On`

   Additionally, if running in PWA Mode (Room series devices):
   - Set the value for `WebEngine > Features > Xapi.Peripherals.AllowedHosts.Hosts` to `*`
   - Set the value for `UserInterface > HomeScreen.Peripherals.WebApp.URL` to the URL you created in Step 4 above

## Demo

A demo is not availabe at this time.

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=ashessin@cisco.com&subject=Azure%20Group%20Sync) or contact me on Webex (ashessin@cisco.com).
