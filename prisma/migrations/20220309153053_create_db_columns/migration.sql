-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'USED', 'OLD');

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "bookName" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "institutionId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "locationAddress" TEXT NOT NULL,
    "locationNumber" INTEGER NOT NULL,
    "locationZipCode" TEXT NOT NULL,
    "locationComplemation" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" TEXT NOT NULL,
    "nameOfInstitution" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "adminOfInstitutionId" TEXT NOT NULL,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_year_key" ON "book"("year");

-- CreateIndex
CREATE UNIQUE INDEX "institution_nameOfInstitution_key" ON "institution"("nameOfInstitution");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institution" ADD CONSTRAINT "institution_adminOfInstitutionId_fkey" FOREIGN KEY ("adminOfInstitutionId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
