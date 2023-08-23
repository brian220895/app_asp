import mongoose from 'mongoose'
const schema = new mongoose.Schema(
    {
      username: {
        type: String,
        require: true,
        min: 6,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        require: true,
        min: 6,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
const UserModel = mongoose.model("User", schema);

export default UserModel;