import { SurveyForm } from "@/components/SurveyForm";
import { api } from "@/utils/api";
import ErrorPage from 'next/error';
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = +(router.query.id as string);

  if (isNaN(id)) {
    return <ErrorPage statusCode={404} />
  }

  return <SurveyPage id={id} />
}

const SurveyPage = ({ id }: { id: number }) => {
  const { data: survey, isError, isLoading } = api.survey.getById.useQuery({ id })

  if (!isLoading && !isError && !survey) {
    return <ErrorPage statusCode={404} />
  }

  return <>
    <Head>
      <title>{survey?.info?.name ?? "Survey"}</title>
    </Head>
    <main className="min-h-screen flex justify-center p-4">
      <div className="flex flex-col gap-6 w-full max-w-md mt-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{survey?.info?.name ?? "Survey"}</h1>
          <p>Please fill out the survey after this event</p>
        </div>
        <SurveyForm questions={survey?.questions ?? []} />
      </div>
    </main>
  </>
}