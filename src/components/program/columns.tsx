import { ColumnDef } from "@tanstack/react-table";
import { programs } from "@/server/db/schema";
import { api } from "@/utils/api";

export const programColumns: ColumnDef<typeof programs.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "location",
    header: "Location",
  }
];
