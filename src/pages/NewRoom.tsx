import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import { Button } from '../components/Buttton';
import '../styles/auth.scss';

export function NewRoom() {
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
          <h2>Criar uma nova sala</h2>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Entrar em uma sala existente <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
