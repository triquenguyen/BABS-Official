/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "totalAmount",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;
