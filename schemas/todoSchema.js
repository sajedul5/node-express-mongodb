const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


// Instance Methods
todoSchema.methods = {
    findActive: function(){
        return mongoose.model("Todo").find({status: "active"});
    },
    findActiveCallback: function(cb){
        return mongoose.model('Todo').find({status: 'inactive'},cb);
    },
};


// static methods
todoSchema.statics = {
    findByStatic: function (){
        return this.find({title: /meeting/i});
    }
}


// Query Helper methods
todoSchema.query = {
    byQueryHelper: function (lng){
        return this.find({title: new RegExp(lng, "i")});
    }
}



module.exports = todoSchema;