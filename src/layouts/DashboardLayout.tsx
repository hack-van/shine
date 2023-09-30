import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

const features = ["programs", "questions", "users"];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return <>
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-1 flex">
        <aside className="p-4 border-r flex flex-col w-[200px]">
          {features.map((item) => (
            <Link key={item} href={`/dashboard/${item}`} className={cn(
              buttonVariants({ variant: "ghost" }),
              router.pathname.startsWith(`/dashboard/${item}`)
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start capitalize"
            )}>
              Manage {item}
            </Link>
          ))}
        </aside>
        {children}
      </main>
    </div>
  </>
}