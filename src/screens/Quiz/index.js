/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          {/* {`Você acertou ${results.reduce((acc, curr) => (curr ? acc + 1 : acc), 0)} questões`} */}
          {`Você acertou ${results.filter((x) => x).length} questões`}
        </p>
        <ul>
          {results.map((r, index) => {
            const key = `result__${index}`;
            return (
              <li key={key}>
                {`Resultado #${index + 1}: `}
                {' '}
                {r === true ? 'Você acertou!' : 'Você errou...'}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Caregando....
      </Widget.Header>

      <Widget.Content>
        desafio
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />

        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        alt="Descrição"
      />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(infodoevento) => {
          infodoevento.preventDefault();
          console.log('submited');

          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 3 * 1000);
        }}
        >
          {question.alternatives.map((alt, altIndex) => {
            const altId = `altId__${altIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === altIndex;

            return (
              <Widget.Topic
                as="label"
                key={altId}
                htmlFor={altId}
                data-status={isQuestionSubmited && alternativeStatus}
                data-selected={isSelected}
              >
                <input
                  style={{ display: 'none' }}
                  name={questionId}
                  id={altId}
                  type="radio"
                  onChange={() => setSelectedAlternative(altIndex)}
                />

                {alt}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
        </AlternativesForm>

        {isQuestionSubmited && isCorrect && <div>Você acertou!</div> }
        {isQuestionSubmited && !isCorrect && <div>Você errou!</div> }
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  // const [screenState, setScreenState] = useState(screenStates.RESULT);
  const [screenState, setScreenState] = useState(screenStates.QUIZ);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const totalQuestions = externalQuestions.length;
  const question = externalQuestions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      // setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}

      </QuizContainer>
    </QuizBackground>
  );
}
