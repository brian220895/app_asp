import mongoose from 'mongoose'
const schema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      attachment: String,
    },
    { timestamps: true }
  );
  
const PostModel = mongoose.model("Post", schema);

export default PostModel;