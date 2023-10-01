import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Link from "next/link";

export default function Page() {
  const blocks = [
    { prompt: "Meals Served", answer: "19,244" },
    { prompt: "Youth Mentored", answer: "655" },
    { prompt: "Youth in Discipleship programs", answer: "166" },
    { prompt: "Volunteers", answer: "291" },
    { prompt: "Connection Points", answer: "4,621" },
    { prompt: "Frontline Youth Workers", answer: "52" },
  ];

  return (
    <DashboardLayout>
      <main>
        <div className="flex h-full flex-col pt-32">
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
        </div>
      </main>
    </DashboardLayout>
  );
}
