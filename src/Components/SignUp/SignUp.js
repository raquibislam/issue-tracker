import React, { useState } from 'react';
import '../../App.css';
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);





const SignUp = () => {


    const [signup, setSignup] = useState({
        email: '',
        password: ''
    })

    let expression = /^\S+@\S+\.\S+$/;

    const register = () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (isEmailValid(email) === false) {
            const newVal = { ...signup };
            newVal.email = "false";
            setSignup(newVal);
        } if (isPasswordValid(password) === false) {
            const newVal = { ...signup };
            newVal.password = "false";
            setSignup(newVal);
        }
        if (isEmailValid(email) === true && isPasswordValid(password) === true) {
            const newVal = { ...signup };
            newVal.email = email;
            newVal.password = password;
            setSignup(newVal);
            console.log(expression.test(email))
        }
    }



    const isEmailValid = (email) => {

        if (expression.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    const isPasswordValid = (password) => {
        if (password.length >= 4) {
            return true;
        } else {
            return false;
        }
    }


    const handleBtn = () => {
        register();
        console.log(signup)

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, signup.email, signup.password)
            .then((userCredential) => {

            })
            .catch((error) => {

            });
    }


    return (
        <div className='signup_container'>
            <div>
                <form>
                    <input id='name' type='text' placeholder='Name' name='name' required />
                    <br />
                    <input id='email' type='text' placeholder='Email' name='email' required />
                    <br />
                    <input id='password' type='password' placeholder='Password' name='password' required />
                    <br />
                    <button onClick={handleBtn} type='button'>Create an account</button>
                </form>
            </div>
            <p>{signup.email}</p>
        </div>
    );
};

export default SignUp;