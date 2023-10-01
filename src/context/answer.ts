import { createContext, type Dispatch, type SetStateAction } from 'react';

export type Key = `${number}#${number}`;
export type Answer = Record<Key, number>;
export type SetAnswer = Dispatch<SetStateAction<Answer>>

interface AnswerContextType {
  answer: Answer;
  setAnswer: SetAnswer;
}

const AnswerContext = createContext<AnswerContextType>({} as AnswerContextType);

export default AnswerContext;
