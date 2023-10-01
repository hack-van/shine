import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import ErrorPage from "next/error";
import { api } from "@/utils/api";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { programColumns } from "@/components/program/columns";

export default function Page() {
  const { data, isError, isLoading } = api.programs.getAll.useQuery();

  if (!isLoading && !isError && !data) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <Link
          href="programs/add"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Add program
        </Link>
        All programs
        {data ? (
          <DataTable columns={programColumns} data={data} />
        ) : (
          <p>We do not have any program for now</p>
        )}
      </main>
    </DashboardLayout>
  );
}
