/*
  Warnings:

  - You are about to drop the column `destinationId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destinationId_fkey";

-- DropIndex
DROP INDEX "transactions_destinationId_idx";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "destinationId";
