 import express from "express";
 import notesRoutes from "./routers/notesRoutes.js"
 import { connectDB } from "./config/db.js";
 import dotenv from "dotenv"

 dotenv.config();

 const app = express(); // created a express server instance and assigned it to the app (it represents entire backend application)
 const PORT = process.env.PORT || 5001

 connectDB();

 //middleware
 app.use(express.json()); // use == "Apply", apply whats in () to app , here apply (express.json()) to app (entire backend)

 app.use((req,res,next) => {
   console.log(`req method is ${req.method} & rwq URl is ${req.url}`);
   next();
 })

 app.use("/app/notes",notesRoutes);

 app.listen(PORT , () => {
    console.log("Server is started on PORT:",PORT)
 }) 

