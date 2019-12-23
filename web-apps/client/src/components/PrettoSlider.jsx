/** https://material-ui.com/components/slider/ */
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
  root: {
    color: '#1db000',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
    '& span > span': {
      color: 'white',
    }
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default PrettoSlider;