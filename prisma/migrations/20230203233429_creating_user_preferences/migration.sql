-- CreateEnum
CREATE TYPE "PreferenceTypeOfRoom" AS ENUM ('QUIET', 'PARTY');

-- CreateEnum
CREATE TYPE "PreferenceDietaryRequirements" AS ENUM ('NONE', 'VEGAN', 'VEGETARIAN');

-- CreateTable
CREATE TABLE "Preference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "typeOfRoom" "PreferenceTypeOfRoom" NOT NULL,
    "dietary" "PreferenceDietaryRequirements" NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
