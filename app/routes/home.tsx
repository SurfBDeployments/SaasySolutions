export const metadata = {
  title: "My New React Router App",
  description: "Welcome to My React Page!",
};

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to My React Page!</h1>
      <p>This route is now compatible with Next.js without the missing Welcome import.</p>
    </main>
  );
}
