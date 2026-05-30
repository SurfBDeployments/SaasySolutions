import UsersClient from './UsersClient';

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  website: string;
  address: {
    street: string;
    city: string;
    suite: string;
    zipcode: string;
  };
};

export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });

  const data: User[] = await res.json();

  return <UsersClient data={data} />;
}
