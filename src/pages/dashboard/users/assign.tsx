import UserAddForm from "@/components/UserAddForm";
import UserAssignForm from "@/components/UserAssignForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="flex flex-1 items-center justify-center">
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
