import type { DefaultSession } from 'next-auth';
import { PostWhereInput as PrismaPostWhereInput } from '@prisma/client';


declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      Role : string;
    };
  }

}

declare module '@prisma/client' {
  interface PostWhereInput {
    disponibilities?: DateTimeNullableListFilter<"Post"> | Date[];
  }
}