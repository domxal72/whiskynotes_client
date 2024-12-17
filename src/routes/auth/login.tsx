import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { postRequest } from '../../api/request';

export const Route = createFileRoute('/auth/login')({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // TODO: use localStorage or cookies?
  // const handleToken = async () => {
  //   const res = await postRequest({
  //     url: 'auth/test',
  //     // data: { username, password },
  //     headers: {
  //       authorization: localStorage.getItem('jwt'),
  //     },
  //   });
  // };

  const handleSubmit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const res: string = await postRequest({
      url: 'auth/login',
      data: { email, password },
      withCredentials: true,
    });

    // TODO: auth placeholder...
    localStorage.setItem('isAuthenticated', 'true');

    // TODO: use cookies and headers?
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // fetch('http://localhost:3000/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password }),
    //   headers: myHeaders,
    //   credentials: 'include',
    // });

    // set token to cookies
    // document.cookie = `jwt=${res.data}; HttpOnly`;
    // localStorage.setItem('jwt', res.data);
  };

  return (
    <>
      <form action='' className='p-4' onSubmit={handleSubmit}>
        Login
        <div className='flex flex-col'>
          <label htmlFor='email'>email:</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
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
      {/* <button onClick={handleToken}>token</button> */}
    </>
  );
}
