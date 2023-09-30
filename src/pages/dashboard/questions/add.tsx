import { z } from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuestionForm from "@/components/QuestionForm";
import AdminNavbar from "@/components/AdminNavbar";

const questionSchema = z.object({
  title: z.string().nonempty({
    message: "Required",
  }),
});

type QuestionSchema = z.infer<typeof questionSchema>;

export default function AddPage() {
  return (
    <div>
      <AdminNavbar />
      <main className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">Add Question Form</h1>
          </CardHeader>
          <CardContent>
            <QuestionForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
