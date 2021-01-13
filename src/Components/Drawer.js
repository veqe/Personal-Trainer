import React from "react";
import clsx from 'clsx';
import{
    Drawer as VeqeDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Link, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '190px'
    },
    drawerPaper: {
        width: 'inherit'
    }
}));

const Drawer = props => {    
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    } 

    const NavClick = () => {
        
    }

    const NavList = [
        {
            text: "Customers",
            icon: <AccountBoxIcon />,
            path: "/Customer"            
         },
         {
             text: "Trainings",
             icon: <DirectionsRunIcon />,
             path: "/Training"
         },
         {
             text: "Calendar",
             icon: <CalendarTodayIcon />,
             path: "/Calendar"
         }
        ];
    return (       
        <Router> 
        <div className={classes.root}>
            <CssBaseline />
        <AppBar>
            <Toolbar>
                <IconButton 
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"             
                    className={clsx(classes.menuButton, open && classes.hide)}  
                >                    
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Personal Trainer
                </Typography>
            </Toolbar>
        </AppBar>
        <VeqeDrawer 
        variant="persistent" 
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {NavList.map((item, index) => {
                    const {text, icon, path } = item;
                    return (     
                        <Link to={path}>
                        <ListItem button onClick={NavClick} key={text} >
                            { icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />
                        </ListItem>
                        </Link>
                    );                    
                })}
            </List>
        </VeqeDrawer> 
        </div>
        </Router>
    );
};

export default withRouter(Drawer);