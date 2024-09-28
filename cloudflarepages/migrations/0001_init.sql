-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid()),
    "name" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL DEFAULT (unixepoch())
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT (uuid()),
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" INTEGER NOT NULL DEFAULT (unixepoch()),
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
