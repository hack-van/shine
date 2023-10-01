import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";

const features = ["programs", "questions", "users"];

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return <>
    <nav className="fixed h-screen flex flex-col border-r p-4 w-[250px]">
      <Link
        href="/dashboard"
        className="font-xl inline-flex font-semibold tracking-tight pb-4"
      >
        <Image
          src={logo}
          alt="Youth Unlimited Logo"
          width={200}
          className="invert dark:invert-0"
        ></Image>
      </Link>
      {features.map((item) => (
        <Link key={item} href={`/dashboard/${item}`} className={cn(
          buttonVariants({ variant: "ghost" }),
          router.pathname.startsWith(`/dashboard/${item}`)
            ? "bg-muted hover:bg-muted"
            : "hover:bg-transparent hover:underline",
          "justify-start capitalize"
        )}>
          {item}
        </Link>
      ))}
      <Button variant="destructive" className="mt-auto" onClick={() => signOut({ callbackUrl: "/login" })}>Log out</Button>
    </nav>
    <main className="flex-1 h-screen overflow-auto py-4 px-8 ml-[250px]">
      {children}
    </main>
  </>
}