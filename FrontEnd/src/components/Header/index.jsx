import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';


const options = [
  'Alunos',
  'Pagamento',
  'Relatório de Alunos',
  'Relatório de Alunos Inadimplentes'
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  name: {
    color: 'white',
    fontSize: 12
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function Header() {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Typography className={classes.title} variant="h6" noWrap>
          {process.env.REACT_APP_PROJECT_NAME}
        </Typography>

        <div className={classes.root}>
          <Avatar className={classes.orange}>J</Avatar> 
          <div className={classes.name}>
            Juan Pimentel <br />
            <a href="/">Sair</a>
          </div>
        </div> 
      </Toolbar>
    </AppBar>
  );
}

export default Header;
