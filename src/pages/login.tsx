import { LoginForm } from "@/components/LoginForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}