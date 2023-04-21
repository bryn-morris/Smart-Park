<!-- All team notes at the bottom with the README guidance from the CLI project template! -->

# SmartPark

## Collaborators: Bryn Morris, Beau Kim, Damon Butler & Madaline Fitzpatrick

## Introduction

This is a Command Line Interface program created during Phase III of Flatiron School's Full Stack Software Engineering Program.

This program is a reservations solution for travel lovers!
The program allows a user to "log in" to Flats After FlatIron and manage their travel plans. Basic user solutions include:

1. Browsing available destinations
2. Book a travel reservation
3. Manage current reservation information
4. Update user's "profile" information

## Languages

Python
SQL

## Program Composition

=> The following section describes each program component and its functionality

### CLI

Users can "log in" to the program by entering their cAsE SeNsItIvE information upon entering the program

Users are given a main menu from which to execute three main actions:
Booking a new vacation, viewing/managing current vacations and profile, and exploring.

1. Booking a vacation
   User is able to enter their desired start and end dates, and are presented with all properties available during the desired dates. User can choose to view any property in greater detail before deciding to book. User can decide to book the vacation, and will sign a "log" with the reason for their stay. Vacation will persist to database, and the user can view their newly booked vacation in their personal profile.

2. Browse/ Explore
   User may choose to explore all the different properties that out service currently has available to customers! User may browse and gain inspiration for a trip prior to booking their own travel plans. User can look at previous traveler's that have stayed in a particular domicile, and their reason for their stay.

3. View / Update
   User may manage their own personal information and manage travel plans. User name and/or location may be changed at any time. They can also view all travel reservations that have been booked through Flats after Flatiron, both previous and future reservations.

Life happens! We do allow users to reschedule or cancel plans if the need arises. However, reservations are first-come first-serve. If someone else already has a reservation for a particular domicile, those dates are unavailable. The user may instead choose a different date OR perhaps another domicile might be available.

We also offer free cancellation. Users may need to cancel their travel plans. If the need arises, we understand.

#### CLI FUNCTIONS

def START()

Our start() function is called at the instantiation of a new instance of the CLI class. It displays a main menu, welcoming the user to our program and displaying ASCII art of one of our properties. Moreover, it prompts the user to either book, view/update their profile, or browse the list of properties. It also contains functionality to allow our user to return to the title menu(where they can log in as a different user) or navigate back to the main menu.

def TRAVELER()

This function serves as our basic login validation. It checks to see if the user is already in our database (requiring the exact name and city), and assigns the instance of our CLI class an attribute associated with that traveler in the database. If the user's information does not appear in the database, we create a new instance of the Traveler class and commit it to our database.

def BOOK()

The book() function in our CLI file allows a user to book a new vacation. Upon being called, it prompts the user to enter a start and end date for their new trip. The function has validation in place to ensure that the dates are valid and that their end date is after the start date. Based on their entries, we then display a list of domiciles that are available in their time range. We then allow the user to see the details of an available property by prompting them to enter the number of a property in the enumerated list. Once the details are displayed, the user is asked whether or not they would like to book their reservation. If they decide to book, the user signs the log book for the property and prompts them to give a reason for the visit. Once this is completed, they receive a confirmation message and their new vacation is added to the database. Otherwise, they are sent back to the list of properties where they can choose another or return to the main menu.

def VIEW_UPDATE()

Our view_update() function is a way for the user to see the information about their profile. It displays they entered at the start of the program as well as any vacations associated with that user. Provided the user has vacations to edit, we then prompt the user for input asking them whether or not they would like to edit a vacation. If the user agrees to edit, we allow them to specify which vacation they would like to update or delete. We then prompt them to enter 'U' to update said vacation, or 'D' to delete. If the user decides to update, we prompt them to enter 1, 2, or 3 to update the start date, end date, or domicile of their chosen vacation. If the user would like to edit a date, we have date validation in place to ensure that their new date does not conflict with any existing vacations for that domicile. If the user decides to edit a domicile, we display a list of domiciles that have availability during their current vacation dates and prompt them to enter the number of a domicile they would like to visit instead.

def BROWSE()

Upon being called, our CLI Browse() function will display a list of all the properties in the database. The function will then prompt the user for input, asking them to specify the number of a property in the enumerated list. Depending on their selection, they will be able to see the details of that property. The function then asks for more user input, asking them to enter 'B' to display past bookings for the property or 'M' to return to the main menu.

### MODELS

Our models file contains the following three models which constitute the framework for our project.db tables.

Each table in our database contains a primary key represented by an id and inherits from our Base class.

The individual properties of each table are listed below:

1. Domicile

- name: The name of the domicile represented as a string
- dest_location: The location of the domicile represented as a string
- sleep_capacity: The sleep capacity of the domicile represented as an integer
- local_amenities: The local amenities of the domicile represented as a string
- property_type: The property type of the domicile represented as a string

2. Travler

- first_name: The first name of the traveler represented as a string
- last_name: The last name of the traveler represented as a string
- location: The location of the traveler represented as a string

3. Vacation

- start_date: The start date of the vacation represented as a datetime
- end_date: The end date of the vacation represented as a datetime
- rsn_for_visit: The reason for the vacation represented as a string
- Traveler_id: A foreign key representing the id of the traveler associated with the vacation
- Domicile_id: A foreign key representing the id of the domicile associated with the vacation

Domiciles can have many vacations. Travelers can have many vacations. Vacation belongs to both Traveler and Domicile.

    Traveler -----< Vacation >----- Domicile

### SEED

Seed Data generated for database using Faker and Random;
Each time seed data is re-run, old data is first cleared from the database and new data is generated and populates the database.

8 Travelers: - first name: randomly generated - last name randomly generated - location: randomly generated city

8 Properties: - property type: randomly selected choice from a property list - property name: randomly selected based on random choice associated with property type - sleep capacity: randomly selected based on range associated with property type - location: randomly generated city - local amenities: randomly selected choice from an amenities list

16 Vacations: - start date: randomly selected between 2021-01-02 and 2024-12-31 - end date: corresponds to a start date, set to be a number of days after its start date, where the number of days is randomly selected from a range of 2 - 40 days. - traveler: randomly assigned to a traveler instance in the Traveler table - domicile: randomly assigned to a domicile instance in the domicile table - reason for visit: randomly selected choice from a curated reasons list

### DATABASE

We set up our datbase using SQLalchemy and Alembic. We took advantage of SQLalchemy's relationship, backref, and association_proxy to create relationships between models in our database. We used Alembic to manage our migration versions.

### HELPERS

welcome_images = a tuple storing ASCII art representing several different domiciles st which one might choose to stay. This tuple is used in the CLI script to display one ASCII art piece at random when a user begins the program.

### DEBUG

This debug is a sandbox file used only for the purposes of debugging and query selection

