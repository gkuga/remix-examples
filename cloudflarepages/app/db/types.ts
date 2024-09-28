import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Post = {
    id: Generated<string>;
    content: string;
    userId: string | null;
    createdAt: Generated<number>;
};
export type User = {
    id: Generated<string>;
    name: string;
    createdAt: Generated<number>;
};
export type DB = {
    Post: Post;
    User: User;
};
