React Neighborhood Map App: Burgers of Bergen "BoB": Udacity Front End Web Developer Nanodegree, Final Project

========================================================




## Table of Contents

- [Purpose](#purpose)
- [How To Run](#how-to-run)
- [Reviewer Notes](#reviewer-notes)
- [Resources](#resources)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)


## Purpose

This project represents the culmination of six months of learning. It draws on early concepts of CSS and JavaScript, intermediate concepts like accessibility and error handling, and later advanced concepts such as React and the serviceworker. 

The resulting single page app is a searchable list of burger joints in Bergen County, NJ ("Burgers of Bergen", AKA "BoB"). BoB draws on data from Google Maps and Foursquare, using their respective APIs, and a React structure built from the ground up by me.


## How To Run

To run the program locally on your computer (requires Internet connection, JavaScript, HTML, CSS, local server, npm):
1. Download the repository from GitHub
2. In Command Prompt (Windows) or Terminal (Mac) or similar, cd: to directory where repository was downloaded
3. Run `npm install` and `npm run build` to create local server


## Reviewer Notes

- Service worker: Consensus among students was that the service worker packaged with `create-react-app` will function properly with no intervention from the student or reviewer, when the app is started with `npm run build` NOT `npm start`


## Resources

The following are the resources I used as inspiration or foundation for various elements of the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Google error handling and CSS ideas: [Zaynaib (student)](https://github.com/zaynaib/map/blob/master/src/App.css)

Fetch functionality and general React wisdom: [Forrest (student)](https://www.youtube.com/watch?v=lDVaZY0aG2w&t=0s&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=7)

Map Data: [Google Maps](https://google.com/maps/)

Venue Data: [Foursquare](https://foursquare.com/)

Error Boundaries: [Dan Abramov](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)