import { Router,Request,Response } from 'express';
import { createUser, findUser } from '../prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/signup',async(req:Request,res:Response)=>{
    const body = req.body;
    if(!body.email||!body.password||!body.name){
        return res.status(400).json({ message: 'Credentials are required.' });
    }
    try {
        const user = await createUser(body.email,body.name,body.password);
        const token = jwt.sign(body, process.env.JWT_SECRET as string);
         return res.json({
            msg : `Hello ${user} . You are Successfully Signup!`,
            token:token
        })
    } catch (e) {
        console.error("Error creating user:", e);
        res.status(500).send("Something went wrong. Please try again later.");
    }
})
router.post('/login',async(req:Request,res:Response)=>{
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).send("All fields (email, password) are required.");
    }
    try {
        const user = await findUser(body.email,body.password);
        const token = jwt.sign(body, process.env.JWT_SECRET as string);
        res.json({
            msg:`Hello ${user?.name}, You are Successfully Logged In !!`,
            token : token
        })
    } catch (e) {
        return res.status(500).send("Something is Wrong with your email and password")
    }
})


export default router;