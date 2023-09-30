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
        <div className="container flex justify-center items-center m-5">
        {blocks.map((block, i) => {
          return (
            <section key={i} className="m-3 flex flex-col p-3 border justify-center items-center">
              <h3 className="text-2xl">{block.prompt}</h3>
              <p className="text-2xl">{block.answer}</p>
            </section>
          );
        })}
        </div>
      </main>
    </DashboardLayout>
  );
}
