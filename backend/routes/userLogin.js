import express, { request, response } from 'express';
import { User } from '../models/user.js';
import { Habit } from '../models/habit.js';
import { ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import { Code } from "../models/Code.js"
import dotenv from "dotenv"

const router = express.Router();


dotenv.config()

// setting up mail transporter
console.log("PASSWORD IS: " + process.env.EMAIL_PASS)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'dailyhabster@gmail.com',
      pass: "oqpjznmiykesyrta",
    },
  });

  
// email html template

const emailTemplate = (verificationCode) => {return (`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #4caf50;
            padding: 10px;
            text-align: center;
            color: white;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
          .email-body {
            padding: 20px;
            text-align: center;
          }
          .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            display: inline-block;
            letter-spacing: 4px;
          }
          .email-footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h2>Email Verification</h2>
          </div>
          <div class="email-body">
            <p>Hello,</p>
            <p>Thank you for signing up! Please use the following code to verify your email address:</p>
            <div class="verification-code">${verificationCode}</div>
            <p>This code is valid for the next 10 minutes.</p>
          </div>
          <div class="email-footer">
            <p>If you did not request this email, please ignore it.</p>
          </div>
        </div>
      </body>
    </html>
    `)}

// generate verification code
const verificationCode = () => {
    let code = ""
    for(let i = 0; i < 6; i++){
        code += Math.floor(Math.random() * 10);
    }
    return code
}
// ESSINTAIL Routes for the application

// send verification code
router.post('/sendmail', async (request, response) => {
    try{
        if(!request.body.email){return response.status(400).send({message: 'no email provided'})}
        const code = verificationCode()
        
        const found = await Code.find({email: request.body.email}).exec() 

        if(found.length >= 1){
            const entry = found[0]
            const res = await Code.findByIdAndUpdate(entry._id, {code: code})
            console.log(res)
            
        }
        else{
            await Code.create({email: request.body.email, code: code})
        }

        console.log("CODE IS " + code)
        const info = await transporter.sendMail({
            from: 'dailyhabster@gmail.com', // sender address
            to: request.body.email, // list of receivers
            subject: "Email Verification", // Subject line
            text: request.body.text, // plain text body
            html: emailTemplate(code), // html body
          });
          console.log("Message sent: %s", info.messageId);

          return response.status(200).json({success: "true"});

    } catch (error){
        console.log(error)
        response.status(500).send({ message: error.message });
    }
})

// check if a code is already sent
router.post('/sentcheck', async (request, response) => {
    try{if(!request.body.email){return response.status(400).send({message: 'no email provided'})}
        const found = await Code.find({email: request.body.email}).exec() 

        if(found.length >= 1){
            return response.status(200).json({sent: true});
        }
        else{
            return response.status(200).json({sent: false});
        }
    }
    catch (error){
        console.log(error)
        response.status(500).send({ message: error.message });
    }

}
)

// verify email against verification code
router.post('/verify', async (request, response) => {
    try{if(!request.body.email || !request.body.code) { throw new Error("Send all required field")}
    const found = await Code.find({email: request.body.email}).exec()
    if(found.length == 0){throw new Error("No token was issued")}
    if(found[0].code == request.body.code){
        const find = await User.find({email: request.body.email}).exec()
        console.log(find)
        const userID = find[0]._id
        const res = await User.findByIdAndUpdate(userID, {verified: true})
        await Code.findByIdAndDelete(found[0]._id)
        return response.status(200).json(res);
    }
    else{
        throw new Error("Verification failed")
    }
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message });
    }

})

// Getting user by id
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

// Getting user by username

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

// Creating a new user, used for signing up users

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

// authenticating user, used for user login

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
            createdAt: user.createdAt,
            verified: user.verified
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

// used to update username

router.put('/:id', async (request, response) => {
    try{
        if(!request.body.userName){throw new Error("no name provided")}
        const { id } = request.params;
        // find if the new user name exists
        const found = await User.find({userName: request.body.userName}).exec() 

        if(found.length == 1){throw new Error('username already exists');}
        

        const user = await User.findByIdAndUpdate(id, request.body,  { new: true, runValidators: true })


        return response.status(200).json(user);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

// user to delete account

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

// NON-ESSENTIAL routes used for testing

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



export default router
