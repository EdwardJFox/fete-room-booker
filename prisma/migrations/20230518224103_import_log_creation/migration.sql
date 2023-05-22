-- CreateEnum
CREATE TYPE "UserImportLogStatus" AS ENUM ('NEW', 'SKIP', 'ERROR');

-- CreateTable
CREATE TABLE "ImportLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB NOT NULL,

    CONSTRAINT "ImportLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImportLog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "UserImportLogStatus" NOT NULL,
    "importLogId" INTEGER NOT NULL,

    CONSTRAINT "UserImportLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserImportLog" ADD CONSTRAINT "UserImportLog_importLogId_fkey" FOREIGN KEY ("importLogId") REFERENCES "ImportLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
