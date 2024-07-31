import express from 'express';
import { User } from '../models/user.js';
import { Habit } from '../models/habit.js';
import mongodb, { ObjectId } from "mongodb"

const router = express.Router();

// get method for getting users

router.get('/', async (request, response) => {
    try{
        const user = await User.find({});
        return response.status(200).json({
            count: user.length,
            data: user
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

router.get('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

router.get('/username/:username', async (request, response) => {
    try{

        const { username } = request.params;
        const user = await User.find({userName: username});

        return response.status(200).json(user);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

router.post('/', async (request, response) => {
    try {
        //input validation
        if (!request.body.userID || !request.body.name || !request.body.passWord || !request.body.userName){
            return response.status(400).send({message: 'Send all required fields'});
        }

        const google = request.body.google || false
        const newID = new ObjectId(request.body.userID)

        const found = await User.find({userName: request.body.userName}).exec() 
        console.log(found.length)
        if(found.length > 0){throw new Error('username already exists');}

        
        //initialize a new user
        const newUser = {
            _id: newID,
            userID: newID,
            userName: request.body.userName,
            name: request.body.name,
            passWord: request.body.passWord,
            google: google
        };

        const user = await User.create(newUser); //using a mongoose.model which has a mongoose Schema

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (request, response) => {
    try{
        if(!request.body.name){throw new Error("no name provided")}
        const { id } = request.params;

        const user = await User.findByIdAndUpdate(id, request.body,  { new: true, runValidators: true })


        return response.status(200).json(user);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await User.findByIdAndDelete(id);
        const userHabits = await Habit.find({userID: id}) 
        // deleting associated habits

        userHabits.forEach(async (habit) => {
            await Habit.findByIdAndDelete(habit._id)
            console.log(userHabits._id)
        });

        if(!result){
            return response.status(404).json({ message: 'User not found '});
        }

        return response.status(200).send({ message: 'User deleted successfully' });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router
