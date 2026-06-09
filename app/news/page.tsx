
import NewsClient from './news';


type NewsItem = {

  name: string;
  author: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export default async function NewsPage() {
  const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=f01b13ead6314be08e2f76223e2b330f', {
    cache: 'no-store',
  });

  const data: NewsItem[] = await res.json();

  return <NewsClient data={data} />;
}
