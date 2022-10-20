-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_invitedToId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "invitedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invitedToId_fkey" FOREIGN KEY ("invitedToId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
