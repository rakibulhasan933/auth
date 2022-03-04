import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const handleGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
  };
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      // An error happened.
    });
  }
  const
  return (
    <div className="App">

      {!user.email ? <button onClick={handleGoogle}>Google</button> :

        <button onClick={handleLogOut}>Logout</button>}
      <br />
      {
        user.email && <div>
          <h2>Welcome{user.name} </h2>
          <p>Your email :{user.email} </p>
          <img src={user.photo} alt="man" />
        </div>
      }
    </div>
  );
}

export default App;
