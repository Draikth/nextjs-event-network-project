'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { PostEventsResponseBodyPost } from '../api/postedEvents/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  userId: number;
};

export default function PostEventForm(props: Props) {
  const [postEvent, setPostEvent] = useState({
    name: '',
    userId: props.userId,
    type: '',
    date: '',
    location: '',
    duration: '',
    entryFee: '',
    category: '',
    description: '',
    image: '',
    organizerUrl: '',
    ageRestriction: false,
    archived: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  function addImageUrl(url: string) {
    setPostEvent({ ...postEvent, image: url });
  }

  console.log(addImageUrl);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Convert the necessary fields to the appropriate types
    const formattedEvent = {
      ...postEvent,
      date: new Date(postEvent.date), // Convert date string to Date object
      duration: parseInt(postEvent.duration, 10) || 0,
      entryFee: parseInt(postEvent.entryFee, 10) || 0,
      ageRestriction: Boolean(postEvent.ageRestriction),
      archived: Boolean(postEvent.archived),
    };

    // Log the formatted event to verify types
    console.log('Formatted Event:', formattedEvent);

    const response = await fetch('/api/postedEvents/', {
      method: 'POST',
      body: JSON.stringify(formattedEvent),
      headers: { 'Content-Type': 'application/json' },
    });

    const data: PostEventsResponseBodyPost = await response.json();

    if ('error' in data) {
      setErrorMessage(data.error);
      return;
    }

    router.push('/');
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const value =
      event.target.type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : event.target.value;

    setErrorMessage('');

    setPostEvent({
      ...postEvent,
      [event.target.name]: value,
    });
  }

  return (
    <div>
      <div>
        <hgroup>
          <h2>Event Details</h2>
          <p>* stands for required fields</p>
        </hgroup>
      </div>
      <br />
      <form onSubmit={handleCreate}>
        <div>
          <div>
            <h3>Upload Image</h3>
          </div>
          <Link href="/imageUpload">Poster for Event</Link>

          {/* <label htmlFor="image">Upload Image: </label>
          <input
            id="image"
            name="image"
            value={postEvent.image}
            onChange={handleChange}
          /> */}
        </div>
        <br />
        <br />
        <div>
          <label>
            *Event Name:
            <input
              required
              name="name"
              value={postEvent.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            *Event Type:
            <input
              required
              name="type"
              value={postEvent.type}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            *Event Category:
            <input
              required
              name="category"
              value={postEvent.category}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            *Event Date:
            <input
              type="date"
              required
              name="date"
              value={postEvent.date}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Event Duration:
            <input
              name="duration"
              value={postEvent.duration}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            *Event Location:
            <input
              required
              name="location"
              value={postEvent.location}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            *Event Description:
            <input
              required
              name="description"
              value={postEvent.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Organizer URL:
            <input
              name="organizerUrl"
              value={postEvent.organizerUrl}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Event Entry Fee:
            <input
              name="entryFee"
              value={postEvent.entryFee}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Age Restriction:
            <input
              type="checkbox"
              name="ageRestriction"
              checked={postEvent.ageRestriction}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Archived:
            <input
              type="checkbox"
              name="archived"
              checked={postEvent.archived}
              onChange={handleChange}
            />
          </label>
        </div>
        <br />
        <br />
        <br />
        <button>Post Event</button>
      </form>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
