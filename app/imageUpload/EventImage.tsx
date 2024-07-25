'use client';
import { CldImage } from 'next-cloudinary';
import { SiteEvent } from '../../database/events';

type Props = {
  event: SiteEvent;
};

export default function EventImage(props: Props) {
  return (
    <CldImage
      width="150"
      height="150"
      src={props.event.image}
      crop="fill"
      sizes="100vw"
      alt={`${props.event.name} event picture`}
    />
  );
}
