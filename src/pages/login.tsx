import logo from "@/assets/logo.png";
import { LoginForm } from "@/components/LoginForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
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
          <h1 className="text-2xl font-bold tracking-tight">Login to Shine</h1>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  )
}