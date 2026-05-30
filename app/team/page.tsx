
"use client"
import '../../styles/default.css';
import ResponsiveAppBar from '../appbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Erica an Sales Representative for Saasy
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export function MediaCard5() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/model-3.png"
        title="Erica - Sales Rep"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Zara
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Zara an Sales Representative for Saasy
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export function MediaCard2() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/guymodel-1.png"
        title="Matt - Social Media Manager"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Matt
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Matt your Social Media Manager at Saasy.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export function MediaCard3() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/guymodel-2.png"
        title="Rick - Account Manager "
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rick
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Rick your Account Manager at Saasy.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export function MediaCard4() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/model-2.png"
        title="Josie- Clients Manager "
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Josie
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Josie your Client Manager at Saasy.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export function MediaCard6() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="/guymodel-3.png"
        title="Rajesh- Tech Manager "
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rajesh
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Meet Rajesh your Tech Manager at Saasy.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {[MediaCard, MediaCard2, MediaCard3, MediaCard4, MediaCard5, MediaCard6].map((Component, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
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
            <h1 className="max-w-m text-4xl font-semibold">Meet the Team</h1>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>The people behind the magic.
              Our team is our greatest asset. From collaborative projects to fun office moments, see the talented individuals who bring our agency to life and drive our success.</h5>
              <h5><a href="/users">See the Happy Clients</a></h5>
            <ResponsiveGrid /></div>

          {/* <Users /> */}


        </div>
      </article>
      <Footer />

    </>

  );
}
