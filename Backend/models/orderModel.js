const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
//    shippingInfo: {
//     firstName: {
//         type: String,
//         required: true,    
//     },
//     lastName: {
//         type: String,
//         required: true,    
//     },
//     address: {
//         type: String,
//         required: true,    
//     },
//     city: {
//         type: String,
//         required: true,    
//     },
//     state: {
//         type: String,
//         required: true,    
//     },
//     other: {
//         type: String,
//         required: true,    
//     },
//     pincode: {
//         type: Number,
//         required: true,    
//     },
//    },
//    paymentInfo: {
//     stripepayOrderId: {
//         type: String,
//         required: true
//     },
//     stripepayPaymentId: {
//         type: String,
//         required: true
//     },
//    },
   orderItems: [
    {
        product: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        // grade: {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref: "Grade",
        //     required: true
        // },
        quantity: {
            type:Number,
            required: true
        },
        price: {
            type:Number,
            required: true
        },
    }
],
// paidAt: {
//     type: Date,
//     default: Date.now()
// },
totalPrice: {
    type: Number,
},
totalPriceAfterDiscount: {
    type: Number,
},
// orderStatus: {
//     type: String,
//     default: "Ordered"
// }
    
},
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('ProductOrder', orderSchema);