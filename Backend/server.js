import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const port = 5000; // You can change the port if needed

// Initialize Stripe with Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

const FRONTEND_URL = "https://food-del-tomato-frontend.onrender.com";
//const BACKEND_URL = "https://food-del-tomato-backend-stripe.onrender.com"

// Stripe payment success route
// app.get("/payment/#/success", (req, res) => {
//   return res.redirect(`${FRONTEND_URL}/success`);
// });

// // Stripe payment cancel route
// app.get("/payment/#/cancel", (req, res) => {
//   return res.redirect(`${FRONTEND_URL}/cancel`);
// });

// Added a health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Route for Creating Stripe Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `${BACKEND_URL}/payment/#/success`, // Redirect to backend
      // cancel_url: `${BACKEND_URL}/payment/#/cancel`, // Redirect to backend
      success_url: `${FRONTEND_URL}/#/success`, // ✅ Redirect directly to frontend
      cancel_url: `${FRONTEND_URL}/#/cancel`, // ✅ Redirect directly to frontend
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
