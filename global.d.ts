import { Prisma } from "@prisma/client";

declare global {
  var prisma: Prisma;
  var mailer: any;
}