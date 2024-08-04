import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface User {
  id: string;
  name: string;
  email: string;
}
export async function createUser(email:string,name:string,password:string): Promise<string|void>{
    try {
       const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        }
      });
      console.log("User created successfully");
      return user.name;
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      await prisma.$disconnect();
    }
}

export async function findUser(email: string, password: string): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });
    return user || null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}



