import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import { Button } from '../components/Buttton';
import { database } from '../services/firebase';
import '../styles/auth.scss';

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  const { user } = useAuth();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Entrar em uma sala existente <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
