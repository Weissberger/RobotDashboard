# RobotDashboard
A dashboard for queueing and monitoring tasks for a 'virtual' robot to complete

# Setting up the database:
## Option 1: Connect to my Mongo cluster:
To connect to my mongodb instance (URI provided in variables.env), please email me your **public** IP address and I will whitelist you

## Option 2: Create your own local Mongo db using the CLI (install mongo & mongo cli)
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/  - install mongo
https://docs.mongodb.com/mongocli/stable/install/ - install mongo cli
https://www.mongodb.com/basics/create-database - create db

If you choose to create your database, your connection string will be `mongodb://localhost:27020/<db_name>`

# Variables.env
Backend globals - Ensure you have copied over the variables.env file into the root (backend folder) and udpdated that with the Mongo URI you plan to use

# .env
Frontend globals - Ensure you have copied over the .env file into the root (frontend folder). 
- You can play around with the battery low threshold as well as sim duration min/max and other params.
- For example to change the time lockout before running same mission, you can adjust the REACT_APP_RUN_SAME_MISSION_LOCKOUT_SECONDS parameter

# Running the project
cd into the backend folder
run `npm i`
run `npm start`

cd into the frontend folder
run `npm i`
run `npm start`

# Emailing mission history
I've created a google account for testing but you should be able to change this to your own email (Update the MAIL_USER, MAIL_PASS in variables.env). To do so however you will need to also change the security settings to allow less secure apps to send emails on your behalf. Otherwise,
you can use the one provided. 

# Notes
The nav icon (company logo) is clickable and provides access to emailing mission history as well as a logout function

# Simplifications
The app uses robot data simulated from the frontend rather than the frontend (see RobotSimulator.js). Granted this is a simplification, it allowed me to develop all of the other features and mock the data needed for the project. 