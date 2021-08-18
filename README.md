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
Ensure you have copied over the variables.env file and udpdated that with the Mongo URI you plan to use

# Running the project
cd into the backend folder
run `npm i`
run `npm start`

cd into the frontend folder
run `npm i`
run `npm start`

# Notes
The nav icon (company logo) is clickable and provides access to mission history via email as well as a logout function
