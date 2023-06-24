-- CreateTable
CREATE TABLE "Travel" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "departTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Travel_userId_key" ON "Travel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Travel_fromId_key" ON "Travel"("fromId");

-- CreateIndex
CREATE UNIQUE INDEX "Travel_toId_key" ON "Travel"("toId");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
