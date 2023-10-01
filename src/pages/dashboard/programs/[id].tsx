import { SurveyForm } from "@/components/SurveyForm";
import { buttonVariants } from "@/components/ui/button";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { api } from "@/utils/api";
import { Link } from "lucide-react";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const id = +(router.query.id as string);

  if (isNaN(id)) {
    return <ErrorPage statusCode={404} />;
  }

  return <ProgramPage id={id} />;
}

const ProgramPage = ({ id }: { id: number }) => {
  const {
    data: programToQuestions,
    isError: isError1,
    isLoading: isLoading1,
  } = api.programs.getProgramToQuestions.useQuery({ id });

  const {
    data: program,
    isError: isErrorProgram,
    isLoading: isLoadingProgram,
  } = api.programs.getById.useQuery({ id });

  const qidSet = new Set(programToQuestions?.map((x) => x.qid));
  const {
    data: questions,
    isError,
    isLoading,
  } = api.question.getAll.useQuery();

  const filteredData = questions
    ? questions?.filter((data) => qidSet.has(data.qid))
    : [];

  if (!isLoading && !isError && !questions) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <DashboardLayout>
      <main className="m-10 flex max-w-md flex-col items-start gap-5">
        <h1>Program name: {program?.name}</h1>
        <p>Program description: {program?.description}</p>
        <p>Program location: {program?.location}</p>

        <h3>Program related questions</h3>
        <ul>
          {questions ? filteredData?.map((q) => <ol>{q.question}</ol>) : <></>}
        </ul>
      </main>
    </DashboardLayout>
  );
};
