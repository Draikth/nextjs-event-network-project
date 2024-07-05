import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button formAction={logout}>logout</button>
    </form>
  );
}
