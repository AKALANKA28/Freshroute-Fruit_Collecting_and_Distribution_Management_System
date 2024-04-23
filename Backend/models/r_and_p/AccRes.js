// AccRes.js
const mongoose = require('mongoose');

const AccResSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  email: { 
    type: String, 
    required: true 
    },
  farmName: { 
    type: String, 
    required: true
    },
  contactNumber: { 
    type: String, 
    required: true
    },
  location: { 
    type: String, 
    required: true 
},
  resourceType: { 
    type: String, 
    required: true 
},
  otherResource: { 
    type: String, 
    required: false 
},
  farmSize: { 
    type: String, 
    required: true 
},
  fruitType: { 
    type: String, 
    required: true 
},
  productionCapacity: { 
    type: String, 
    required: true 
},
  additionalInfo: { 
    type: String, 
    required: false 
},
  resourceDescription: { 
    type: String, 
    required: true 
},

})

//   supportingDocs: [{ type: String }],
// }, {
//   timestamps: true,
// });

const AccRes = mongoose.model('AccRes', AccResSchema);

module.exports = AccRes;
