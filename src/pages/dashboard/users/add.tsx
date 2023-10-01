import UserAddForm from "@/components/user/AddForm";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <Link
          href="/dashboard/users"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Back to Users
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">User Add Form</h1>
          </CardHeader>
          <CardContent>
            <UserAddForm />
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
