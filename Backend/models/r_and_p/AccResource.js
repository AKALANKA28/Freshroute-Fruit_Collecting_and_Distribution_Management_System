// AccRes.js
const mongoose = require('mongoose');

const AccResourceSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
    },
  email: { 
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
  
  resourceType: { 
    type: String, 
    required: true 
},
  otherResource: { 
    type: String, 
    required: false 
},
  
  detailReq: { 
    type: String, 
    required: false 
},
  

})

//   supportingDocs: [{ type: String }],
// }, {
//   timestamps: true,
// });

const AccResource = mongoose.model('AccResource', AccResourceSchema);

module.exports = AccResource;
