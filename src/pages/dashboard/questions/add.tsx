import { z } from "zod";

import QuestionForm from "@/components/QuestionForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import QuestionSearch from "@/components/ui/QuestionSearch";
import { api } from "@/utils/api";
import ErrorPage from "next/error";
import { useState } from "react";

const questionSchema = z.object({
  title: z.string().nonempty({
    message: "Required",
  }),
});

type QuestionSchema = z.infer<typeof questionSchema>;

export default function AddPage() {

  const { data, isError, isLoading } = api.question.getAll.useQuery();

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold tracking-tight">
              Add Question Form
            </h1>
          </CardHeader>
          <CardContent>
            <QuestionForm />
            {!isLoading ? <QuestionSearch questions={data} /> : <div></div>}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
