import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

import { getRequest, postRequest } from '../../api/request';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
});

function SignIn() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postRequest({
      url: 'auth/sign-in',
      data: { username, password },
    });
  };

  return (
    <form action='' className='p-4' onSubmit={handleSubmit}>
      Sign in
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
  );
}
