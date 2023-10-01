import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";
import { api } from "@/utils/api";
import { DataTable } from "@/components/data-table";
import { userColumns } from "@/components/user/columns";
import { UserSelectedPrograms, userSelectedPrograms, userSelectedQuestions } from "@/components/user/Selected";
import { users } from "@/server/db/schema";
import { useState } from "react";

export default function Page() {
  const { data, isError, isLoading } = api.user.getAll.useQuery();
  const [selectedUser, setSelectedUser] = useState<
    typeof users.$inferSelect | null
  >(null);
  
  return (
    <DashboardLayout>
      <main className="m-10 flex flex-col items-start gap-5">
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
        <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
          <div className="flex-1 basis-0">
            {isLoading ? (
              <p>No users found</p>
            ) : (
              <DataTable columns={userColumns} data={data!} setSelectedData={setSelectedUser} />
            )}
          </div>
          <div className="flex-1 basis-0">
            {selectedUser ? (
              <UserSelectedPrograms id={selectedUser.uid} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
