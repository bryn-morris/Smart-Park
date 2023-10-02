
# SmartPark

## Project Overview

Smart Park is an exciting and actively developed full-stack application that aims to enhance the interactions between different dog owners. This project is designed with the goal of creating a seamless and enjoyable experience for both dogs and their owners when they visit the park. We're committed to creating a user-friendly and innovative platform that brings dog owners closer together and makes each visit to the park more enjoyable. Join us on this journey as we continue to develop and improve Smart Park!

<div id="badges" align="center">
  <img src="https://shields.io/badge/python-v3.8-blue" alt="Python Version Badge"/>
  <img src="https://img.shields.io/badge/react-v18.2.0-orange" alt="React Version Badge"/>
  <img src="https://img.shields.io/badge/flask-v2.2.3-green" alt="Flask Version Badge"/>
</div>

## Table of Contents
 - [Installation & Getting Started](#installation--getting-started)
 - [Key Features](#key-features)

## Installation & Getting Started

This application was built using Node Package Manager and pipenv. As such, in order to install and run the necessary dependencies, use the following commands from the client directory:

        npm install && npm start

This will start the frontend server.

In order to have the necessary dependencies installed and to create an active environment within the new shell, you will need to use the following commands:

        pipenv install && pipenv shell

finally, run the following command to run the backend server:

        python app.py

The frontend was created with Create React App.
To start the app in development mode, run npm start. Then open http://localhost:4000 in your browser.
After starting the app, you will be taken to the login page.

## Key Features 

### Currently Implemented

The program allows a user to log in to SmartPark and manage their dogs and dog park visits. Basic user solutions include:
1. Browse available dog parks
2. Check into and out of a dog park
3. Write and view reviews for a dog park
4. Add and edit dogs in their account
4. Learn more about SmartPark

### In Development

**Real-time Communication:** Smart Park leverages the power of real-time websocket communication through Socket.io. This feature allows dog owners at the park to connect, share experiences, and arrange playdates for their furry friends. (Currently in Development)

## Future Development

**Push Notifications:** In the near future, we plan to implement push notifications through Twilio. This will enable users to receive important updates and alerts related to their park visits, ensuring they never miss out on exciting events or gatherings. (Future Development)

**Location Services:** Smart Park will utilize the Google Places API to provide users with valuable information about nearby parks, pet-friendly amenities, and other relevant data to enhance their park experience. (Future Development)

### DATABASE
We set up our datbase using SQLalchemy, Flask, and seed.py for customized data. We took advantage of SQLalchemy's relationship, backpopulates, and association_proxy to create relationships between models in our database. We used Flask-Alembic to manage our migration versions.

## Collaborators: 

#### [Bryn Morris](https://github.com/bryn-morris)
#### [Damon Butler](https://github.com/DamonButler)
#### [Beau Kim](https://github.com/chasecivillion)
#### [Madaline Fitzpatrick](https://github.com/madalinefitz)






