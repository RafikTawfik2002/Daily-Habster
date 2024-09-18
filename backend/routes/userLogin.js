import express, { request, response } from 'express';
import { User } from '../models/user.js';
import { Habit } from '../models/habit.js';
import { ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import { Code } from "../models/Code.js"
import dotenv from "dotenv"
import crypto from "crypto"
import { Token } from '../models/Token.js';
const router = express.Router();


dotenv.config()

// setting up mail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'dailyhabster@gmail.com',
      pass: "oqpjznmiykesyrta",
    },
  });

  
// ACCOUNT RECOVERY

// takes a token and validates it and updates the password
router.post('/resetpass', async (request, response) => {
    try{
        console.log("WORKED")
    if(!request.body.password || !request.body.token){return response.status(400).send({message: 'send all fields'})}
    const found = await Token.find({token: request.body.token})
    if(found.length == 0){return response.status(400).send({message: 'no token found'})}
 
    const userID = found[0].userID
    const createdAt = found[0].createdAt
    if((new Date().getTime() - new Date(createdAt).getTime())/(1000*60) > 11){
        console.log("Deleted token since start time: " + createdAt + " and now it is " + new Date())
        await Token.findByIdAndDelete(found[0]._id)
        return response.status(400).send({message: 'token expired'})
    } 
    const user = await User.find({userID: userID})
    if(user.length == 0){return response.status(400).send({message: 'no user found'})}
    const idToReset = user[0]._id


    const hashedPass = await bcrypt.hash(request.body.password, 10);

    const update = await User.findByIdAndUpdate(idToReset, {passWord: hashedPass})
    await Token.findByIdAndDelete(found[0]._id)

    return response.status(200).send({message: 'success', update})
    } catch (error){
        const found = await Token.find({token: request.body.token})
        const deleted = await Token.findByIdAndDelete(found[0]._id)
        console.log(deleted)
        console.log(error)
        response.status(500).send({message: "error"} );
    }
    
})
// password reset
const passwordResetTemplate = (link) => {return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .reset-btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You requested to reset your password. Click the button below to proceed:</p>
            <a href="${link}" class="reset-btn" style="color: #ffffff; text-decoration: none;">Reset Password</a>
            
        </div>
        <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </div>

</body>
</html>`}

router.post('/resetrequest', async (request, response) => {

   try { if(!request.body.email || !request.body.link){return response.status(400).send({message: 'send all fields'})}

    const user = await User.find({email: request.body.email})
    if(user.length == 0){return response.status(400).send({message: 'no user exists'})}

    const userID = user[0].userID


    const email = request.body.email

    const token = crypto.randomBytes(32).toString('hex');
    const found = await Token.find({userID: userID})
    if(found.length >= 1){
        const entry = found[0]
        const res = await Token.findByIdAndUpdate(entry._id, {token: token})
        console.log(res)
    }
    else{
    await Token.create({token: token, userID: userID}) 
    }
    const info = await transporter.sendMail({
        from: 'dailyhabster@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "", // plain text body
        html: passwordResetTemplate(request.body.link + "/" + token), // html body
      });
      console.log("Message sent: %s", info.messageId);

      return response.status(200).json({success: "true", link: request.body.link + "/" + token});

    } catch (error){
    console.log(error)
    response.status(500).send({ message: error.message });
}
    
    
})

// check if token exists 
router.post('/checktoken', async (request, response) => {
    try{
        if(!request.body.token) {throw new Error("no token found")}
        const token = request.body.token
        const found = await Token.find({token: token})
        response.status(200).send({ found: found.length == 1 });

    } catch (error){
        console.log(error)
        response.status(500).send({ found: false });
    }
})

// Username revocery
const usernameTemplate = (username) => {return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Username Recovery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .username {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            <h1>Username Recovery</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>It looks like you've requested to recover your username.</p>
            <p>Your username is:</p>
            <p class="username">${username}</p> <!-- Replace {{username}} with the actual username -->
            <p>If you didn't request this, please ignore this email.</p>
        </div>
    </div>

</body>
</html>
`}
router.post('/forgotusername', async (request, response) => {
    try{
        if(!request.body.email){return response.status(400).send({message: 'no email provided'})}
        const found = await User.find({email: request.body.email}).exec()
        if(found == 0){throw new Error("User does not exist")}
        const user = found[0]

        const info = await transporter.sendMail({
            from: 'dailyhabster@gmail.com', // sender address
            to: request.body.email, // list of receivers
            subject: "Username Recovery", // Subject line
            text: request.body.text, // plain text body
            html: usernameTemplate(user.userName), // html body
          });
          console.log("Message sent: %s", info.messageId);

          return response.status(200).json({success: "true"});
    }catch (error){
        console.log(error)
        response.status(500).send({ message: error.message });
    }
    
})
// EMAIL VERIFICATION
// email html template for email verification

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

    
    const elapsedMinutes =  (new Date().getTime() - new Date(found[0].updatedAt).getTime())/(1000*60) 
    console.log(elapsedMinutes)

    
    if(found[0].code == request.body.code){
        if(elapsedMinutes > 11){throw new Error("this code has expired")}
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

        // check if email or username exists
        let error = ''
        // check if username exists
        const found = await User.find({userName: request.body.userName}).exec() 
        console.log(found.length)
        if(found.length > 0){error = 'username taken'}
        // check if email exists
        const foundEmail = await User.find({email: request.body.email}).exec() 
        if(foundEmail.length > 0){
            if(error != ''){error += ' and email already registered'}
            else{error = 'email already registered'}
        }
        // raise error if error is not empty
        if(error != ''){throw new Error(error)}

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

// used to update username and email => TODO add email update

router.put('/:id', async (request, response) => {
    try{
        if(!request.body.userName || !request.body.email){throw new Error("send all information")}
        const { id } = request.params;
        const currUser = await User.findById(id)
        // check if email or username exists
        let error = ''
        // check if username exists
        const found = await User.find({userName: request.body.userName}).exec() 
        console.log(found.length)
        if(found.length == 1 && request.body.userName != currUser.userName){error = 'username taken'}
        // check if email exists
        const foundEmail = await User.find({email: request.body.email}).exec() 
        if(foundEmail.length == 1 && request.body.email != currUser.email){
            if(error != ''){error += ' and email already registered'}
            else{error = 'email already registered'}
        }
        // raise error if error is not empty
        if(error != ''){throw new Error(error)}

        
        const newInfo = {
            userName: request.body.userName,
            email: request.body.email,
            verified: currUser.email == request.body.email
        }

        const user = await User.findByIdAndUpdate(id, newInfo,  { new: true, runValidators: true })


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
