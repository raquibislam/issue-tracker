import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import google from '../../images/google.png';
import { Alert, AlertIcon, Button, ChakraProvider, WrapItem } from '@chakra-ui/react';



const Login = (props) => {

    return (
        <ChakraProvider>
            <div className='login_container'>
                <div className='login_left'>
                    <h2>Issue Tracker </h2>
                    <p>Issue tracker most widly used any workplace</p>
                </div>
                <div className='login_col'>
                    <Button onClick={props.handle_signIn} className='chakra_button'>
                        <img className='img_google' src={google} alt='image' />
                        Sign in With Google
                    </Button>

                </div>
            </div >
        </ChakraProvider>
    );
};

export default Login;