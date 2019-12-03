const color = {
  checked: '#f4690b',
  unCheck: '#97989a'
};

const checkBoxStyles = () => ({
  root: {
    '&, & + span': {
      color: color.unCheck,
    },
    '&$checked, &$checked + span': {
      color: color.checked,
    }
  },
  checked: {},
});

export default checkBoxStyles;
