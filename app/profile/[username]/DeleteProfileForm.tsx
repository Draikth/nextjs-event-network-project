'use client';

import React from 'react';

type DeleteProfileFormProps = {
  sessionToken: string;
};

export default function DeleteProfileForm({ sessionToken }: DeleteProfileFormProps) {
  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionToken }),
    });

    if (response.ok) {
      window.location.href = '/login'; // Redirect to login page after deletion
    } else {
      console.error('Failed to delete user');
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button>Delete Profile</button>
    </form>
  );
}
