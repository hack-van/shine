import AdminNavbar from "@/components/AdminNavbar";
import ProgramAddForm from "@/components/program/AddForm";
import QuestionForm from "@/components/QuestionForm";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <Link
          href="/dashboard/programs"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Back to Program
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">
              Add Program Form
            </h1>
          </CardHeader>
          <CardContent>
            <ProgramAssignForm />
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
