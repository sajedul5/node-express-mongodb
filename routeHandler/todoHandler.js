const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);


//Get active todos
router.get('/active', async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    });
});


//Get active todos with callback
router.get('/active-callback', (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data,
        });
    });
    
});


//get todo ststic method

router.get('/staticMethod', async (req, res) => {
    const data = await Todo.findByStatic();
    res.status(200).json({
        data,
    });
})


//get todo Query helper method

router.get('/queryHelper', async (req, res) => {
    const data = await Todo.find().byQueryHelper("love");
    res.status(200).json({
        data,
    });
})




//Get All The Todos with callback
router.get('/', (req, res) => {
 Todo.find({status: "active"})
    .select({
        _id: 0,
        date: 0
    })
    .limit(10)
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

//Get a The Todo by ID with asyn
router.get('/:id', async (req, res) => {
    
    try {
        const data = await Todo.find({_id: req.params.id});
        res.status(200).json({
            result: data,
            message: "Todo find successfully!",
        });

    }catch{
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});

//Post Todo
router.post('/',(req, res) => {
    const newTodo = new Todo(req.body);
     newTodo.save((err) => {
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
router.post('/all', (req, res) => {
     Todo.insertMany(req.body, (err) => {
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

router.put('/:id', (req, res) => {
   const result = Todo.findByIdAndUpdate(
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
router.delete('/:id',  (req, res) => {
     Todo.deleteOne({_id: req.params.id}, 
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

