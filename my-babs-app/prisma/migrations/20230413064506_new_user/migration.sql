/*
  Warnings:

  - You are about to drop the column `completedDateTime` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `accountAfter` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountBefore` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "completedDateTime",
ADD COLUMN     "accountAfter" INTEGER NOT NULL,
ADD COLUMN     "accountBefore" INTEGER NOT NULL,
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionType" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalDeposit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalTransfer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalWithdraw" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
