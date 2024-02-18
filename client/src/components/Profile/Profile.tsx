import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { capitalizeWords } from '../../utilities/capitalizeWords';

export default function Profile() {
  const { user, isLoading } = useContext(AuthContext);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>Welcome {capitalizeWords(user.name)} 👋</div>
  );
}
