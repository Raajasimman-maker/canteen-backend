const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    partyName: { type: String, required: true },
    mobile: String,
    eventName: { type: String, required: true },
    date: { type: String, required: true },
    placeOfSupply: String,

    session1: Object,
    session2: Object,

    items1: Array,
    items2: Array,

    subtotal1: Number,
    subtotal2: Number,

    cgst: Number,
    sgst: Number,

    total: Number,
    grandTotal: Number,

    receivedAmount: Number,
    previousBalance: Number,
    currentBalance: Number,

    description: String
  },
  {
    timestamps: true // 🔥 important for sorting
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);