const stripe = require("stripe")
const instance = new stripe({
    key_id:"", key_secret:"sk_test_51P85tiKciT9oiVpgb9vlJdOnOVjTZOf3y0KGLObSVItsZVQWWPWQIzph7lv3NlVH6jtCBkwVQHfM1YXRYF0fSmmV00LNhhhQHo"
})   

// ("sk_test_51P85tiKciT9oiVpgb9vlJdOnOVjTZOf3y0KGLObSVItsZVQWWPWQIzph7lv3NlVH6jtCBkwVQHfM1YXRYF0fSmmV00LNhhhQHo")

exports.checkout = async (req, res) => {
    const options = {
        amount: 50000,
        currency: "inr"
    }

    const order = await instance.orders.create(options)

    res.json({
        success: true,
        order
    })
}

// exports.paymentVerification = async (req, res) => {
//     const { stripeOrderId, stripePaymentId } = req.body
//     res.json({
//         stripeOrderId, stripePaymentId
//     })      
// }
