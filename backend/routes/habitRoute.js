import express from 'express';
import { Habit } from '../models/habit.js'
import mongodb, { ObjectId } from "mongodb"

const router = express.Router();

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
// habits by user
router.get('/user/:user', async (request, response) => {
    try{
        
        const { user } = request.params;
        const habit = await Habit.find({userID : user});
        
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
            lastLogin: 0
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
    console.log("PUT worked" + request.body)
    console.log(request.body)
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

// routes for user login



export default router;