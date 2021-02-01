import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The Legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={(infodoevento) => {
                infodoevento.preventDefault();
                router.push(`/quiz/?name=${name}`);
                console.log('submit');
              }}
            >
              <Input
                type="text"
                value={name}
                name="name"
                placeholder="Diz aí seu nome"
                onChange={(infodoevento) => setName(infodoevento.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>The Legend of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              placeat autem fuga saepe exercitationem quod neque perspiciatis
              accusantium, inventore nobis reiciendis corrupti. Deserunt itaque
              nobis fuga molestias debitis eius rem!
            </p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/yudi-azvd" />
    </QuizBackground>
  );
}
