'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ buttonTitle }: { buttonTitle: string }) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Loading...' : buttonTitle}</button>
  );
}
