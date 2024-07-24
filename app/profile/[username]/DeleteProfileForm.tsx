'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type DeleteProfileFormProps = {
  sessionToken: string;
};

export default function DeleteProfileForm({
  sessionToken,
}: DeleteProfileFormProps) {
  const router = useRouter();

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/postedEvents/deleteEvent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionToken }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error('Failed to delete event');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button>Delete Profile</button>
    </form>
  );
}
