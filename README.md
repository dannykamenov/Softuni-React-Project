# Tech Trust React Project

This is a project for SoftUni's Final React Exam! Originally the project was built with Angular and used in SoftUni Fest 2023 (placed first among solo participants). This repo comes with two folders. One contains the front-end part of the project built with React. The server folder contains the back-end part - written in Node JS, Express.js and using Mongo DB as a database service. The project also uses Firebase's authentication api and storage api.

## Major Update!
- The project is now hosted on Hostinger (front-end) and Render.com (back-end). This project is only for display purposes!\
**[Click here to view the live website!](https://techtrust.dannykamenov.com/)** <- Hosted on Hostinger.
* If you still prefer to host locally, follow the instructions below!

## How to set up?

- First, access each folder (BE and softuni-react-app) seperately in the terminal of your choice.
- Run `npm i` or `npm install` to download all the necessary packages.
- Run `npm run dev` in the softuni-react-app folder to start the front-end part of the project.
- NOTE: The back-end part of the project is originally connected to a Mongo DB database hosted on Mongo Atlas. If you want to use your own database, you can change the connection string in the index.js file in the BE folder. You can also use the dummy data provided in the repo.

## Project Summary
- Main page contains Login, Register and Toggle Button which changes views. Upon registration users decide whether they want to register as a client or business. This sets their role in the database.
- The client view contains a list of all the businesses registered in the database. Users can filter the businesses by category and search for a specific business. They can also view the details of a business and purchase their products.
- The business view contains a list of all the products the business has to offer. They also have stats for their sales and store and a purchase history.
- The project uses Stripe's Test API to handle payments via credit card. The project also uses Firebase's authentication API to handle login and registration. Firebase's storage API is used to store the images of the businesses and products. Crypto payments are also available via Coinbase Commerce API.