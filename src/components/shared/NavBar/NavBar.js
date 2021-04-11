import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CollectionsIcon from '@material-ui/icons/Collections';
import { AppBar, Button, Toolbar, List, Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

/* Components */
import Home from '../../Home/Home';
import Login from '../../Login/Login';
import Publicaciones from '../../Publicaciones/Publicaciones';
import DetallePublicacion from '../../Publicaciones/Detalle';
import Profile from '../../Profile/Profile';
import PageNotFound from '../../shared/PageNotFound/PageNotFound';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    botonMenu:{
      color: "#fff",
      marginRight: '10px',
      '&:hover': {
        color: "#fff",
     },
    }
  }));
  

function NavBar(props) {
    const classes = useStyles();
    const navLinks = [
        { title: `Home`, path: `/home`, icon: <HomeIcon /> },
        { title: `Publicaciones`, path: `/publicaciones`, icon: <CollectionsIcon /> },
        { title: `Mi Perfil`, path: `/Profile`, icon: <AccountCircleIcon /> },
        { title: `Login`, path: `/Login`, icon: <LockOpenIcon />},
      ]

      return(
          <div>
            <Router>
                <AppBar position="static" style={{background: "#152F4F", marginBottom: '15px'}}>
                    <Toolbar>
                    <Container className={classes.navbarDisplayFlex}>
                        <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                            {navLinks.map(({ title, path, icon }) => (
                                <Button href="#text-buttons" 
                                size="small"
                                variant="inherit"
                                startIcon={icon}
                                className={classes.botonMenu} 
                                component={Link} to={path}>
                                    {title}
                                </Button>
                            ))}
                        </List>
                    </Container>
                    </Toolbar>
                </AppBar>

                <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                    <Route exact  path="/home" component={Home}/>
                    <Route exact  path="/publicaciones" component={Publicaciones}/>
                    <Route exact  path="/detalle/:id" component={DetallePublicacion} />
                    <Route exact  path="/Profile" component={Profile}/>
                    <Route exact  path="/login" component={Login}/>
                    <Route exact  component={PageNotFound}/>
                </Switch>
            </Router>
          </div>
      );
}

export default NavBar;