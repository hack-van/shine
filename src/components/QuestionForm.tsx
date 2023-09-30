import AdminNavbar from "@/components/AdminNavbar";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


const questionSchema = z.object({
  title: z.string().nonempty({
    message: "Required"
  })
})

type QuestionSchema = z.infer<typeof questionSchema>

export default function QuestionForm() {
  const form = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="grid gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Name</FormLabel>
              <FormControl>
                <Input placeholder="Place your question name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}