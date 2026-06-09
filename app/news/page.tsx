// app/news/page.tsx
import NewsClient from './newsclient';

async function getGeneralNews() {
  const apiKey = 'f01b13ead6314be08e2f76223e2b330f';
  const res = await fetch(`https://newsapi.org/v2/top-headlines?category=general&apiKey=${apiKey}`, {
    next: { revalidate: 300 }
  });
  
  if (!res.ok) return { articles: [] };
  return res.json();
}

export default async function NewsPage() {
  const data = await getGeneralNews();
  return <NewsClient data={data.articles || []} />;
}