
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




export function Customer() {
  return (
    <Card sx={{ maxWidth: 250, width: '100%', height: '275px', backgroundColor: '#1976d2', color: '#fff',elevation: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Customer Focused
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
          Customers and Relationships matter. We care deeply about the well-being and success of our employees, customers, and partners. We&lsquore a diverse, open-minded, international team pushing big ideas to help your organization make better, data-driven decisions.
        </Typography>
      </CardContent>
     
    </Card>
  );
}
export function Results() {
  return (
    <Card sx={{ maxWidth: 250, height: '275px', elevation: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', backgroundColor: '#414756', color: '#fff' }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Results-Driven
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#414756', color: '#fff'}}>
          Your goals go beyond acquisition. We are relentlessly focused on delivering measurable value, separating meaningful progress from empty noise to ensure every effort drives your business forward. We are driven to get you results that make a difference!
        </Typography>
      </CardContent>
    
    </Card>
  );
}
export function Ownership() {
  return (
    <Card sx={{ maxWidth: 250, height: '275px', backgroundColor: '#046531', color: '#fff',elevation: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ownership
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#046531', color: '#fff' }}>

          We take ownership over everything we do. We do not just build solutions; we own them. On this team, ownership means skipping the red tape, eliminating excuses, and treating your business goals as our very own. We do not wait for permission to innovate, we just do it.
        </Typography>
      </CardContent>
      
    </Card>
  );
}
export function Revenue() {
  return (
    <Card sx={{ maxWidth: 250, height: '275px', backgroundColor: '#c94669', color: '#fff',elevation: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Growth and Revenue Focused
        </Typography>
        <Typography variant="body2" sx={{ backgroundColor: '#c94669', color: '#fff' }}>
          Grow revenue faster with smart sales software that analyzes customer behavior and prioritizes high-potential leads. Integrated with Commerce Hub for AI-powered quote creation, this powerful combination enables our reps to close deals even faster.
        </Typography>
      </CardContent>
    
    </Card>
  );
}
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
          Meet Erica an Sales Representative for SaaSy
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
          Meet Matt your Social Media Manager at SaaSy.
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
          Meet Rick your Account Manager at SaaSy.
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
          Meet Josie your Client Manager at SaaSy.
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
          Meet Zara an Sales Representative for SaaSy
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
          Meet Rajesh your Tech Manager at SaaSy.
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
export function AboutGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
        {[Customer, Ownership, Results, Revenue].map((Component, index) => (
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
            <h1 className="max-w-m text-4xl font-semibold">About SaaSy</h1>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>At SaaSy Solutions, we believe everyone can make successful data-driven decisions. SaaSy is a premier sales and marketing partner dedicated to scaling B2B software organizations. They just need the right tools and the right people. Our mission is to break down the barriers in data analytics and make it accessible to all, regardless of technical background or role. We help businesses connect to their users with their data.</h5>

         <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed">  We bridge the gap between marketing execution and sales conversion to drive predictable, repeatable growth.
              Our methodology combines cutting-edge marketing automation with elite sales execution teams. By aligning your brand message with targeted buyer personas, we accelerate your sales cycle and optimize customer acquisition costs. Partner with us to transform your growth strategy into measurable market share.
            </h5>
            <AboutGrid />


            <h2 className="max-w-m text-4xl font-semibold" style={{ marginTop: '10px' }}>Meet the Team</h2>
            <h5 className="max-w-m text-2xl font-condensed-light leading-relaxed" style={{ marginBottom: '20px' }}>The people behind the magic.
              Our team is our greatest asset. From collaborative projects to fun office moments, see the talented individuals who bring our agency to life and drive our success.</h5>
            <h5><a href="/users">See the Happy Clients</a></h5>
            <ResponsiveGrid /></div>
        </div>

      </article>



      <Footer />

    </>

  );
}
