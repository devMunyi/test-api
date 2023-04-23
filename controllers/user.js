const { sign, verify } = require("jsonwebtoken")
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const {
    User
} = require('../models'); // require User models to avail its featured methods
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const emailValidator = require("email-validator");

module.exports = {
    signUpUser: async (req, res) => {
        const { name, password, passwordConfirmation } = req.body;
        let { email } = req.body;

        try {

            // validations
            if (!name) {
                return res.status(400).json({ message: "Name is required" })
            }

            if (!email) {
                return res.status(400).json({ message: "Email is required" })
            }

            // turn email to lowercase
            email = email.toLowerCase();

            if(!emailValidator.validate(email)){
                return res.status(400).json({ message: "Invalid Email" })
            }

            if (!password) {
                return res.status(400).json({ message: "Password is required" })
            }

            if (!passwordConfirmation) {
                return res.status(400).json({ message: "Password confirmation is required" })
            }

            // check if user with similar email exists
            const userExists = await User.findOne({ where: { email } });

            if (userExists !== null) {
                return res.status(400).json({ message: "Email already taken" });
            }

            // validate password length
            if (password.length < 6) {
                return res.status(400).json("Password should be minimum 6 characters")
            }

            //validate password matches
            if (password !== passwordConfirmation) {
                return res.status(400).json("Passwords should match");
            }

            // password hashing
            const salt = genSaltSync(10);
            hashedPassword = hashSync(password, salt);

            const user = await User.create({ name, email, password: hashedPassword });

            user.password = undefined;
            user.id = undefined;

            return res.status(201).json(user);

        } catch (error) {
            console.log(error);

            res.status(500).json(error);
        }
    },

    signInUser: async (req, res) => {
        const { email, password } = req.body;

        try {

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }

            // check if user exists
            const user = await User.findOne({ where: { email } });

            if (user === null) {
                return res.status(400).json({ message: "Email does not exists" });
            }

            // validate password
            const isValidPwd = compareSync(password, user.password);


            // handle incorrect password
            if (!isValidPwd) {
                return res.status(400).json({ message: "Incorrect password or username" });
            }


            const secretKey = config.JWT_SECRET;
            const { id: userId } = user;

            const jwt = sign({ userId }, secretKey, {
                expiresIn: '8h',
            });


            return res.status(200).json({
                token: 'Bearer ' + jwt
            });

        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    currentUser: async (req, res) => {
        const { userId } = req.auth;

        try {

            const user = await User.findByPk(
                userId,
                {
                    attributes: ['uuid', 'name', 'email']
                }
            );
            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    addTechnicalSkills: async(req, res) => {
        const technical_skills = req.body.technical_skills?.trim();
        const { userId } = req.auth;
        try {
            const user = await User.findByPk(userId);

            if(user === null){
                return res.status(404).json({ message: "User not found" });
            }

            user.technical_skills = technical_skills;
            await user.save();

            return res.status(200).json(user);
        } catch (error) {
            
        }
    },

    addSoftSkills: async(req, res) => {
        
        const soft_skills = req.body.soft_skills?.trim();
        const { userId } = req.auth;

        try {

            const user = await User.findByPk(userId);

            if(user === null){
                return res.status(404).json({ message: "User not found" });
            }

            user.soft_skills = soft_skills;
            await user.save();
            
            return res.status(200).json(user);
        } catch (error) {
            
        }
    },

    findAllUsers: async (req, res) => {
        try {
            const users = await User.findAndCountAll({
                where: { status: 1 },
                offset: 0,
                limit: 10,
                attributes: ['uuid', 'name', 'email']
            });

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    findOneUser: async (req, res) => {
        const { uuid } = req.params;
        try {
            const user = await User.findOne({
                where: { uuid },
                attributes: ['uuid', 'name', 'email']
            });

            if (user === null) {
                return res.status(404).json({ message: 'Not Found' });
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

};