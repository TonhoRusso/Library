-- DropForeignKey
ALTER TABLE "BookShopUsers" DROP CONSTRAINT "BookShopUsers_bookShopId_fkey";

-- DropForeignKey
ALTER TABLE "BookShopUsers" DROP CONSTRAINT "BookShopUsers_userId_fkey";

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookShopUsers" ADD CONSTRAINT "BookShopUsers_bookShopId_fkey" FOREIGN KEY ("bookShopId") REFERENCES "bookShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
