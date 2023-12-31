import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import ErrorPage from "next/error";
import { api } from "@/utils/api";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { programColumns } from "@/components/program/columns";
import { useState } from "react";
import { SelectedProgram } from "@/components/program/Selected";
import { programs } from "@/server/db/schema";

export default function Page() {
  const { data, isError, isLoading } = api.programs.getAll.useQuery();
  const [selectedProgram, setSelectedProgram] = useState<
    typeof programs.$inferSelect | null
  >(null);
  if (isError) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <DashboardLayout>
      <main className="m-10 flex flex-col items-start gap-5">
        
        <Link
          href="programs/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add program
        </Link>

        <div className="flex w-full flex-col justify-center gap-5 md:flex-row">
          <div className="flex-1 basis-0">
            {isLoading ? (
              <p>No program found</p>
            ) : (
              <DataTable
                columns={programColumns}
                data={data}
                setSelectedData={setSelectedProgram}
              />
            )}
          </div>
          <div className="flex-1 basis-0">
            {selectedProgram ? (
              <SelectedProgram id={selectedProgram.pid} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
