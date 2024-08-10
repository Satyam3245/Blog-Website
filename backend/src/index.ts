import express  from "express";
import cors from 'cors';
const app = express();
const port = 3000;
import router from "./route/userRoute";
import blogRouter from "./route/blogRoute";
app.use(cors());
app.use(express.json());
app.use('/api/v1/user/',router);
app.use('/api/v1/blog/',blogRouter);
app.listen(port,()=>{
    console.log(`Port is Listen ${port}`)
});