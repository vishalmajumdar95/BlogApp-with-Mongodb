const LikeDislikeDB = require('../models/like_dislike');

// Create LikeDislike function
exports.createLikeDislike = async(req, res) => {
    try {
        await LikeDislikeDB.insertMany(req.body)
            .then((result) => {
                res.status(200).send({ message: 'LikeDislike Created Successfully..' })
                console.log(result);
            }).catch((err) => {
                res.status(403).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Delete LikeDislike function
exports.deleteLikeDislike = async(req, res) => {
    try {
        await LikeDislikeDB.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.status(200).send({ message: `LikeDislike Deleted Successfully... ` })
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Update LikeDislike function
exports.updateLikeDislikes = async(req, res) => {
    try {
        const data = await LikeDislikeDB.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                user_id: req.body.user_id,
                like: req.body.like,
                dislike: req.body.dislike
            }
        }).then((data) => {
            console.log("LikeDislike updated Successfully")
            res.status(200).send({ message: "LikeDislike Updated Successfully" })
        }).catch((err) => {
            console.log(err)
            res.status(404).send({ message: err.message })
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({ message: err.message })
    }
}

// Get LikeDislike By Id function
exports.getLikeDislikeDataById = async(req, res) => {
    try {
        const users = await LikeDislikeDB.findOne({ _id: req.params.id })
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

// Get All LikeDislike function
exports.getLikeDislikeDatas = async(req, res) => {
    try {
        const users = await LikeDislikeDB.find()
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