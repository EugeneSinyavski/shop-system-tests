/*
  Warnings:

  - A unique constraint covering the columns `[product_id,warehouse_id]` on the table `productLocation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productLocation_product_id_warehouse_id_key" ON "productLocation"("product_id", "warehouse_id");
