-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destinationId_fkey";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "bills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
