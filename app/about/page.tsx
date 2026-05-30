
"use client"

import '../../styles/default.css';
import ResponsiveAppBar from '../appbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Footer from '../../footer';


export function MediaCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/model-1.png"
        title="Erica - Sales Rep"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Erica
        </Typography>

      </CardContent>

    </Card>
  );
}
export function MediaCard2() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/guymodel-1.png"
        title="Robin - Techical Support"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Robin
        </Typography>
      </CardContent>

    </Card>
  );
}
export function MediaCard3() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/guymodel-2.png"
        title="Rick - Customer Service"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Bob
        </Typography>
      </CardContent>
    </Card>
  );
}






export function ResponsiveGrid() {
  const cards = [
    { key: 'erica', Component: MediaCard },
    { key: 'robin', Component: MediaCard2 },
    { key: 'bob', Component: MediaCard3 }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {cards.map(({ key, Component }) => (
          <Grid key={key} size={{ xs: 2, sm: 4, md: 4 }}>
            <Component />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default function Home() {


  return (
    <>
      <ResponsiveAppBar />


      <article>
        <div className="max-w-7xl mx-auto">
          <div className='maincontent'>
            <h1 className="max-w-m text-4xl font-semibold">About SaaSy</h1>
             <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>At Saasy Marketing, we believe everyone can make successful data-driven decisions. Saasy is a premier sales and marketing partner dedicated to scaling B2B software organizations. They just need the right tools and the right people. Our mission is to break down the barriers in data analytics and make it accessible to all, regardless of technical background or role. We help businesses connect to their users with their data.</h5>

              <p style={{ marginBottom: '20px' }}>  We bridge the gap between marketing execution and sales conversion to drive predictable, repeatable growth.
Our methodology combines cutting-edge marketing automation with elite sales execution teams. By aligning your brand message with targeted buyer personas, we accelerate your sales cycle and optimize customer acquisition costs. Partner with us to transform your growth strategy into measurable market share.
</p>


           <h5 className="max-w-m text-2xl font-condensed-light leading-10 tracking-tight text-black dark:text-slate-800">Customer Focused</h5>
<p>
Customers and Relationships matter. We care deeply about the well-being and success of our employees, customers, and partners. We&lsquore a diverse, open-minded, international team pushing big ideas to help your organization make better, data-driven decisions.</p> 

<h5 className="max-w-m text-2xl font-condensed-light leading-10 tracking-tight text-black dark:text-slate-800">Ownership
</h5>
<p>We take ownership over everything we do.</p>

<p>Our team consists of high-achievers that aren’t afraid of a challenge and are ready to step up from day one. Every team member takes responsibility for the outcomes, so you can take pride in the results.</p>

<h5 className="max-w-m text-2xl font-condensed-light leading-10 tracking-tight text-black dark:text-slate-800">Results-Driven</h5>
Your goals go beyond acquisition. We are driven to get you results that make a difference!

You have a customer base to grow and retain, numbers to reach, and promises to deliver on. We help you hit the metrics that matter with value-building processes for every stage of your customer lifecycle.


          </div>



        </div>
      </article>
      <Footer />
    </>
  );
}