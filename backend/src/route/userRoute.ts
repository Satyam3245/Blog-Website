import { Router,Request,Response } from 'express';
import { createUser, findUserByEmail ,findUser} from '../prisma';
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
const router = Router();
const saltRounds = 10;

router.post('/signup', async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'All credentials are required.' });
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const user = await createUser(email, name, hashPassword);

        const token = jwt.sign(user, process.env.JWT_SECRET as string);

        res.status(201).json({ token });
    } catch (e) {
        console.error("Error creating user:", e);
        res.status(500).send("Something went wrong. Please try again later.");
    }
});
router.post('/login',async(req:Request,res:Response)=>{
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).send("All fields (email, password) are required.");
    }
    try {
        const user = await findUser(body.email,body.password);
        
        if (user==null) {
            res.json({
                msg:'Credentials are not Match ! or Something Happened to our Database'
            })
        } else {
            const token = jwt.sign(user, process.env.JWT_SECRET as string);
            res.json({
                token : token
            })
        }
    } catch (e) {
        return res.status(500).send("Something is Wrong with your email and password")
    }
})


export default router;