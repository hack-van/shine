import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { api } from "@/utils/api";
import ErrorPage from "next/error";
import { useState } from "react";
import { SettingsUpdateListInstance } from "twilio/lib/rest/supersim/v1/settingsUpdate";

export const programToQuestionSchema = z.object({
  pid: z.number(),
  qid: z.number()
})

export const programSchema = z.object({
  name: z.string().nonempty({
    message: "Required",
  }),
  description: z.string(),
  location: z.string(),
});

export type ProgramSchema = z.infer<typeof programSchema>;

export default function ProgramAddForm() {
  const { data, isError, isLoading } = api.question.getAll.useQuery();
  const { mutate, data: inserted } = api.programs.createOneWithQuestions.useMutation();
  const [questionIds, setQuestionIds] = useState<Set<number>>(new Set());

  const form = useForm<ProgramSchema>({
    resolver: zodResolver(programSchema),
  });

  const onHandleSubmit = async (data: ProgramSchema) => {

    await mutate({field: data, question_ids: [...questionIds]});
    window.location.href = "/dashboard/programs";
  };

  const removeQuestionId = (idDel: number) => {
    setQuestionIds(
      (questionIds) => new Set([...questionIds].filter((id) => id !== idDel)),
    );
  };

  const addQuestionId = (idAdd: number) => {
    setQuestionIds((questionIds) => new Set(questionIds.add(idAdd)));
  };

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    qid: number,
  ) => {
    e.target.checked ? addQuestionId(qid) : removeQuestionId(qid);
  };

  if (!isLoading && !isError && !data) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program name (required)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Place the program name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Place the program description here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (required)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Place the program location here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p>Selected questions</p>
          {data ? (
            data.map((q) => {
              return (
                <div key={q.qid} className="my-3 ml-2 flex flex-row gap-3">
                  <input
                    type="checkbox"
                    onChange={(e) => onCheckboxChange(e, q.qid)}
                  ></input>
                  <label>{q.question}</label>
                </div>
              );
            })
          ) : (
            <>No question found</>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
