const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//Get All The Todos
router.get('/', async (req, res) => {
    await Todo.find({status: "active"})
    .select({
        _id: 0,
        date: 0
    })
    .limit(3)
    .exec((err, data) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                result: data,
                message: "Todo was read successfully!",
            });
        }
    });

});

//Get a The Todo by ID
router.get('/:id', async (req, res) => {
    await Todo.find({_id: req.params.id}, 
       (err, data) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                result: data,
                message: "Todo find successfully!",
            });
        }
    });

});

//Post Todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully!",
            });
        }
    });
});

//Post Multiple Todo
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully!",
            });
        }
    });
});

//Put Todo
// router.put('/:id', async (req, res) => {
//     await Todo.updateOne(
//         {_id: req.params.id},
//         {
//             $set: {
//                 status: "active",
//             },
//         },
//         (err) => {
//             if(err){
//                 res.status(500).json({
//                     error: "There was a server side error!",
//                 });
//             }else{
//                 res.status(200).json({
//                     message: "Todo was updated successfully!",
//                 });
//             }
//         }
//     );

// });

router.put('/:id', async (req, res) => {
   const result = await Todo.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {
                status: "active",
            },
        },
        {
            new: true,
            useFindAndModify:false,
        },
        (err) => {
            if(err){
                res.status(500).json({
                    error: "There was a server side error!",
                });
            }else{
                res.status(200).json({
                    message: "Todo was updated successfully!",
                });
            }
        }
    );
    console.log(result);

});

//Delete Todo
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({_id: req.params.id}, 
        (err) => {
         if(err){
             res.status(500).json({
                 error: "There was a server side error!",
             });
         }else{
             res.status(200).json({
                 message: "Todo deleted successfully!",
             });
         }
     });
});


module.exports = router;

