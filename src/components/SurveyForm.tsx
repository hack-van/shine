import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Question = { id: string, title: string }

const questions: Question[] = [
  { id: "kids-mentored", title: "How many kids mentored?" },
  { id: "meals-serverd", title: "How many kids serverd?" },
]

export const SurveyForm = () => {
  const defaultValues = questions.map(question => question.id)
  const form = useForm();


  return <Form {...form}>
    <form className="grid gap-8" onSubmit={form.handleSubmit((data) => console.log(data))}>
      {
        questions.map(question => (
          <FormField
            key={question.id}
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.title}</FormLabel>
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