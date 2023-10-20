<h1 align="center">
  Welcome to my API
</h1>

## Description

This project is for studying purposes and is still a work in progress using **Nest.js and PostgreSQL**, so the idea of this probject is an API Rest where you register, login and create your character, each character will have 6 attributes wich are: strength, dexterity, constitution, intelligence, wisdom and charisma. Those attributes are going to be deffined by rolling 6d20 (6, 20 sided die) and the user will distribute each result for each attribute the way he or she wants, the user can roll the dice if they have one or use any other dice roller or just use a function of the own API to roll it.

---
## To-Do List
- [x] Create database
- [x] Registering functions
- [x] Login functions
- [ ] CRUD of characters
- [ ] CRUD of races
- [ ] CRUD of classes
- [ ] CRUD of weapons

---
## Installation

```bash
$ npm install
```
**After installed rename .env.exemple to .env and change the variables according to your infos.**

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

---

## Endpoints

### **Register User**
####`POST` `/user`
This route is used to register a new user.
- **Request**
No parameters or queries. The body should have an object with the following properties:
  - username
  - password
</br>

- **Response**
  - In case of success the response will be only a 201 status returning the acces token. 
  - Missing fields the response will be a 400 status with an error message.
  - In case of some unexpected error the response will be a 500 status with an error message. 
</br>

**Example of the request**
```json
// POST /user
{
  "username": "your nickname",
  "password": "your password"
}
```

**Example of the response**
```json
// HTTP Status 201 - created

// HTTP Status 400 - Bad Request
{
  "message": "username is required." //password is required,
  "error": "Bad Request",
  "statusCode": 400 
}

// HTTP Status 500 - Iternal Server Error
{
  "message": "unexpected error",
  "error": "Iternal Server Error",
  "statusCode": 500 
}
```

---
### **Login**
####`POST` `/auth/login`
This route is used to login.
- **Request**
No parameters or queries. The body should have an object with the following properties:
  - username
  - password
</br>

- **Response**
  - In case of success the response will be only a 200 status returning the acces token. 
  - Missing fields the response will be a 400 status with an error message. 
  - Wrong password the response will be a 401 status with an error message. 
  - In case of some unexpected error the response will be a 500 status with an error message. 
</br>

**Example of the request**
```json
// POST /auth/login
{
  "username": "your nickname",
  "password": "your password"
}
```

**Example of the response**
```json
// HTTP Status 200 - Ok
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// HTTP Status 400 - Bad Request
{
  "message": "username is required.", //password is required
  "error": "Bad Request",
  "statusCode": 400 
}

// HTTP Status 401 - Bad Request
{
	"message": "Wrong password.",
	"error": "Unauthorized",
	"statusCode": 401
}

// HTTP Status 500 - Iternal Server Error
{
  "message": "unexpected error",
  "error": "Iternal Server Error",
  "statusCode": 500 
}
```

## Stay in touch

- Author - Eduardo Jarek
- Discord - `._ragnarok_.`