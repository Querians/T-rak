-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(254) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT,
    "aboutMe" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Tierlist" (
    "tierlistId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "coverPhotoUrl" TEXT,

    CONSTRAINT "Tierlist_pkey" PRIMARY KEY ("tierlistId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Row" (
    "rowId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tierlistId" UUID NOT NULL,
    "label" VARCHAR(50),
    "color" VARCHAR(6),
    "order" SMALLINT NOT NULL,

    CONSTRAINT "Row_pkey" PRIMARY KEY ("rowId")
);

-- CreateTable
CREATE TABLE "Element" (
    "elementId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rowId" UUID NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "order" SMALLINT NOT NULL,
    "title" VARCHAR(50) NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("elementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tierlist" ADD CONSTRAINT "Tierlist_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tierlist" ADD CONSTRAINT "Tierlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_tierlistId_fkey" FOREIGN KEY ("tierlistId") REFERENCES "Tierlist"("tierlistId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "Row"("rowId") ON DELETE RESTRICT ON UPDATE CASCADE;
