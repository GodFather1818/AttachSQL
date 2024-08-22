/*
  Warnings:

  - You are about to drop the column `extractedText` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Attachment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "extractedText",
DROP COLUMN "fileUrl";

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "extractedText" TEXT NOT NULL,
    "summaryGenerated" TEXT,
    "attachmentId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "File_attachmentId_idx" ON "File"("attachmentId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
