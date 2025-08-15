import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Route, Routes, json } from 'react-router-dom';
import { useState } from 'react';
import Home from './Components/Home/Home';
import { or } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

function App() {

  const [userProfile, setUser] = useState({
    name: '',
    email: '',
    sign: 'Sign out'
  });

  const [orUserLogged, setOrUserLogged] = useState(JSON.parse(localStorage.getItem("userLoggedIn")) || 'false');

  //let orUserLogged = JSON.parse(localStorage.getItem("userLoggedIn")) || 'false';
  const handle_signIn = () => {

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {

        if (result) {
          const cnt = "true";
          setOrUserLogged(cnt);
          localStorage.setItem("userLoggedIn", JSON.stringify(cnt));
        }
        const user = result.user;
        const newUser = { ...userProfile };
        newUser.name = user.displayName;
        newUser.email = user.email;
        setUser(newUser);

      }).catch((error) => {

      });

  }

  const handle_signOut = () => {
    if (localStorage.getItem("userLoggedIn")) {
      const cnt = "false";
      setOrUserLogged(cnt);
      localStorage.setItem("userLoggedIn", JSON.stringify(cnt));
    }
  }


  return (
    <div>

      {/* {
        orUserLogged === 'false' && <div>
          <Router>
            <Routes>
              <Route path="/" element={<Login handle_signIn={handle_signIn}></Login>} />
            </Routes>
          </Router>
        </div>
      } */}
      {
        //orUserLogged === 'true' && <div>

        <Home handleOut={handle_signOut} user={userProfile}></Home>

        //</div>
      }
    </div>
  );
}

export default App;
