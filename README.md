
# SmartPark
## Collaborators: Bryn Morris, Damon Butler, Beau Kim, Madaline Fitzpatrick
## Introduction
This is a full-stack program created during Phase IIII of Flatiron School's Full Stack Software Engineering Program.

The program allows a user to "log in" to SmartPark and manage their dogs and dog park visits. Basic user solutions include:
1. Browse available dog parks
2. Check into and out of a dog park
3. Write and view reviews for a dog park
4. Add and edit dogs in my account
4. Learn more about SmartPark

## Languages
Python
SQL
JavaScript
React

## Program Composition
=> The following section describes each program component and its functionality

This project was created with Create React App.
To start the app in development mode, run npm start. Then open http://localhost:4000 in your browser.
After starting the app, you will be taken to the login page.

### Logging In/Signing Up:
Enter your username and password to access the home page.
If you need to sign up, click "Don't have an account? Create one!" on the home page to open the sign-up form.

### Navbar
There is a navbar at the top of the page that allows users to easily switch between each feature on the application.

### Home Page & Checking-in/out
On the home page, you can check in to the park you have arrived at by clicking the big green paw. You'll see a check-in modal with drop-downs of dog parks, dogs, and estimated length of stay. Select your choices, and you'll be checked in to the park you choose. There is also an option to cancel the check-in if it was done by mistake. Once your visit is finished, click the green paw to see the check-out modal.

### Dog Parks
In the navbar users can click on the dog parks tag to be taken to a  list of dog parks that are already registed in the app. Clicking on a dog park image will flip it to show information about the amenities and address of the dog park they are interested in. Users can also click the reviews in the bottom left hand corner of each dog park card to see a modal containing the reviews that each dog park has.
Users can also add a dog park, and add reviews. If incorrect information is entered on the image, or rating of a dog park the users will see an alert telling them what was entered wrong and the information needed to fix it.

### About Us
The About Us page contains a description of the app and our goals. If you click on the dog treat at the top of the page, you'll be redirected to dog mode. The text on the page will change so that your dog can read about the app too, and "Who Let the Dogs Out" will play.

### My Account
On the My Account page, you can see the information on the dogs you have registered on your account. You can add new dogs or edit dogs that are already registered. If you choose to add or edit a dog, you'll be presented with a modal and can choose what information you want to change or a form to add a new dog.



### MODELS
Our models file contains the following 5 models which constitute the framework for our project.db tables.
Each table in our database contains a primary key represented by an id.
The individual properties of each table are listed below:

1. User
- username: string
- image: user's avatar as string
- password: string(hashed)

2. Dog
- name: string
- breed: string
- weight: integer
- age: integer
- image: dog's photo as string
- user_id: interger, foreign key

3. Visit
- length_of_stay: (estimated by user) integer
- dogs_id: integer, foreign key
- dog_parks_id: integer, foreign key
- actual_length_of_stay: integer

4. Dog_Park
- name: string
- address: string
- rating: integer between 1-5
- amenities: string
- image: dog park photo as string

5. Reviews
- name: The start date of the vacation represented as a datetime
- comment: The end date of the vacation represented as a datetime
- rating: The reason for the vacation represented as a string
- dog_park_id: A foreign key representing the id of the traveler associated with the vacation

Dog can have many Visits and can have many DogParks through Visit. DogPark can have many Vitits and can have many Dogs through Visit. Visit belongs to both Dog and DogPark. User can have many Dogs. DogPark can have many Reviews.
    User -----< Dog -----< Vist >----- DogPark -----< Reviews

## Flask
The backend methods are built using Flask Restful. Various CRUD functionality for each class defined below. 

1. Dogs:
- create
- read
- update
- delete

2. Users:
- create

3. DogParks
- create
- read

4. Visits
- create
- update

5. Reviews
- create
- read

### DATABASE
We set up our datbase using SQLalchemy, Flask, and seed.py for customized data. We took advantage of SQLalchemy's relationship, backpopulates, and association_proxy to create relationships between models in our database. We used Flask-Alembic to manage our migration versions.




