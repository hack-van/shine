import AdminNavbar from "@/components/AdminNavbar";
import ProgramAddForm from "@/components/program/AddForm";
import QuestionForm from "@/components/QuestionForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">
              Add Program Form
            </h1>
          </CardHeader>
          <CardContent>
            <ProgramAddForm />
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
