const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(

  // {
  //   products: [
  //     {
  //       product: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Product",
  //       },
  //       quantity: Number,
  //       grade: String,
  //       price: Number,
  //     },
  //   ],
  //   cartTotal: Number,
  //   totalAfterDiscount: Number,
  //   orderby: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // },
  // {
  //   timestamps: true,
  // }




  {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Grade"
    }

    },
    {
      timestamps: true,
    }
  );
  

//Export the model
module.exports = mongoose.model('Cart', cartSchema);