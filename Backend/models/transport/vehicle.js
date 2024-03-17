const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const vehicleSchema = new Schema({

    vehicle_no: {
        type: Number,
       required: true
    },
    type: {
        type: String,
       required: true
     },
    conditions: {
        type: String,
       required: true
    },

    capacity: {
       type: Number,
      required: true
   },

     owner_name : {
       type : String,
       required: true,
       trim: true
    },

    nic: {
       type: String,
       required: true
     },

    email: {
       type: String,
       required: true,
       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    },
     phone: {
       type: String,
       required: true
    },
       account_no: {
        type: Number,
       required: true
    },


   
})

const addvehicle = mongoose.model("vehicles", vehicleSchema);

module.exports = addvehicle;