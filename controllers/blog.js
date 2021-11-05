const BlogDB = require('../models/blog');

// Create Blog function
exports.createBlogs = async(req, res) => {
    try {
        await BlogDB.insertMany(req.body)
            .then((result) => {
                res.status(200).send({ message: 'Blog Created Successfully..' })
                console.log(result);
            }).catch((err) => {
                res.status(403).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Delete Blog function
exports.deleteBlog = async(req, res) => {
    try {
        await BlogDB.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                res.status(200).send({ message: `Blog Deleted Successfully... ` })
            }).catch((err) => {
                console.log(err.message);
                res.status(404).send({ message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: err.message })
    }
}

// Update Blog function
exports.updateBlogs = async(req, res) => {
    try {
        const data = await BlogDB.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                author: req.body.author,
                title: req.body.title,
                description: req.body.description
            }
        }).then((data) => {
            console.log("Blog updated Successfully")
            res.status(200).send({ message: "Blog Updated Successfully" })
        }).catch((err) => {
            console.log(err)
            res.status(404).send({ message: err.message })
        })
    } catch (err) {
        console.log(err)
        res.status(404).send({ message: err.message })
    }
}

// Get Blog By Id function
exports.getBlogDataById = async(req, res) => {
    try {
        const users = await BlogDB.findOne({ _id: req.params.id })
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

// Get All Blog function
exports.getBlogDatas = async(req, res) => {
    try {
        const users = await BlogDB.find()
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