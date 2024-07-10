export type Event = {
  id: number;
  user_id: number;
  name: string;
  type: string;
  date: Date;
  location: string;
  duration: number | null;
  entry_fee: number | null;
  category: string;
  description: string;
  image: string;
  organizer_url: string;
  age_restriction: boolean | null;
  archived: boolean | null;
};
