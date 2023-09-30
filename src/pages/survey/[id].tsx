import { SurveyForm } from "@/components/SurveyForm";
import Head from "next/head";

export default function Page() {
  return <>
    <Head>
      <title>Survey</title>
    </Head>
    <main className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        <SurveyForm />
      </div>
    </main>
  </>
}