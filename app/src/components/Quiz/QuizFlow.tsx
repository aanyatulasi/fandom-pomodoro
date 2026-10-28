import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { GODLY_PARENT_QUIZ, scoreGodlyParentQuiz } from '../../data/godlyParentQuiz';
import { SORTING_QUIZ, scoreSortingQuiz } from '../../data/sortingQuiz';
import { RevealScreen } from './RevealScreen';
import type { GodId, HouseId } from '../../types';

export function QuizFlow({ onDone }: { onDone: () => void }) {
  const { state, dispatch } = useAppState();
  const isPJ = state.universe === 'percy-jackson';
  const questions = isPJ ? GODLY_PARENT_QUIZ : SORTING_QUIZ;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<GodId | HouseId | null>(null);

  const progress = (step / questions.length) * 100;

  const choose = (optionIndex: number) => {
    const next = [...answers, optionIndex];
    setAnswers(next);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      if (isPJ) {
        const god = scoreGodlyParentQuiz(next);
        dispatch({ type: 'SET_GOD_RESULT', god });
        setResult(god);
      } else {
        const house = scoreSortingQuiz(next);
        dispatch({ type: 'SET_HOUSE_RESULT', house });
        setResult(house);
      }
    }
  };

  const goBack = () => {
    if (step === 0) return;
    setAnswers(answers.slice(0, -1));
    setStep(step - 1);
  };

  if (result) {
    return <RevealScreen result={result} isPJ={isPJ} onContinue={onDone} onRetake={() => { setResult(null); setAnswers([]); setStep(0); }} />;
  }

  const q = questions[step];

  return (
    <div className="quiz-flow anim-fade-in">
      <div className="quiz-progress-track"><div className="quiz-progress-fill" style={{ width: `${progress}%` }} /></div>
      <div className="panel panel-strong quiz-card" key={q.id}>
        <p className="world-card-subtitle">Question {step + 1} of {questions.length}</p>
        <h2 className="quiz-prompt">{q.prompt}</h2>
        <div className="quiz-options">
          {q.options.map((opt, i) => (
            <button key={i} type="button" className="quiz-option" onClick={() => choose(i)}>
              {opt.text}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={goBack} disabled={step === 0}>
          ← Back
        </button>
      </div>
    </div>
  );
}
