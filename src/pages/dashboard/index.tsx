import AdminNavbar from "@/components/AdminNavbar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const features = ["programs", "questions", "workers"];

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-center sm:flex-row">
          {features.map((feature) => {
            return (
              <section className="m-2 flex w-full max-w-md flex-col items-center justify-center gap-3 border-2 py-10 bg-slate-100 rounded-lg">
                <h2 className="text-black">{feature.toUpperCase()}</h2>
                <Link
                  href={`/dashboard/${feature}`}
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Go to {feature}
                </Link>
                <Link
                  href={`/dashboard/${feature}/add`}
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Add {feature.slice(0, feature.length - 1)}
                </Link>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
