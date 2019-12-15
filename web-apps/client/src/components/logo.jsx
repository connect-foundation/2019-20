import React, {useEffect} from 'react';
import logo from '../assets/oemarket.png';
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  logo: {
    width: '5rem',
    marginBottom: '2rem',
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
}));

const Logo = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    setChecked(!checked);
  }, []);

  const duration = 1000;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Slide
          direction='down'
          in={checked}
          timeout={duration}
          mountOnEnter
          unmountOnExit
        >
          <img className={classes.logo} src={logo} alt='logo' />
        </Slide>
      </div>
    </div>
  );
};

export default Logo;
