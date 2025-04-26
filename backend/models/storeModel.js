import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    totalCoupons: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
