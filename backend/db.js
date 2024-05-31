
import mongoose from "mongoose";

import dotenv from 'dotenv'
import { boolean } from "zod";

dotenv.config()

mongoose.connect(process.env.MONGO_URL);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String,
  completed: Boolean 
});

const userSchema=new mongoose.Schema({
  username:String,
  password:String,
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todo',
    // enum:[study,other,selfhelp]
}]
})
// Create the todo model
export const User=mongoose.model('user',userSchema)
export const Todo = mongoose.model('todo', todoSchema);



