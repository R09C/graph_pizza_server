/*
  Warnings:

  - Added the required column `price` to the `ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "price" INTEGER NOT NULL;
