import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  city: String,
  bio: String,
});

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;
