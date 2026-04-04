const mongoose = require("mongoose");
const Invoice = require("./models/Invoice");

const MONGO_URI = "mongodb+srv://graajasimman2006_db_user:admin123@cluster0.pzpb9ve.mongodb.net/canteen?retryWrites=true&w=majority";

async function testFetch() {
  try {
    await mongoose.connect(MONGO_URI);
    const quotations = await Invoice.find().sort({ createdAt: -1 });
    console.log("Quotations found:", quotations.length);
    console.log(JSON.stringify(quotations, null, 2));
    process.exit(0);
  } catch (err) {
    console.error("Fetch failed:", err);
    process.exit(1);
  }
}

testFetch();
