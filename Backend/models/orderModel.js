const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
      }, 
      shippingInfo: {
        // firstname:{
        //     type: String,
        //     required: true,
        // },
        // lastname:{
        //     type: String,
        //     required: true,
        // },
        address:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
        },
        apartment:{
            type: String,
        },
        pincode:{
            type: Number,
            required: true,
        }
      },
    //   paymentInfo: {
    //     razorpayOrderId: {
    //         type: String,
    //         required: true,
    //     },
    //     razorpayPaymentId: {
    //         type: String,
    //         required: true,
    //     }
    //   },
      orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required: true,
            },
            grade: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Grade",
                grade: true,
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
      ],
      payAt: {
        type: Date,
        default: Date.now()
      },
      month: {
        type: String,
        default: new Date().getMonth()
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    //   totalPriceAfterDiscount: {
    //     type: Number,
    //     required: true,
    //   },
      orderStatus: {
        type: String,
        default:"Paid"
      }
    }, {
        timestamps: true,
    });
    

//Export the model
module.exports = mongoose.model('ProductOrder', orderSchema);