import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Buttton';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const [roomCode, setRoomCode] = useState('');

  const history = useHistory();
  const { sigInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await sigInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    console.log(roomCode);
    

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()){
      alert(`Hmmmm...Parece que a sala ainda não foi criada!`);
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Ilustação simbolizando perguntas e respostas' />
        <strong>Crie salas Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logo} alt='LetMeAsk' />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt='Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
