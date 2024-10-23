import express from 'express';
import { Habit } from '../models/habit.js'
import { User } from '../models/user.js';
import mongodb, { ObjectId } from "mongodb"
import { Review } from "../models/Reviews.js"
import jwt from "jsonwebtoken"
import { config } from 'dotenv';

config(); // Load environment variables from .env

const router = express.Router();

const secretKey = process.env.JWT_KEY

// takes in a username and returns a userID after verifying the token and its identity
const verifyIdentity = async (request, username) => {
    const token = request.cookies.authToken;
    const userID = jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return -1
        }
        const userID = decoded.userID 
        // if token is verified and decoded check userID matches userName
        const tokenUsername = (await User.findById(userID)).userName
        if(tokenUsername != username){return -1}
        
        return userID
    });
    return userID
    
}

// Get route to get all books from the database
router.get('/', async (request, response) => {
    try{
        const habit = await Habit.find({});
        return response.status(200).json({
            count: habit.length,
            data: habit

        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: (error.message + "but at least backend is working") });

    }
})
// get habit by id
router.get('/id/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const habit = await Habit.findById(id);
        
        return response.status(200).json(habit);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})
// habits by user  ===> WORK WITH TOKEN
router.get('/user/:user', async (request, response) => {
    // plan for all of these if to make a middlewear ==> takes in username and returns userID
    // the middleware verifies the token and verifies username corresponds to user ID in the token 
    // and the returns a user ID
    try{
        const provided = request.params.user
        console.log("Provided is : " + provided)
    
        const userID = await verifyIdentity(request, provided)
        if(userID == -1 || (!userID))  return res.status(401).send('Invalid token');
        
        //FIND HABITS USING USER ID FROM THE TOKEN
        const habit = await Habit.find({userID : userID});

        return response.status(200).json(habit);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})
// // Post route -> route for Save a new habit
router.post('/', async (request, response) => {
    try {
        //input validation
        if (!request.body.desc || !request.body.archived || !request.body.discrete || !request.body.userID || !request.body.duration || !request.body.success){
            return response.status(400).send({message: 'Send all required fields'});
        }

        //initialize a new book
        const newhabit = {
            desc: request.body.desc,
            archived: request.body.archived,
            success: request.body.success,
            discrete: request.body.discrete,
            userID: new ObjectId(request.body.userID),
            duration: request.body.duration,
            lastLogin: 0,
            text: request.body.text || ""
        };

        const habit = await Habit.create(newhabit); //using a mongoose.model which has a mongoose Schema

        return response.status(201).send(habit);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a habit
router.put('/:id', async (request, response) => {
    try{
        if (!request.body.desc || !request.body.archived || !request.body.discrete || !request.body.duration || !request.body.lastLogin){
            return response.status(400).send({message: 'Send all required fields'});
        }
        const { id } = request.params;

        const result = await Habit.findByIdAndUpdate(id, request.body,  { new: true, runValidators: true });

        if (!result) {
            return response.status(404).json({ message: 'Habit not found' });
        }

        return response.status(200).send({ message: 'Habit updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// // Route for deleting a habit
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Habit.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Habit not found '});
        }

        return response.status(200).send({ message: 'Habit deleted successfully' });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Post a review

router.post('/review', async (request, response) => {
    try {

        const review = await Review.create(request.body);

        return response.status(200).send({ message: 'Review added successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})



export default router;