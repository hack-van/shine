import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnswerContext from "@/context/answer";
import { api } from "@/utils/api";
import { useContext } from "react";

export const SurveyFromProgram = ({ id }: { id: number }) => {
  const { isLoading, data, isError } = api.survey.getQuestionsByProgramId.useQuery({ id });
  const { setAnswer, answer } = useContext(AnswerContext);

  const updateAnswer = (qid: number, value: number) => {
    const key = `${id}#${qid}`
    setAnswer((old) => ({
      ...old,
      [key]: value
    }))
  }

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Error</div>

  return data.questions.map(q => (
    <div key={`${id}#${q.qid}`} className="flex gap-2 items-center py-4">
      <Label className="flex-1" htmlFor={`${id}#${q.qid}`}>{q.question}</Label>
      <Input
        type="number"
        id={`${id}#${q.qid}`}
        value={answer[`${id}#${q.qid}`] ?? 0}
        onChange={(e) => updateAnswer(q.qid, +e.target.value)}
        min={0}
        className="text-right w-[60px]" />
    </div>
  ))
}
