import { useState } from 'react';
import { createContext } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import firebase from 'firebase';
import { auth } from './services/firebase';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

export const AuthContext = createContext({} as any);

function App() {
  const [user, setUser] = useState();

  async function sigInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Usuário sem informações suficientes');
        }

        setUser({
          id: uid, 
          name: displayName,
          avatar: photoURL
        })
      }
    });
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, sigInWithGoogle }}>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
