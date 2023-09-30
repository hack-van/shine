import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardLayout>
      <main className="mx-auto flex max-w-md flex-col justify-center gap-5 text-center">
        <div className="space-x-4">
          <Link
            href="users/add"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Add users
          </Link>
          <Link
            href="users/assign"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Assign users
          </Link>
        </div>
      </main>
    </DashboardLayout>
  );
}
