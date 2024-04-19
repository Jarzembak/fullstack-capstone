/*
  Warnings:

  - Added the required column `city` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "billingCity" VARCHAR(255),
ADD COLUMN     "billingZipcode" VARCHAR(255),
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "zipcode" VARCHAR(255) NOT NULL,
ALTER COLUMN "billingAddress" DROP NOT NULL;
