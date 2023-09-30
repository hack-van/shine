import { SurveyForm } from "@/components/SurveyForm";
import { api } from "@/utils/api";
import Head from "next/head";

export default function Page() {
  const { data: program } = api.programs.getById.useQuery({id: 1})

  return <>
    <Head>
      <title>{program?.name ?? "Survey"}</title>
    </Head>
    <main className="min-h-screen flex justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-md mt-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{program?.name ?? "Survey"}</h1>
          <p>Please fill out the survey after this event</p>
        </div>
        <SurveyForm />
      </div>
    </main>
  </>
}