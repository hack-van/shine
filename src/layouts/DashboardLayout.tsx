import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/logo.png";
import { lato } from "@/components/ui/font";
import YouthIcon from "../assets/youth-worker.svg";

const features = ["users", "questions", "programs"];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <>
      <nav className="bg-dashboard fixed flex h-screen w-[250px] flex-col border-r p-4">
        <Link
          href="/dashboard"
          className="font-xl inline-flex pb-4 font-semibold tracking-tight"
        >
          <Image
            src={logo}
            alt="Youth Unlimited Logo"
            width={200}
            // className="invert dark:invert-0"
          ></Image>
        </Link>
        <div className="mt-8 flex flex-col">
          {features.map((item) => (
            <Link
              key={item}
              href={`/dashboard/${item}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                router.pathname.startsWith(`/dashboard/${item}`)
                  ? "bg-muted hover:bg-muted"
                  : "hover:hover:underline",
                "justify-start capitalize",
                "text-white",
                "bg-dashboard",
                "ml-3",
                lato.className,
              )}
            >
              {item}
            </Link>
          ))}
        </div>

        <Button
          variant="ghost"
          className="bg-destructiveButton hover:bg-destructiveButton mb-4 mt-auto rounded-none"
        >
          Sign out
        </Button>
      </nav>
      <main className="ml-[250px] h-screen flex-1 overflow-auto px-8 py-4">
        {children}
      </main>
    </>
  );
};
