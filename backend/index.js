import express from "express"
import todoRouter from './todo/todo.route.js'
import cors from "cors"
import authRouter from './auth/index.js'
import { fileURLToPath } from 'url';
import path from "path";
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname,"../frontend/dist")))


app.use("/todo",todoRouter)
app.use("/auth",authRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
const port=3000;
app.listen(port,()=>{
  console.log("running")
})
