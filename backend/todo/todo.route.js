
import { Todo, User } from "../db.js";

import express from "express"
const router=express.Router();
// const {Todo} =require( './db/db');
import loginMiddleware from '../middlewares/Loginmeddlware.js'

import { createTodo, updateTodo } from '../types.js';





router.get('/',(req,res)=>{
  res.json('simples get')
})
router.post('/todo', loginMiddleware, async (req, res) => {
  try {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    
    // Check if parsing was successful
    if (!parsePayload.success) {
      return res.status(400).json({
        msg: "You sent wrong inputs"
      });
    }

    // Create a new todo
    const tdos = await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      tag: createPayload.tag,
      completed: false
    });

    // Update user's todos array with the new todo's ID
    await User.updateOne({ username: req.user.username }, {
      "$push": {
        todos: tdos._id
      }
    });

    // Send response indicating success
    return res.status(201).json({ message: "Todo created", Todo: tdos });
  } catch (err) {
    console.error("Error creating todo:", err);
    // Send an error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/todos',loginMiddleware, async (req, res) => {
  const userId=req.user._id.toString();
 
 
  try{
   const Todos=userId
   const result = await User.findById(userId).populate("todos");
   console.log(result)
   
  return res.status(201).json({message:"Todo found  ", Todos:result.todos})
}catch(error){
  console.log("errorin Todos ",error.message)
    return res.status(500).json({message:"Internal server error"})
} 
});
  
router.put('/completed/:id',loginMiddleware,async(req,res)=>{ 
  // const parsePayload=updateTodo.safeParse(createPayload); 
  // if(!parsePayload.success){
  //   res.status(411).json({
  //     msg:"you sent the wrong inputs"
  //   })
  // }
  const id=req.params.id;
  
  await Todo.updateOne({ 
    _id:id
  },{
   completed:true
  })
  res.json({
    msg:"Todo marked as completed"
  })
})
router.put('/update/:id',loginMiddleware,async(req,res)=>{
  const todoId=req.params.id
  const userInput = req.body
  try{
  const todoExist =await  Todo.findOne({
      _id: todoId
  })
  if (!todoExist) {
      res.json({ msg: 'This todo doesnt exist' })
      return
  }
 
  const updateObject = {
    $set: {
    }
}

if (userInput.tag !== undefined ) {
    updateObject.$set.tag = userInput.tag
}
if (userInput.title !== undefined && userInput.title.trim() !== "") {
    updateObject.$set.title = userInput.title;
}
if (userInput.description !== undefined && userInput.description.trim() !== "") {
    updateObject.$set.description = userInput.description;
}
if (userInput.completed != undefined ) {
    updateObject.$set.completed = userInput.completed
}
try {
  console.log(updateObject)
    var updatedTodo = await Todo.updateOne(
        { _id: todoId },
        updateObject
    )
    return res.status(200).json({message:updatedTodo})
} catch (error) {
    console.log(error)
}
//return res.status(200).json({message:updatedTodo})
return res.status(400).json({message:"something went wrong"})
}catch(error){
  console.log("errorin update ",error.message)
  return res.status(500).json({message:"Internal server error"})
}
 })
router.get('/bulk',loginMiddleware,async(req,res)=>{
  console.log("bulk running")
    const user=req.user;
  try{
    
    const todos=await Todo.find({
        _id:{
            "$in":user.todos
        }
    })
   return res.status(200).json({todos})
   
  }catch(error){
    console.log("errorin bulk ",error)
    return res.status(500).json({message:"Internal server error"})
  }
})

router.delete("/delete/:id", loginMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log("User:", user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const todoIndex = user.todos.findIndex(todo => String(todo._id) === id);
    
    if (todoIndex === -1) {
      return res.status(404).send("Todo not found in user's todos array");
    }

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { todos:id } }
    );
    

    if (result.modifiedCount === 0) {
      return res.status(404).send("Todo not found during update");
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);
    console.log("Deleted Todo:", deletedTodo);

    res.status(200).send("Todo removed successfully");
  } catch (error) {
    console.error("Error in delete route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});





export default router