'use client';

import { useState } from 'react';
import { Event } from '../../database/events';

type Props = {
  events: Event[];
};

export default function RegisterForm(props: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [organizerUrl, setOrganizerUrl] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');
}
