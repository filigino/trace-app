# Trace
Contact tracing app for iOS 13

## Development

- Built with React Native and uses Redux
- Communicates with back-end server
([filigino/trace-server](https://github.com/filigino/trace-server)) via REST
API
  - Server stores data via NoSQL MongoDB database
- Uses [tzachari/react-native-contact-tracing](https://github.com/tzachari/react-native-contact-tracing)
for Bluetooth contact tracing
- Splash icon made by Freepik from www.flaticon.com

## Features

- Uses Bluetooth to detect phones of other users the user has come into
contact with
- Supports Push Notifications on confirmed Exposures to other users that have
tested positive for COVID-19
- Supports Background App Fetch to check for new Exposures every hour
- Uses a decentralized architecture with most data storage and processing done
locally on the phones to protect users' privacy\
Note: Does not implement Apple/Google's Exposures API

## How It Works

Follows Apple and Google's contact tracing scheme:

![](./README/apple-google-exposure-01-100842860-orig.jpg)
![](./README/apple-google-exposure-02-100842861-orig.jpg)

Using the [tzachari/react-native-contact-tracing](https://github.com/tzachari/react-native-contact-tracing)
library, when two phones running Trace detect one another via Bluetooth, each
phone:
- Generates a unique 24 digit string, which it stores locally in a list of
`myIds` and broadcasts the ID to the other phone
- Receives the other phone's ID and stores it locally in a list
of `otherIds`
Note: The Apple and Google contact tracing scheme specifies that each phone
continually broadcasts its own unique ID until that unique ID is updated every
10-20 minutes. Trace has two IDs generated **each time any two phones come
into contact** - one ID for each phone.

Upon confirmation that a user has tested positive for COVID-19, that user
**should** self-report their infection through Trace at which point, the
previous 14 days of the user's `myIds` (IDs it has broadcasted to other phones
the user has come in contact with) will be submitted to the Public Health
Authority.

Periodically, each phone running Trace downloads the list of IDs that
corresponds to users that have tested positive for COVID-19 in the last 14
days. Each phone will then compare its list of `otherIds` (IDs of phones of
others users the user has come into contact with) to the infected list and
notify the user of any matches (i.e. potential exposures).

Note: No user information is ever stored by Trace or at the server. Only IDs
consisting of randomly generated numbers and letters are communicated and
contain no information pertaining to a user's name, email address, location,
etc.

### Periodic Events
All IDs (`myIds` and `otherIds`) and exposures older than 14 days are deleted:
- Every hour
- Every time Trace is launched

`myIds` older than 14 days are also deleted:
- When a user self-reports

## Demo

<img width="200" src="./README/general.gif">
Launching and overview
<br/>
<br/>
<br/>

<img width="200"  src="./README/exposure.gif">
Push notification on exposure
<br/>
<br/>
<br/>


<img width="200"  src="./README/self-report.gif">
Self-reporting a positive infection

## Assumptions

In order for an app like this to allow for successful contact tracing and to
appropriately warn users about potential exposures, the following must occur:

- All members of the community must download the app to their smartphones
- Users must always keep the app running, at minimum, in the background (or at
least have it running when they are outside of their homes and could
potentially come into contact with others)
- Minimal delay between a positive test result for COVID-19 and self-reporting
that positive result through the app
- Minimal delay between a positive test result for COVID-19 and self-isolation
(should not come into contact with any other users from then on)
- All IDs generated exchanged between phones must truly be unique
