import "server-only";

import { prisma } from "./prisma";

// ============================================
// User Operations
// ============================================

export async function getTotalUsers() {
  const count = await prisma.user.count();
  return count;
}