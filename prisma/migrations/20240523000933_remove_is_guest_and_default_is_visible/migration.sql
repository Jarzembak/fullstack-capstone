/*
  Warnings:

  - You are about to drop the column `isGuest` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "isVisible" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isGuest";
