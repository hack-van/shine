import UserAddForm from "@/components/user/AddForm";
import UserAssignForm from "@/components/user/AssignForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">User Add Form</h1>
          </CardHeader>
          <CardContent>
            <UserAssignForm />
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
