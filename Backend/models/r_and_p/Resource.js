const mongoose = require('mongoose');



const ResourceSchema = mongoose.Schema({
    resource_type : {
        type : String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    qty: {
        type: String,
        required: true
    },

        
   
})

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;