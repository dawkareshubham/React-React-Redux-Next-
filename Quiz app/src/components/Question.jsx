

import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from '../questions.js';

export default function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
  
  const [ answer, setAnswer ] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      const isCorrect = answer === QUESTIONS[questionIndex].answers[0];
      setAnswer({
        selectedAnswer: answer,
        isCorrect,
      });

       setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);   
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id='question'>
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  )
}
