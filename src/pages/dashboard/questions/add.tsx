import { z } from "zod";

import QuestionForm from "@/components/QuestionForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";

const questionSchema = z.object({
  title: z.string().nonempty({
    message: "Required",
  }),
});

type QuestionSchema = z.infer<typeof questionSchema>;

export default function AddPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">Add Question Form</h1>
          </CardHeader>
          <CardContent>
            <QuestionForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout >
  );
}
