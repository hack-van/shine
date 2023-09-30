import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodArray, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { api } from "@/utils/api";
import ErrorPage from "next/error";

const programSchema = z.object({
  name: z.string().nonempty({
    message: "Required",
  }),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  questions: z.string().array(),
  users: z.string().array(),
});

type ProgramSchema = z.infer<typeof programSchema>;

export default function ProgramAddForm() {
  const { data, isError, isLoading } = api.question.getAll.useQuery();

  if (!isLoading && !isError && !data) {
    return <ErrorPage statusCode={404} />;
  }
  console.log("data", data);

  const form = useForm<ProgramSchema>({
    resolver: zodResolver(programSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="grid gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program name</FormLabel>
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
              <FormLabel>Description </FormLabel>
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
          name="startTime"
          type="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start time</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Place your role here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          type="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End time</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Place your role here"
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
                <div key={q.qid} className="border p-2 m-3">
                  <Checkbox></Checkbox>
                  &emsp;
                  <label>
                    {q.qid} - {q.question}
                  </label>
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
