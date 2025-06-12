-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "destinationId" TEXT;

-- CreateIndex
CREATE INDEX "transactions_billId_idx" ON "transactions"("billId");

-- CreateIndex
CREATE INDEX "transactions_destinationId_idx" ON "transactions"("destinationId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
