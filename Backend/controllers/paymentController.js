const stripe = require("stripe")(process.env.STRIPE_SECRET);
const asyncHandler = require("express-async-handler");

exports.checkout = asyncHandler(async (req, res) => {
  try {
    const { products } = req.body; // Assuming cartProducts contains the products in the cart

    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new Error('No products found in the request body');
    }

    const lineItems = products.map(item => {
      if (!item.productId || !item.productId.title || !item.productId.price) {
        throw new Error('Invalid product data');
      }

      return {
        price_data: {
          currency: 'LKR',
          product_data: {
            name: item.productId.title, // Name of the product
          },
          unit_amount: item.productId.price * 100, // Price in the smallest currency unit (e.g., cents)
        },
        quantity: item.quantity || 1, // Default to quantity 1 if not provided
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/?success=true`, // Customize the success URL
      cancel_url: `http://localhost:3000/?canceled=true`, // Customize the cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
