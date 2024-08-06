/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `Post` table. All the data in the column will be lost.
  - Added the required column `auhtorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorEmail_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorEmail",
ADD COLUMN     "auhtorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
