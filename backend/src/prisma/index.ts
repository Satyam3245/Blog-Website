import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
interface User {
  id: string;
  name: string;
  email: string;
}
interface blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  auhtorId: string;
}
export async function createUser(email:string,name:string,password:string): Promise<{email:string,id:string}|Error>{
    try {
       const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        }
      });
      
      return {email:user.email,id:user.id};
    } catch (error:any) {
      return new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
}

export async function findUser(email: string, password: string): Promise<{email:string,id:string} | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });
    if (user && await bcrypt.compare(password, user.password)) {
      return {email:user.email,id:user.id};
    }
    return null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function findUserByEmail(email:string){
  try {
      const user = await prisma.user.findFirst({
        where:{
          email:email
        }
      })
      if(!user){
        return null
      }else{
        return user
      }    
  } catch (error) {
     
  
  }
}
export async function findBlog(id:string): Promise<{}|null>{
  try {
    const blog = await prisma.post.findUnique({
      where:{
        id
      }
    })
    
    return blog
  } catch (error) {
    return null;
  }
}
export async function searchBlog(title: string):Promise<blog[]|null> {
  try {
    console.log('Searching for title:', title);
    const blog = await prisma.post.findMany({
      where: {
        title: {
          startsWith: title,
          mode: 'insensitive',
        },
      },
    });
    console.log('Search results:', blog);
    return blog;
  } catch (e) {
    console.log('Error occurred:', e);
    return null;
  }
}
