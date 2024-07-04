'use client';

import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
  }

  return (
    <form onSubmit={async (event) => await handleLogin(event)}>
      <label>
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
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
