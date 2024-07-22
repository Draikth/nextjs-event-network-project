'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Comment } from '../../database/comments';
import { SiteEvent } from '../../database/events';
import { User } from '../../database/users';
import { CommentsResponseBodyPost } from '../api/comments/route';

type Prop = {
  comments: Comment[];
  user: Pick<User, 'username'>;
  event: Pick<SiteEvent, 'name'>;
};

export default function CommentsForm(props: Prop) {
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <>
      <h1>Notes for {props.user.username}</h1>

      <div>
        <div>
          {props.comments.length === 0 ? (
            'No Comments Posted'
          ) : (
            <ul>
              {props.comments.map((comment) => (
                <li key={`comments-${comment.id}`}>
                  <Link href="/comments">{comment.eventId}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div>
            <h2>Create Comment</h2>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const response = await fetch('/api/comments', {
                  method: 'POST',
                  body: JSON.stringify({
                    commentText,
                  }),
                });

                setErrorMessage('');

                if (!response.ok) {
                  let newErrorMessage = 'Error creating note';

                  try {
                    const responseBody: CommentsResponseBodyPost =
                      await response.json();

                    if ('error' in responseBody) {
                      newErrorMessage = responseBody.error;
                    }
                  } catch (error) {
                    // Don't fail if response JSON body
                    // cannot be parsed
                    console.error(error);
                  }

                  setErrorMessage(newErrorMessage);
                  return;
                }

                setCommentText('');

                router.refresh();
              }}
            >
              <div>{props.event.name}</div>

              <label>
                Comment
                <input
                  value={commentText}
                  onChange={(event) =>
                    setCommentText(event.currentTarget.value)
                  }
                />
              </label>

              <button>Add Comment</button>
            </form>

            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    </>
  );
}
