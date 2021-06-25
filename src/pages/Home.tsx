import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Buttton';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();

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
          <button onClick={() => history.push('/rooms/new')} className='create-room'>
            <img src={googleIconImg} alt='Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o código da sala' />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
