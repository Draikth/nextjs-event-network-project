type Props = {
  params: {
    username: string;
  };
};

export default function UserProfile(props: Props) {
  // 1. Check if the sessionToken cookie exists
  // 2. Query the current user with the sessionToken
  // 3. If user doesn't exist, redirect to login page
  // 4. If user exists, render the page

  return <h1>{props.params.username}'s Profile</h1>;
}
