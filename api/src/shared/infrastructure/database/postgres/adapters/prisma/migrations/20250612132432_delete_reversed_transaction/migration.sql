/*
  Warnings:

  - You are about to drop the `reversed_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reversed_transactions" DROP CONSTRAINT "reversed_transactions_transactionId_fkey";

-- DropTable
DROP TABLE "reversed_transactions";
