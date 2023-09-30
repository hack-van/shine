import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonNextUI,
} from "@nextui-org/react";

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

const userSchema = z.object({
  firstName: z.string().nonempty({
    message: "Required",
  }),
  lastName: z.string(),
  role: z.string().nonempty({
    message: "Required",
  }),
  email: z
    .string()
    .nonempty({
      message: "Required",
    })
    .email({
      message: "Not a valid email",
    }),
  password: z.string().nonempty({
    message: "Required",
  }),
  phoneNumber: z.string().nonempty({
    message: "Required",
  }),
});

type UserSchema = z.infer<typeof userSchema>;

const programs = [
  {
    key: "CreativeLife",
    label: "CreativeLife",
  },
  {
    key: "LifeStory",
    label: "LifeStory",
  },
];

export default function UserAssignForm() {
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="grid gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Place your first name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Place your last name here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* // TODO change role input to dropdown (Admin, Youth Worker)
        // Not important as much for current sprint */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programs</FormLabel>
              <FormControl>
                <Input type="" placeholder="Place your role here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Assign</Button>
      </form>
    </Form>
  );
}
