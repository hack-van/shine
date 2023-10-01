import type { AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { SurveyFromProgram } from "@/components/SurveyForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AnswerContext, { type Answer } from "@/context/answer";
import type { inferRouterOutputs } from '@trpc/server';
import { useState } from "react";

type Programs = inferRouterOutputs<AppRouter>["survey"]["getProgramsByUserId"]["programs"];

export default function Page() {
  const router = useRouter();
  const token = router.query.token as string;
  const { data, isLoading } = api.survey.getUserIdfromToken.useQuery({ token })

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <ErrorPage statusCode={404} />
  return <SurveyFromUser id={data.uid} />
}

function SurveyFromUser({ id }: { id: number }) {
  const { data, isLoading, isError } = api.survey.getProgramsByUserId.useQuery({ id })

  if (isLoading) return <div>Loading...</div>;
  if (data === undefined || isError) return <ErrorPage statusCode={500} />
  return (
    <>
      <SurveyMultistepForm programs={data.programs} uid={id} />
    </>
  )
}

function SurveyMultistepForm({ programs, uid }: { programs: Programs, uid: number }) {
  const router = useRouter()
  const { mutate, isLoading } = api.survey.postAnswer.useMutation();
  const { toast } = useToast()
  const [answer, setAnswer] = useState<Answer>({})
  const [step, setStep] = useState(0);
  const next = () => setStep(step => Math.min(step + 1, programs.length - 1))
  const prev = () => setStep(step => Math.max(step - 1, 0));
  const submit = () => {
    const data = Object.entries(answer).map(([key, value]) => {
      const [pid, qid] = key.split("#")
      return {
        uid,
        pid: +pid!,
        qid: +qid!,
        content: value
      }
    })
    console.log(data)
    return mutate(data, {
      onSuccess() {
        router.push("/survey/complete")
      },
      onError() {
        toast({
          title: "Something went wrong",
        })
      }
    })
  }


  return <main className="flex flex-col min-h-screen items-center">
    {/* Progress bar */}
    <div className="w-full">
      <div className="bg-destructive p-1" style={{
        width: `${(step + 1) / programs.length * 100}%`
      }}></div>
    </div>
    <div className="flex flex-col w-full max-w-md py-8 px-4">
      {/* Header */}
      <h1 className="text-2xl font-bold">{programs[step]!.name}</h1>
      {/* Content */}
      <AnswerContext.Provider value={{ answer, setAnswer }}>
        <SurveyFromProgram id={programs[step]!.pid} />
      </AnswerContext.Provider>

      {/* Navigation */}
      <div className="grid gap-2 grid-cols-2">
        <Button variant="ghost" disabled={step === 0} onClick={prev}>Previous</Button>
        <Button onClick={step === programs.length - 1 ? submit : next} disabled={isLoading}>
          {step === programs.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  </main >
}