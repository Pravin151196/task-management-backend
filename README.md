This repository contains the backend for the Task Management app. It is built using Node.js and Express.

## Features
- User authentication (Login/Sign-up) with JWT
- Task CRUD operations
- MongoDB database integration

## Prerequisites
- Node.js 
- MongoDB (local) -compass

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Pravin151196/task-management-backend.git

##Steps
cd ../backend
npm install
node server.js

#the Node.js server on: http://localhost:5000

#.env mongo_uri used with local mongodb compass
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
