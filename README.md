# DarkSky Extension For Mozaik V1 ###

Mozaik extension that displays the weather using the DarkSky API. For use in **_version 1_** of the [Mozaik modular dashboard](
http://mozaik.rocks). 

Author: [Connor Taylor](https://github.com/connorrt)

### parameters
key       | env key          | required | default          | description
----------|------------------|----------|------------------|----------------------------
`token`   | DARKSKY_API_TOKEN | yes     |                  | *harvest authentication token*
`location` | DARKSKY_LOCATION  | yes    | 0,0              | *harvest account id* 

#### usage
```javascript
{
  type: 'darksky.current',
  columns: 1, rows: 1, 
  x: 0, y: 0
},
{
  type: 'darksky.rain_graph',
  columns: 1, rows: 1, 
  x: 0, y: 1
}
```

## Functions

### Current

Displays the current temperature in Fahrenheit, a text description of the current weather,
 and an icon describing the current weather.
 
<img src="https://raw.githubusercontent.com/connorrt/mozaik-ext-darksky/master/preview/current.png" width="400" alt="Current" />
 
### RainGraph

Displays a chart of the predicted amount of precipitation over the next 60 minutes.

<img src="https://raw.githubusercontent.com/connorrt/mozaik-ext-darksky/master/preview/rainChart.png" width="400" alt="RainGraph" />
 
## Changelog

### 1.0.0:

Current weather widget.

### 1.0.1:

Added rain graph.

### 1.0.2:

(Broken) Fixed styles on current. Fixed some security vulnerabilities in dependencies.

### 1.0.3:

Undid breaking package changes from 1.0.2.

### 1.0.4

Fixed style issues with rain graph.
