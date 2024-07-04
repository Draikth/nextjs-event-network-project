'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import { LoginResponseBodyPost } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );
  }

  return (
    <form onSubmit={async (event) => await handleLogin(event)}>
      <label>
        Username
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button>Login</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          <ErrorMessage>{error.message}</ErrorMessage>
        </div>
      ))}
    </form>
  );
}
