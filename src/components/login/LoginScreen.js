import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginScreen = () => {

  const navigate = useNavigate(); // Allow to navigate programmatically
  const { dispatch } = useContext( AuthContext );
  
  const handleLogin = () => {
    const path = localStorage.getItem('lastPath') || '/';
    const loginAction = { type: types.login, payload: { name: 'Daniel Ramírez' } };
    dispatch(loginAction);
    navigate(path, { replace: true });
  }; 

  return (
    <div className='container mt-5'>
      <h1>Login</h1>
      <hr />

      <button 
        className='btn btn-primary'
        onClick={ handleLogin }>
        Login
      </button>
    </div>
  )
}
