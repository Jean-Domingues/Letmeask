import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Buttton';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');

  const roomId = params.id;

  async function handleSenQuestion(event: FormEvent) {
    try {
      event.preventDefault();
      if (newQuestion.trim() === '') {
        return;
      }

      if (!user) {
        throw new Error('Você precisa logar para cadastrar uma pergunta!');
      }

      const question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        isHighLighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${roomId}/questions`).push(question);

      alert('Pergunta enviada!');
      setNewQuestion('');
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='LetMeAsk' />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala de perguntas</h1>
          <span>4 perguntas</span>
        </div>
        <form onSubmit={handleSenQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
