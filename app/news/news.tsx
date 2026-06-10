'use client';

import ResponsiveAppBar from '../components/appbar';
import Footer from '../components/footer';
import '../../styles/default.css';
import Paper from '@mui/material/Paper';
import NavBar from '../components/newsnav'; // Adjust path to your NavBar if needed
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const cardStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '20px',
  padding: '16px',
};

const imageStyles = {
  width: '100%',
  height: '220px',
  objectFit: 'cover' as const,
};

const contentStyles = {
  minHeight: '220px',
};

type NewsItem = {
  id?: string | number | null;
  title?: string;
  name?: string;
  source?: {
    id?: string | null;
    name?: string;
  };
  author?: string | null;
  description?: string | null;
  url?: string;
  urlToImage?: string;
  publishedAt?: string | null;
  content?: string | null;
};


interface NewsClientProps {
  data: NewsItem[];
}

export default function NewsOldClient({ data }: NewsClientProps) {
  return (
    <>
      <ResponsiveAppBar />

      <article>

        <div className="max-w-7xl mx-auto">
          
          <div className="maincontent">
  <h1 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}>Products</h1>
             <h2 className="max-w-m text-4xl font-semibold leading-10 tracking-tight text-black dark:text-cyan-800" style={{ textAlign: "left" }}><Link href="/products">Data Visualizations</Link> | News APIs</h2>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed">
              A sample listing of news from around the world via our platform. (connected by a Rest API using API keys).
            </h5>
<NavBar />
            <Paper sx={{ width: '100%', padding: 2, backgroundColor: '#fafafa' }}>
              <div style={cardStyles}>
                {data.length === 0 ? (
                  <Typography>No news items available.</Typography>
                ) : (
                  data.map((newsItem, index) => (
                    <Card key={newsItem.url || newsItem.id || index} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      {newsItem.urlToImage ? (
                        <CardMedia
                          component="img"
                          image={newsItem.urlToImage}
                          alt={newsItem.title || newsItem.name || 'News image'}
                          sx={imageStyles}
                        />
                      ) : null}
                      <CardContent sx={contentStyles}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {newsItem.title || newsItem.name || 'Untitled story'}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {newsItem.author
                            ? `By ${newsItem.author}`
                            : newsItem.source?.name
                              ? `Source: ${newsItem.source.name}`
                              : 'Author unknown'}
                        </Typography>
                       {/*  <Typography variant="body2" component="p" gutterBottom>
                          {newsItem.description || 'No description available.'}
                        </Typography> */}
                        <Typography variant="caption" component="div" color="text.secondary" sx={{ display: 'block' }} gutterBottom>
                          {newsItem.publishedAt ? new Date(newsItem.publishedAt).toLocaleString() : 'Publish date unavailable'}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {newsItem.content || 'No content provided.'}
                        </Typography> 
                      </CardContent>
                      <CardActions>

                        <Button size="small" onClick={() => newsItem.url && window.open(newsItem.url, '_blank')}>Read More</Button>

                      </CardActions>
                    </Card>
                  ))
                )}
              </div>
            </Paper>
          </div>
        </div>
      </article>


      <Footer />
    </>
  );
}
