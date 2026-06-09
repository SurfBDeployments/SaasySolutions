// app/news/[category]/page.tsx
import NewsClient from '../news';

interface Props {
  params: Promise<{ category: string }> | { category: string };
}

async function getCategoryNews(category: string) {
  const apiKey = 'f01b13ead6314be08e2f76223e2b330f';
  const res = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`, {
    next: { revalidate: 300 }
  });
  
  if (!res.ok) return { articles: [] };
  return res.json();
}

export default async function CategoryNewsPage({ params }: Props) {
  const resolvedParams = await params;
  const { category } = resolvedParams;
  
  const data = await getCategoryNews(category);

  return <NewsClient data={data.articles || []}  />;
}