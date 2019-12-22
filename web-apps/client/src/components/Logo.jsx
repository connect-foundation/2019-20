import React, { useEffect } from 'react';
import logo from '../assets/oemarket.png';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '10rem',
  },
  logo: {
    width: '8rem',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Logo = () => {
  const DURATION = 1000;
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (!checked) {
      setChecked(!checked);
    }
  }, [checked]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Slide
          direction='down'
          in={checked}
          timeout={DURATION}
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
