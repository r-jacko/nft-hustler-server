import mongoose from "mongoose";

const postSchema  = mongoose.Schema({
  projectName: String,
  category:String,
  description: String,
  mintDate:Date,
  mintPrice: Number,
  twitterLink: String,
  discordLink:String,
  selectedFile: String,
  createdAt:{
    type:Date,
    default: new Date(),
  },
  creator: String,
})

const PostMessage = mongoose.model("PostMessage", postSchema)
export default PostMessage;