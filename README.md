# Social Network API

## Description
Using MongoDB, this API for a social network allows the website to handle large amounts of unstructured data.

## Walkthrough
https://youtu.be/_uN3VFZl8po

## User Story
```
GIVEN a social network API WHEN I enter the command to invoke the application THEN my server is started and the Mongoose models are synced to the MongoDB database WHEN I open API GET routes in Insomnia for users and thoughts THEN the data for each of these routes is displayed in a formatted JSON WHEN I test API POST, PUT, and DELETE routes in Insomnia THEN I am able to successfully create, update, and delete users and thoughts in my database WHEN I test API POST and DELETE routes in Insomnia THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technologies Used
- Express
- MongoDB
- Mongoose
 
 ## Description

 ### Schemas
  
There are three schemas: Users, Thoughts, and Reactions. All reactions are subordinated to thoughts, and the thoughts and users are related to one another (one user may have many thoughts, but a thought will only have one user).

#### User

- username
- email
- thoughts
- friends
- Virtual: friendCount

#### Thought

- thoughtText
- createdAt
- username
- reactions
- Virtual: reactionCount

#### Reaction

- reactionId
- reactionBody
- username
- createdAt

### API Routes

The following routes are included:

`/api/users`

GET all users
POST a new user

`/api/users/:id`

GET a single user by id
PUT (update) a user by id
DELETE a user by id

`/api/users/:userId/friends/:friendId`

POST a friend relation to a user by their ids
DELETE a friend relation to a user by their ids

`/api/thoughts`

GET all thoughts

`/api/thoughts/:userId`

POST a thought of a user

`api/thoughts/:id`

GET a single thougt by id
PUT (update) a thought by id
DELETE a thought by id

`api/thoughts/:thoughtId/reactions`

POST a reaction to a thought

`/:thoughtId/reactions/:reactionId`

DELETE a thought by the id of the thought to which it is attached and its id

