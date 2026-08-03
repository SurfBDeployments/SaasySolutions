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
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import Link from 'next/link';
import Image from 'next/image';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

const productCategories = [
  { name: 'Data Visualizations', href: '/products' },
  { name: 'News', href: '/news' },
  { name: 'Weather', href: '/products/weather' }
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElProducts, setAnchorElProducts] = React.useState<null | HTMLElement>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenProductsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMobileProductsOpen(false); // Reset collapse when whole nav closes
  };
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseProductsMenu = () => setAnchorElProducts(null);

  // Toggle mobile submenu toggle
  const handleMobileProductsToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from bubbling and auto-closing menu prematurely
    setMobileProductsOpen(!mobileProductsOpen);
  };

  return (
    <AppBar position="static">
      <Container disableGutters maxWidth={false}>

        <Toolbar>

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
              {pages.map((page) => {
                const isProducts = page.name === 'Products';

                return (
                  <Box key={page.name}>
                    <MenuItem
                      onClick={isProducts ? handleMobileProductsToggle : handleCloseNavMenu}
                      component={isProducts ? 'div' : Link}
                      href={isProducts ? undefined : page.href}
                      sx={{
                        justifyContent: 'space-between',
                        '&:hover': {
                          cursor: 'pointer'
                        },
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>
                        {page.name} {isProducts && (mobileProductsOpen ? '▴' : '▾')}
                      </Typography>
                    </MenuItem>

                    {/* Expandable subcategories for Mobile Products */}
                    {isProducts && (
                      <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ pl: 2, bgcolor: '#f9f9f9' }}>
                          {productCategories.map((category) => (
                            <MenuItem
                              key={category.name}
                              component={Link}
                              href={category.href}
                              onClick={handleCloseNavMenu}
                              sx={{ py: 1 }}
                            >
                              <Typography variant="body2">
                                {category.name}
                              </Typography>
                            </MenuItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Box>
                );
              })}
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}>
            {pages.map((page) => {
              const isProducts = page.name === 'Products';

              return (
                <Box key={page.name}>
                  <Button
                    component={isProducts ? 'button' : Link}
                    href={isProducts ? undefined : page.href}
                    onMouseEnter={isProducts ? handleOpenProductsMenu : handleCloseNavMenu}
                    sx={{
                      my: 0,
                      fontSize: '.9rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      display: 'block',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        textDecoration: 'underline',

                      }
                    }}
                  >
                    {page.name} {isProducts && '▾'}
                  </Button>

                  {/* Desktop Products Menu */}
                  {isProducts && (
                    <div style={{ cursor: 'pointer', color: '#414756' }}>
                      <Menu
                        id="products-menu"
                        anchorEl={anchorElProducts}
                        open={Boolean(anchorElProducts)}
                        onClose={handleCloseProductsMenu}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        {productCategories.map((category) => (
                          <MenuItem
                            sx={{ backgroundColor: '#ffffff' }}
                            key={category.name}
                            component={Link}
                            href={category.href}
                            onClick={handleCloseProductsMenu}
                          >
                            <Typography sx={{ textAlign: 'center' }}>{category.name}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* ── Avatar / user menu (both views) ── */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Brian M" />
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

      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;