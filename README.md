# Node.js API with User Registration, Authentication, and Game Data  
This Node.js API project provides user registration, authentication, and basic game data management using Express   for routing, MySQL for user data, MongoDB for game data, and RabbitMQ for event processing.

### Table of Contents  
- Features
- Prerequisites
- Setup
- Database Configuration
- RabbitMQ Configuration
- Running the Application
- API Endpoints
- Sample Requests
- Contributing
- License
- Features




### User Registration and Authentication  
MySQL database for user data (username, email, hashed password, etc.).  
Secure registration endpoint.  
Authentication using JWT.  

### Game Data API  
MongoDB collection for game data (player statistics, game results, etc.).  
Endpoints for creating, retrieving, updating, and deleting game data for a specific user.  
RabbitMQ Event Processing  

### Set up a RabbitMQ instance for event processing.  
Event publisher for user registration.  
Event subscriber to log events in a file.  


### Prerequisites  
Before setting up the development environment, make sure you have the following installed:  

- Node.js (v16 or higher)
- MySQL for user data storage
- MongoDB for game data storage
- RabbitMQ for event processing
- Check status of above servers and ensure the services are running

### Setup  
Clone this repository to your local machine:
git clone https://github.com/Shivanshu27/tfsProject.git

### Navigate to the project directory:  
cd your-repo-name

### Install project dependencies:  
npm install (in both server project and loggerServer project)

### Database Configuration  
MySQL Configuration:  
Create a MySQL database for user data.  
Update the database connection details in server/config/mysql.js.  

### MongoDB Configuration:  
Set up a MongoDB instance for game data.  
Update the MongoDB connection details in server/config/mongo.js.  

### RabbitMQ Configuration:  
Set up RabbitMQ with your preferred configuration.  
Update RabbitMQ connection details in server/config/rabbitmq.js.  
Event Subscriber:  

Implement the event subscriber logic in loggerServer/index.js to process events.



### Running the Application  
Start the Node.js application:  
npm start (in both server project and loggerServer project)  
The application will run on http://localhost:5000 by default (you can change this in app.js).  

### API Endpoints  
The API provides the following endpoints:  

Registration: POST /api/auth/register  
Login: POST /api/auth/login  
Logout: POST /api/auth/logout  
Create Game Entry: POST /api/user/game-data/insertPlayerGameData  
Get Game Data: GET /api/user/game-data/getPlayerGameData/:userId  
Update Game Data: PUT /api/user/game-data/updatePlayerGameData/:userId  
Delete Game Entry: DELETE /api/user/game-data/deletePlayerGameData/:userId  


### Sample Requests  
You can use tools like Postman or curl to interact with the API. Here are some sample requests for testing:  

### User Registration:  
POST  /api/auth/register  
Content-Type: application/json  

{
  "username": "yourusername",
  "email": "youremail@example.com",
  "password": "yourpassword"
}

Login:  
POST /api/auth/login  
Content-Type: application/json  

{
  "email": "youremail@example.com",
  "password": "yourpassword"
}


Create Game Entry:  
POST /api/user/game-data/insertPlayerGameData  
Content-Type: application/json  

{
  "playerName":"shiv",
  "gameType": "fantasy sports",
  "gamesPlayed":5,
  "gamesWon":3,
  "gamesLost":2,
  "score":10
}

Get Game Data:  
GET /api/user/game-data/getPlayerGameData/:userId  


Update Game Data:  
PUT /api/user/game-data/updatePlayerGameData/:userId  
Content-Type: application/json  

{
  "gamesPlayed":5,
  "gamesWon":4,
  "gamesLost":2,
  "score":12
}

Delete Game Entry:  
DELETE /api/user/game-data/deletePlayerGameData/:userId  

### Contributing  
If you would like to contribute to this project, please follow the standard GitHub fork and pull request workflow.

### License  
This project is licensed under the MIT License. See the LICENSE file for details.