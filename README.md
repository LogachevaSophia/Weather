# Weather service App

This is an application for obtaining weather data in St. Petersburg

## PublishPages
https://logachevasophia.github.io/Weather/build_weather/build/
https://logachevasophia.github.io/Weather/build_cube/build/

## Aboutthis Service
The home page
### `/`
shows the weather for the current day, the weather by the hour and the next 7 days. The data is taken from a free service https://api.weatherapi.com/v1

At the cube page
### `/cube`
shows the weather for the current day and the next 7 days on the 3d Cube. We can touch cube and rotate it. The data is taken from a free service https://api.weatherapi.com/v1. In the code we can uncommeted lines 
### `cube.rotation.x += 0.01;`
### `cube.rotation.y += 0.01;`
on https://github.com/LogachevaSophia/Weather/blob/Master/src/components/CurrentWeatherThreeJs/CurrentWeatherThree.tsx to autoAnimate cube on page.


## Available Scripts

In the project directory, you can run:

### `npm install`

Install all nides libs

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


