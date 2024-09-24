import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

import { getRequest, postRequest } from '../../api/request';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleToken = async () => {
    const res = await postRequest({
      url: 'auth/test',
      // data: { username, password },
      headers: {
        authorization: localStorage.getItem('jwt'),
      },
    });
    console.log(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postRequest({
      url: 'auth/login',
      data: { username, password },
    });
    console.log(res);

    // set token to cookies
    document.cookie = `jwt=${res.data}`;
    localStorage.setItem('jwt', res.data);
  };

  return (
    <>
      <form action='' className='p-4' onSubmit={handleSubmit}>
        Login
        <div className='flex flex-col'>
          <label htmlFor='username'>username:</label>
          <input
            type='text'
            name='username'
            id='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>password:</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>submit</button>
      </form>
      <button onClick={handleToken}>token</button>
    </>
  );
}
