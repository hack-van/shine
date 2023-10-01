import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";
import { api } from "@/utils/api";
import { DataTable } from "@/components/data-table";
import { userColumns } from "@/components/user/columns";

export default function Page() {
  const { data, isError, isLoading } = api.user.getAll.useQuery();

  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <div className="space-x-4">
          <Link
            href="users/add"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Add users
          </Link>
          <Link
            href="users/assign"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Assign users
          </Link>
        </div>
        {isLoading ? (
          <p>No users found</p>
        ) : (
          <DataTable columns={userColumns} data={data!}/>
        )}
      </main>
    </DashboardLayout>
  );
}
