import express from 'express';
import { User } from '../models/user.js';
import { Habit } from '../models/habit.js';
import mongodb, { ObjectId } from "mongodb"
import bcrypt from 'bcrypt'

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

// create a new user
router.post('/', async (request, response) => {
    try {
        //input validation
        if (!request.body.userID || !request.body.email || !request.body.passWord || !request.body.userName){
            return response.status(400).send({message: 'Send all required fields'});
        }

        const newID = new ObjectId(request.body.userID)

        const found = await User.find({userName: request.body.userName}).exec() 
        console.log(found.length)
        if(found.length > 0){throw new Error('username already exists');}

        const hashedPassword = await bcrypt.hash(request.body.passWord, 10);
        //initialize a new user
        const newUser = {
            _id: newID,
            userID: newID,
            userName: request.body.userName,
            email: request.body.email,
            passWord: hashedPassword,
            verified: false
        };

        const user = await User.create(newUser); //using a mongoose.model which has a mongoose Schema

        const res = {
            userID: user.userID,
            userName: user.userName,
            email: user.email,
            createdAt: user.createdAt
        }

        return response.status(201).send(res);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/authenticate', async (request, response) => {
    try {
        //input validation
        if (!request.body.username || !request.body.password){
            return response.status(400).send({message: 'Send all required fields'});
        }


        const found = await User.find({userName: request.body.username}).exec() 

        if(found.length == 0){throw new Error('username or password are incorrect');}

        const user = found[0]
        const password = user.passWord

        const isMatch = await bcrypt.compare(request.body.password, password)

        if(!isMatch){throw new Error('username or password are incorrect');}

        // data to send back to frontend
        const res = {
            userID: user.userID,
            userName: user.userName,
            email: user.email,
            createdAt: user.createdAt
        }

        console.log("BACKEND SENDING")
        console.log(res)


        return response.status(201).send(res);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// used to update a password
router.put('/password/:id', async (request, response) => {
    try{
        if(!request.body.password || !request.body.oldPassword){throw new Error("send both old and new passwords")}
        const { id } = request.params;

        // find the user and check if password matches
        const found = await User.find({_id: id}).exec() 

        if(found.length == 0){throw new Error('user not found error');}

        const user = found[0]
        const password = user.passWord

        const isMatch = await bcrypt.compare(request.body.oldPassword, password)

        if(!isMatch){throw new Error('old password is incorrect');}
        
        // old password match, encrypt new password and update the user

        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        
        const updated = await User.findByIdAndUpdate(id, {passWord: hashedPassword},  { new: true, runValidators: true })


        return response.status(200).json(updated);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

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
