import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        orderItems: [
            {
                quality: {type: String, required: true},
                name: {type: String, required: true},
                qty: {type: String, required: true},
                image: {type: String, required: true},
                price: {type: String, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Products',
                    required: true,
                }
            }
        ],
        shippingAddress: {
            fullName: {type: String},
            address: {type: String, required: true},
            email: {
                type: String,
                trim: true,
                lowercase: true,
            },
            location: {type: String},
            phoneNumber: {type: String, required: true},
            ShippingMethod: {type: String},
            shippingCost: {type: Number},
        },
        payments: {
            paymentMethod: {type: String},
            status: {type: String, default: 'pending', required: true},
            paymentMethod: {type: Date},
        },
        delivery: {
            status: {type: String, default: 'awaiting', required: true},
            deliveryDate: {type: Date},
            deliveryMethod: {type: String},
        },
        totalPrice: {type: Number, required: true},
        sudTotalPrice: {type: Number, required: true},
        taxPrice: {type: Number, required: true, default: 0.0},
    },
        {
            timestamps: true,
        }
);

export default mongoose.model('Order', OrderSchema);   
