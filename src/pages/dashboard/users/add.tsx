import AdminNavbar from "@/components/AdminNavbar";
import { LoginForm } from "@/components/LoginForm";
import UserAddForm from "@/components/UserAddForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <AdminNavbar />
      <main className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">User Add Form</h1>
          </CardHeader>
          <CardContent>
            <UserAddForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
