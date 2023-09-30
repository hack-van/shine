import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Question = { id: string, title: string }
type Props = {
  questions: {
    qid: number,
    question: string | null
  }[]
}

export const SurveyForm = ({questions}: Props) => {
  const form = useForm();

  return <Form {...form}>
    <form className="grid gap-8" onSubmit={form.handleSubmit((data) => console.log(data))}>
      {
        questions.map(q => (
          <FormField
            key={q.qid}
            control={form.control}
            name={`${q.qid}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{q.question}</FormLabel>
                <FormControl>
                  <Input type="number" min={0} required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))
      }
      <Button type="submit">Submit</Button>
    </form>
  </Form>
}