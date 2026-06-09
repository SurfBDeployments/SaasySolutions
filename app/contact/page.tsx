
"use client"
import { useEffect } from 'react';
import '../../styles/default.css';
import ResponsiveAppBar from '../components/appbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Footer from '../components/footer';
import ContactForm from './contactform';



export function MediaCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="/techphoto3.png"
        title="John - Sales Rep"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          John - Business Development
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Contact John for your Sales and Business needs at SaaSy.
        </Typography>
        <CardActions>
          <Button size="small" variant="outlined">Let's Get Started</Button>

        </CardActions>

      </CardContent>

    </Card>
  );
}
export function MediaCard2() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="/techphoto2.png"
        title=" Robin - Account Support"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Robin - Account Support
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Contact Robin for your Accounts and Pricing needs at SaaSy.
        </Typography>
        <CardActions>
          <Button size="small" variant="outlined">Find Answers</Button>

        </CardActions>
      </CardContent>

    </Card>
  );
}
export function MediaCard3() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 250 }}
        image="/techphoto1.png"
        title="Bob - Customer Service"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Bob
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Contact Bob for any Technical Issues you may have with your products at SaaSy.
        </Typography>
        <CardActions>
          <Button size="small" variant="outlined">Open a Support Ticket</Button>

        </CardActions>

      </CardContent>
    </Card>
  );
}

export function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {[MediaCard, MediaCard2, MediaCard3].map((Component, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Component />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default function Home() {

  useEffect(() => {
    const lucide = (globalThis as any).lucide;
    if (lucide?.createIcons) {
      lucide.createIcons();
    }
  }, [])


  return (
    <>
      <ResponsiveAppBar />
      <article>
        <div className="max-w-7xl mx-auto">

          <div className='maincontent'>
            <h1 className="max-w-m text-4xl font-semibold">Contact Us</h1>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>The people behind the magic.
              Get in touch with our team of experts to learn more about how we can help you achieve your goals.
              Tell us more about yourself and what you&apos;d like to chat about. Someone from SaaSy will be in touch shortly.</h5>

            <ResponsiveGrid />
            <ContactForm />
          </div>



        </div>
      </article>
      <Footer />
    </>
  );
}