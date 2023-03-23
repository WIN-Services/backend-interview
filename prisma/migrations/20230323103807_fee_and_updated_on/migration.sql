/*
  Warnings:

  - You are about to drop the column `OrderedOn` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `fee` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "OrderedOn",
ADD COLUMN     "orderedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "fee" INTEGER NOT NULL;
