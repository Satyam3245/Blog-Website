import express, { Router,Request,Response, request } from 'express';
import jwtMiddleware from '../middleware/middleware';
import { PrismaClient } from '@prisma/client';
import jwt from  'jsonwebtoken';
const blogRouter = Router();
const prisma = new PrismaClient();

interface DecodedToken {
    id: string;
    email: string;
  }
  
  const function1 = (req: Request): DecodedToken | null => {
    const authHeader = req.headers['authorization'];
    const token: string | undefined = authHeader?.split(' ')[1];
    if (!token) {
      return null; 
    }
  
    try {
      const decodedToken = jwt.decode(token) as DecodedToken;
      if (!decodedToken || !decodedToken.id || !decodedToken.email) {
        return null;
      }
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

blogRouter.post('/',jwtMiddleware,async(req:Request,res:Response)=>{
    const body = req.body;
    
    const data = function1(req);
    
    const id = data?.id;
    
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
                auhtorId: id || 'not know'
            }
        });
        res.json({ msg: "Your Blog is Created" });
    } catch (e) {
        return res.send("Something Happened to our Database. Come back a few hours later.");
        
    }
})

blogRouter.get('/myBlog', jwtMiddleware, async (req: Request, res: Response) => {
    const data = function1(req);
    const id = data?.id; 

    try {
        const blogs = await prisma.post.findMany({
            where: {
               auhtorId: id,
            },
        });
        
        res.json(blogs);
    } catch (e) {
        console.error(e);
        res.status(500).send("Something happened to our database. Please try again later.");
    }
});
blogRouter.put('/updateMyBlog', jwtMiddleware, async (req: Request, res: Response) => {
    const body = req.body;
    const data = function1(req);
    const id = data?.id; 
    if (!body.title || !body.content || !body.id) {
        return res.status(400).json({ error: 'Title, content, and ID are required.' });
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
                auhtorId:id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error updating blog:', error); 
        res.status(500).json({ error: 'Internal server error' });
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