import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ externalDb }) {
  return (
    <div>
      <ThemeProvider theme={externalDb.theme}>
        <QuizScreen
          externalQuestions={externalDb.questions}
          externalBg={externalDb.bg}
        />
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [projName, user] = context.query.id.split('___');
  const externalDb = await fetch(`https://${projName}.${user}.vercel.app/api/db`)
    .then((serverResponse) => {
      if (serverResponse.ok) { return serverResponse.json(); }

      throw new Error('Fail to fetch data');
    })
    .then((jsonResponse) => jsonResponse)
    .catch((err) => {
      console.log(err);
    });

  // console.log({ res: externalDb });

  return {
    props: {
      externalDb,
    },
  };
}
