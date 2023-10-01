import { ColumnDef } from "@tanstack/react-table";
import { programs } from "@/server/db/schema";

export const programColumns: ColumnDef<typeof programs.$inferSelect>[] = [
  {
    accessorKey: "pid",
    header: "ID"
  },
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
  },
]