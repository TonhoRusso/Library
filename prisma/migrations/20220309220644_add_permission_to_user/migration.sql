/*
  Warnings:

  - Added the required column `permission` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'COMMUN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "permission" "Permission" NOT NULL;
