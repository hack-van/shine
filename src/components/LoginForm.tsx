import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"


const loginSchema = z.object({
  email: z.string().nonempty({
    message: "Required"
  }).email({
    message: "Not a valid email"
  }),
  password: z.string().nonempty({
    message: "Required"
  })
})

type LoginSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [isSubmitting, setSubmittng] = useState(false);
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  // const { mutate } = api.user.addOne.useMutation()

  const onSubmit = async (data: LoginSchema) => {
    setSubmittng(true);
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false
      });
      if (response?.ok) await router.replace("/dashboard")
      if (response?.error) {
        form.setError("root", { message: "Incorrect email or password" })
      }
    } finally {
      setSubmittng(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login | Shine - Youth Unlimited</title>
      </Head>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          {form.formState.errors.root?.message ?
            <div className="text-sm text-destructive">{form.formState.errors.root.message}</div>
            : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
    </>
  )
}
