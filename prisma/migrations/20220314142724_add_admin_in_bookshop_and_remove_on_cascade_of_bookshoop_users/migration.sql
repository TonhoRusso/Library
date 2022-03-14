/*
  Warnings:

  - Added the required column `admin` to the `bookShop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookShopUsers" DROP CONSTRAINT "BookShopUsers_bookShopId_fkey";

-- DropForeignKey
ALTER TABLE "BookShopUsers" DROP CONSTRAINT "BookShopUsers_userId_fkey";

-- AlterTable
ALTER TABLE "bookShop" ADD COLUMN     "admin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "oldName" TEXT;

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_bookShopId_fkey" FOREIGN KEY ("bookShopId") REFERENCES "bookShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
