import { ColumnDef } from "@tanstack/react-table";
import { users } from "@/server/db/schema";

export const userColumns: ColumnDef<typeof users.$inferSelect>[] = [
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  }
];
