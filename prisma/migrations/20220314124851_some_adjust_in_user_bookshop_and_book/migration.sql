/*
  Warnings:

  - You are about to drop the column `institutionId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `locationComplemation` on the `book` table. All the data in the column will be lost.
  - You are about to drop the `institution` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookShopId` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationComplement` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "institution" DROP CONSTRAINT "institution_adminOfInstitutionId_fkey";

-- DropIndex
DROP INDEX "book_year_key";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "institutionId",
DROP COLUMN "locationComplemation",
ADD COLUMN     "bookShopId" TEXT NOT NULL,
ADD COLUMN     "locationComplement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "newEmail" TEXT,
ADD COLUMN     "newName" TEXT,
ADD COLUMN     "newPassword" TEXT;

-- DropTable
DROP TABLE "institution";

-- CreateTable
CREATE TABLE "BookShopUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookShopId" TEXT NOT NULL,

    CONSTRAINT "BookShopUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booksBookShop" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "bookShopId" TEXT NOT NULL,

    CONSTRAINT "booksBookShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookShop" (
    "id" TEXT NOT NULL,
    "nameOfBookShop" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "complement" TEXT NOT NULL,

    CONSTRAINT "bookShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "bookShop_nameOfBookShop_key" ON "bookShop"("nameOfBookShop");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToUser_AB_unique" ON "_BookToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToUser_B_index" ON "_BookToUser"("B");

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_bookShopId_fkey" FOREIGN KEY ("bookShopId") REFERENCES "bookShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booksBookShop" ADD CONSTRAINT "booksBookShop_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booksBookShop" ADD CONSTRAINT "booksBookShop_bookShopId_fkey" FOREIGN KEY ("bookShopId") REFERENCES "bookShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD FOREIGN KEY ("A") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
