import express, { Router,Request,Response, request } from 'express';
import jwtMiddleware from '../middleware/middleware';
import { PrismaClient } from '@prisma/client';
import jwt from  'jsonwebtoken';
const blogRouter = Router();
const prisma = new PrismaClient();

const function1 = (req: Request) => {  
    const authHeader = req.headers['authorization'];
    const token: string | undefined = authHeader?.split(' ')[1];
    if (!token) {
        return null; 
    }
    const encodedUserID = jwt.decode(token) as { email: string };
    return encodedUserID || null; 
}


blogRouter.post('/',jwtMiddleware,async(req:Request,res:Response)=>{
    const body = req.body;
    const data = function1(req);
    const email = data?.email;
    console.log(email);
    console.log(body);
    if (!body.title || !body.content) {
        res.status(400).send('Bad Request or Send Correct Information');
        return;
    }
    try {
        const blog1 = await prisma.post.create({
            data: {
                title:body.title,
                content:body.content,
                published: true,
                authorEmail: email || 'not know'
            }
        });
       
        res.json({ msg: "Your Blog is Created" });
    } catch (e) {
        return res.send("Something Happened to our Database. Come back a few hours later.");
        
    }
})

blogRouter.get('/myBlog', jwtMiddleware, async (req: Request, res: Response) => {
    const data = function1(req);
    if (!data) return; 
    const email = data.email;

    try {
        const blogs = await prisma.post.findMany({
            where: {
                authorEmail: email,
            },
        });
        res.json(blogs);
    } catch (e) {
        console.error(e);
        res.status(500).send("Something happened to our database. Please try again later.");
    }
});
blogRouter.get('/blogs',async (req:Request,res:Response)=>{
    try {
        const blogs = await prisma.post.findMany();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).send("Something happened to our database! Please try again later");
    }
})
export default blogRouter;