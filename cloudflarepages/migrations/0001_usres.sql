-- Migration number: 0001 	 2024-09-27T09:08:42.905Z
 -- Migration number: 0000   2023-10-02T05:08:21.139Z
CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `username` TEXT NOT NULL
);
