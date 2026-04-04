const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Invoice = require("./models/Invoice");

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins for dev
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  next();
});

/* ===========================
   ✅ MONGODB ATLAS CONNECTION
=========================== */

// 🔥 Replace with YOUR Atlas DB name at end (/canteen)
const MONGO_URI =
  "mongodb+srv://graajasimman2006_db_user:admin123@cluster0.pzpb9ve.mongodb.net/canteen?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.error("MongoDB Connection Error ❌:", err));

/* ===========================
   ✅ GET ALL QUOTATIONS
=========================== */
app.get("/quotations", async (req, res) => {
  try {
    const quotations = await Invoice.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).send("Error fetching quotations ❌");
  }
});

/* ===========================
   ✅ GET SINGLE QUOTATION
=========================== */
app.get("/quotation/:id", async (req, res) => {
  try {
    const quotation = await Invoice.findById(req.params.id);

    if (!quotation) {
      return res.status(404).send("Quotation not found ❌");
    }

    res.json(quotation);
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).send("Error fetching quotation ❌");
  }
});

/* ===========================
   ✅ SAVE QUOTATION
=========================== */
app.post("/save", async (req, res) => {
  try {
    console.log("Incoming Data 👉", req.body); // DEBUG

    const {
      partyName,
      mobile,
      eventName,
      date,
      placeOfSupply,
      session1,
      session2,
      items1,
      items2,
      subtotal1,
      subtotal2,
      cgst,
      sgst,
      total,
      receivedAmount,
      previousBalance,
      currentBalance,
      description
    } = req.body;

    // ✅ Basic validation
    if (!partyName || !eventName || !date) {
      return res.status(400).send("Missing required fields ❌");
    }

    const newInvoice = new Invoice({
      partyName,
      mobile,
      eventName,
      date,
      placeOfSupply,
      session1,
      session2,
      items1,
      items2,
      subtotal1,
      subtotal2,
      cgst,
      sgst,
      total,
      grandTotal: total, // Map total to grandTotal for consistency
      receivedAmount,
      previousBalance,
      currentBalance,
      description
    });

    await newInvoice.save();

    console.log("Saved to DB ✅");

    res.send("Saved successfully ✅");
  } catch (err) {
    console.error("SAVE ERROR ❌:", err);
    res.status(500).send(`Server Error: ${err.message} ❌`);
  }
});

/* ===========================
   ✅ DELETE QUOTATION (OPTIONAL)
=========================== */
app.delete("/quotation/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully ✅");
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).send("Delete failed ❌");
  }
});

/* ===========================
   ✅ SERVER START
=========================== */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});