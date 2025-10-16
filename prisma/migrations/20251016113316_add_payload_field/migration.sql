-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EscapeRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "difficulty" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payload" JSONB
);
INSERT INTO "new_EscapeRoom" ("createdAt", "description", "difficulty", "id", "title") SELECT "createdAt", "description", "difficulty", "id", "title" FROM "EscapeRoom";
DROP TABLE "EscapeRoom";
ALTER TABLE "new_EscapeRoom" RENAME TO "EscapeRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
