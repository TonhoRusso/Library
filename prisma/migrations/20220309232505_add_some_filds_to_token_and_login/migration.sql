-- AlterTable
ALTER TABLE "user" ADD COLUMN     "login" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oldEmail" TEXT,
ADD COLUMN     "tokenValidation" TEXT;
