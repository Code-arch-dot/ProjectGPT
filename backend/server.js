import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
    connectDB();
})

const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    }catch(err){
        console.log("Failed to connect DB"+err);
    }
}


// app.post("/test", async(req,res)=>{
//     const options = {
//         method:"POST",
//         headers:{
//             "Content-Type" :"application/json",
//             "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
//         },
//         body: JSON.stringify({
//             model:"openai/gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try{
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions",options);
//         const data = await response.json();

//          if (data.choices && data.choices.length > 0) {
//               res.send(data.choices[0].message.content);
//     } else {
//       console.error("OpenRouter error:", data.error);
//       res.status(500).send(data.error?.message || "No choices returned");
//     }

//     }catch(err){
//         console.log(err);
//     }

// });


