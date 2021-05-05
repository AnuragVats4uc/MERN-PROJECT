const express = require("express");

const router = express.Router();

require("../db/conn");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require("../model/userSchema");

const authenticate = require('../middleware/authenticate');

// router.get('/',(req,res) => {
//     res.send('Hello world from the server router js');
// });

// router.post('/register', (req,res) => {

//     const { name , email , phone , work , password , cpassword  } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {

//         return res.status(422).json({error : ' Plz filled the data'});

//     }
//     User.findOne({email : email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error : 'email already exists'});
//         }
//         const user = new User({name,email,phone,work,password,cpassword});

//         user.save().then(() => {
//             res.status(201).json({message : 'user registered successfully'});
//         }).catch((err) => res.status(500).json({error: 'failed to registered'}));

//     }).catch(error => {console.log(error); });
// });

router.post("/register", async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {

        return res.status(422).json({ error: "Plz filled the field properly" });

    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        }

        const user = new User({ name, email, phone, work, password, cpassword });

        await user.save();

        res.status(201).json({ message: "user registered successfully" });

    } catch (error) {

        console.log(error);

    }
});

//login route
router.post("/signin", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({ error: "Plz filled the data" });

        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {

            let token;

            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            console.log(token);

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            });


            if (!isMatch) {

                res.status(422).json({ error: "Invalid Credentials" });

            } else {

                res.json({ message: "User signin successfully" });

            }

        } else {

            res.status(400).json({ error: ' Invalid Credentials ' });

        }

    } catch (error) {

        console.log(error);

    }
});

//about us page routing

router.get('/about', authenticate, (req, res) => {
    console.log("Hello My About");
    res.send(req.rootUser);
});


//get user data for contact and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log('Hello my getdata');
    res.send(req.rootUser);
})

//contact us page
router.post('/contact', authenticate, async (req, res) => {

    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plz filled the contact form" });
        }

        const userContact = await User.findOne({ _id:req.userID });

        if(userContact) {

            const userMessage = await userContact.addMessage(name,email,phone,message);

            await userContact.save();

            res.status(201).json({message:"user contact successfully"});

        }



    } catch (error) {
        console.log(error)
    }


});

//logout page

router.get('/logout',(req,res) =>{
    console.log('Hello my logout');
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send("User Logout");
});


module.exports = router;
