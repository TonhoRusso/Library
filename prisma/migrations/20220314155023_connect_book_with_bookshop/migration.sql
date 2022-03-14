/*
  Warnings:

  - You are about to drop the `_BookToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booksBookShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookShop` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToUser" DROP CONSTRAINT "_BookToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "booksBookShop" DROP CONSTRAINT "booksBookShop_bookId_fkey";

-- DropForeignKey
ALTER TABLE "booksBookShop" DROP CONSTRAINT "booksBookShop_bookShopId_fkey";

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "bookShop" TEXT NOT NULL,
ALTER COLUMN "bookShopId" DROP NOT NULL;

-- DropTable
DROP TABLE "_BookToUser";

-- DropTable
DROP TABLE "booksBookShop";

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_bookShopId_fkey" FOREIGN KEY ("bookShopId") REFERENCES "bookShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
