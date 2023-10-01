import { api } from "@/utils/api";
import ErrorPage from "next/error";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export const SelectedProgram = ({ id }: { id: number }) => {
  console.log("ID", id);
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

  const selectedQuestions = questions
    ? questions?.filter((data) => qidSet.has(data.qid))
    : [];

  if (!isLoading && !isError && !questions) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Card className="flex flex-col items-start gap-5 p-5">
      <CardTitle>{program?.name}</CardTitle>
      <CardDescription>{program?.description}</CardDescription>
      <CardContent className="flex flex-col gap-5">
        <p>{program?.location}</p>

        {selectedQuestions && selectedQuestions.length > 0 ? (
          <div className="flex flex-col gap-2">
            <h3>Program related questions</h3>
            <ol>{selectedQuestions?.map((q) => <li key={q.qid}>{q.question}</li>)}</ol>
          </div>
        ) : (
          <>No questions found</>
        )}
      </CardContent>
    </Card>
  );
};
