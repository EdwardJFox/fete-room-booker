-- AlterEnum
ALTER TYPE "UserImportLogStatus" ADD VALUE 'NO_EMAIL';

-- AlterTable
ALTER TABLE "UserImportLog" ALTER COLUMN "email" DROP NOT NULL;
