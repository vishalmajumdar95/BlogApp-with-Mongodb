const UserDB = require('../models/user');
const bcrypt = require('bcrypt')
const { GenerateToken } = require('../auth/jwt');

// Create User function
exports.createUsers = async(req, res) => {
    try {
        var encoded = bcrypt.hashSync(req.body.password, 10)
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: encoded
        }
        await UserDB.insertMany(userData)
            .then((result) => {
                res.status(200).send({ message: 'User Sign-in Successfully..' })
                console.log(result);
            }).catch((err) => {
                res.status(403).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Login User function
exports.loginUsers = async(req, res) => {
    try {
        var userdata = await UserDB.findOne({ email: req.body.email })
            // console.log(userdata.email)
        if (userdata) {
            var tokenCompare = await bcrypt.compareSync(req.body.password, userdata.password)
            if (tokenCompare) {
                const token = GenerateToken(req.body)
                res.cookie('key', token)
                res.send({ message: "You have login this page successfully..." })
                console.log({ message: "You have login this page successfully..." })
            } else {
                res.send({ message: "incorrect Password" })
            }
        } else {
            res.status(404).send({ message: "Email Required" })
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Delete User function
exports.deleteUsers = async(req, res) => {
    try {
        await UserDB.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.status(200).send({ message: `User Deleted Successfully... ` })
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Update User function
exports.updateUsers = async(req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const data = await UserDB.findByIdAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                }
            })
            .then((result) => {
                res.status(200).send({ message: `User Updated Successfully... ` })
                console.log(result);
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Get All User function
exports.getUserDatas = async(req, res) => {
    try {
        const users = await UserDB.find()
            .then((result) => {
                res.status(200).send({ message: result })
                console.log(result);
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
};

// Get User By Id function
exports.getUserDataById = async(req, res) => {
    try {
        const users = await UserDB.findOne({ _id: req.params.id })
            .then((result) => {
                if (result === null) {
                    res.status(404).send({ message: "This user is not exit!" })
                } else {
                    res.status(200).send({ message: result })
                    console.log(result);
                }
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            });
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
};