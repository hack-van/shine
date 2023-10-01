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
import { api } from "@/utils/api";
import { useState } from "react";

export const userSchema = z.object({
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
  phoneNumber: z.string().nonempty({
    message: "Required",
  }),
});

type UserSchema = z.infer<typeof userSchema>;

export default function UserAddForm() {
  const { data, isError, isLoading } = api.programs.getAll.useQuery();
  const [programIds, setProgramIds] = useState<Set<number>>(new Set());
  const { mutate } = api.user.createOneWithPrograms.useMutation();

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const onHandleSubmit = (data: UserSchema) => {
    mutate({ field: data, program_ids: [...programIds] });
    window.location.href = "/dashboard/users";
  };

  const removeProgramId = (idDel: number) => {
    setProgramIds(
      (programIds) => new Set([...programIds].filter((id) => id !== idDel)),
    );
  };

  const addProgramId = (idAdd: number) => {
    setProgramIds((programIds) => new Set(programIds.add(idAdd)));
  };

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    qid: number,
  ) => {
    e.target.checked ? addProgramId(qid) : removeProgramId(qid);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHandleSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="required" required {...field} />
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
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="required" required {...field} />
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
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input type="text" placeholder="required" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="required"
                  maxLength={15}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="required" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p>Selected programs</p>
          {data ? (
            data.map((p) => {
              return (
                <div key={p.pid} className="my-3 ml-2 flex flex-row gap-3">
                  <input
                    type="checkbox"
                    onChange={(e) => onCheckboxChange(e, p.pid)}
                  ></input>
                  <label>{p.name} - {p.location}</label>
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
