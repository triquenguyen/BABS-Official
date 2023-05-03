-- CreateTable
CREATE TABLE "checks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileName" TEXT NOT NULL,
    "fileData" BYTEA NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "checks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checks" ADD CONSTRAINT "checks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
