-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_auhtorId_fkey" FOREIGN KEY ("auhtorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
