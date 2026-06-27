"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Image from 'next/image';


const pages = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
   
      <Container maxWidth="xl">
         <AppBar position="static">

       
        <Toolbar disableGutters>

          {/* ── DESKTOP: Logo + wordmark on the left ── */}
          <Box
            component={Link}
            href="/"
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 1 }}
          >
            <Image src="/sassylogoicon.png" alt="SaaSY logo" width={50} height={50} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            SaaSy Solutions
          </Typography>

          {/* ── MOBILE: Hamburger on the left ── */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                  // Added hover effect for mobile items
                  sx={{
                    '&:hover': {
                      color: '#a5abbd',
                    },
                  }}
                >
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* ── MOBILE: Logo centered ── */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
         <Image src="/sassylogoicon.png" alt="SaaSY logo" width={50} height={50} />

            <Typography
              variant="h5"
              noWrap
              sx={{
                ml: 1,
                fontFamily: 'Helvetica',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
            SaaSy Solutions
            </Typography>
          </Box>

          {/* ── DESKTOP: Nav links ── */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={Link}
                href={page.href}
                // Updated desktop hover effect
                sx={{ 
                  my: 3, 
                   fontSize: '.9rem',
                   fontWeight: 700,
                  color: 'white', 
                  display: 'block',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    textDecoration: 'underline',
                  
                    color: '#ededed', // Slightly dimmed text color
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* ── Avatar / user menu (both views) ── */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Brian M" src="/guymodel-1.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
          </AppBar>
      </Container>
  
  );
}

export default ResponsiveAppBar;