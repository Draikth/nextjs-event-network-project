'use client';

import { useState } from 'react';

export default function PostEventForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState('');
  const [organizerUrl, setOrganizerUrl] = useState('');

  return (
    <div>
      <form>
        <div>
          <hgroup>
            <h2>Event Details</h2>
            <p>* stands for required fields</p>
          </hgroup>
          <div>
            <label htmlFor="security">Upload Image: </label>
            {/* <input
            id="security"
            data-test-id="checkout-security-code"
            name="security"
            placeholder="security code"
            value={security}
            onChange={(event) => setSecurity(event.currentTarget.value)}
            required
          /> */}
          </div>
          <br />
          <br />
          <label htmlFor="name">*Event Name: </label>
          <input
            id="name"
            data-test-id="name"
            name="name"
            placeholder="Event Name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="type">*Event Type: </label>
          <input
            id="type"
            data-test-id="type"
            name="type"
            placeholder="Event Type"
            value={type}
            onChange={(event) => setType(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="category">*Event Category: </label>
          <input
            id="category"
            data-test-id="category"
            name="category"
            placeholder="Event Category"
            value={category}
            onChange={(event) => setCategory(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="date">*Event Date: </label>
          <input
            id="date"
            data-test-id="date"
            name="date"
            placeholder="Event Date"
            value={date}
            onChange={(event) => setDate(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="duration">Event Duration: </label>
          <input
            id="duration"
            data-test-id="duration"
            name="duration"
            placeholder="Event Duration"
            value={duration}
            onChange={(event) => setDuration(event.currentTarget.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="location">*Event Location: </label>
          <input
            id="location"
            data-test-id="location"
            name="location"
            placeholder="Event Location"
            value={location}
            onChange={(event) => setLocation(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">*Event Description: </label>
          <textarea
            id="description"
            data-test-id="description"
            name="description"
            placeholder="Event Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="organizerUrl">*Organizer URL: </label>
          <input
            id="organizerUrl"
            data-test-id="organizerUrl"
            name="organizerUrl"
            placeholder="Organizer URL"
            value={organizerUrl}
            onChange={(event) => setOrganizerUrl(event.currentTarget.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="entryFee">Event Entry Fee: </label>
          <input
            id="entryFee"
            data-test-id="entryFee"
            name="entryFee"
            placeholder="Event Entry Fee"
            value={entryFee}
            onChange={(event) => setEntryFee(event.currentTarget.value)}
          />
        </div>
        <br />
        <br />
        <br />
        <button
        // onClick={clearAllInputFields}
        // disabled={
        //   !firstName ||
        //   !lastName ||
        //   !email ||
        //   !address ||
        //   !city ||
        //   !postalCode ||
        //   !country ||
        //   !creditCardNo ||
        //   !expiration ||
        //   !security
        // }
        >
          Post Event
        </button>
      </form>
    </div>
  );
}
