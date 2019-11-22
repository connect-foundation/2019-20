/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, {css} from 'styled-components';
import {string, number, bool, func, oneOfType, oneOf} from 'prop-types';

import {color, size, thickness, round, spacing} from '../styles';

import SyncProps from './SyncProps';

// // this를 써야해서 마음에 들지 않음.
// const S = {
//   CommonTextField:styled.input``,
//   OutLinedTextField:styled(this.CommonTextField)``,
//   FilledTextField:styled(this.CommonTextField)``,
//   NormalTextField:styled(this.CommonTextField)``,
// }

const Wrapper = styled.div`
  margin: ${spacing(2)};
`;

const sharedStyle = css`
  border-style: solid;
  width: 100%;
  outline: 0;
  font-size: ${size.sm};
  font-weight: 600;
  border-radius: ${round.md};
  padding: ${size.sm} ${size.xs};
  &:focus {
    border-bottom: ${thickness.md} solid ${color.secondary};
  }
`;
const OutLinedStyle = css`
  ${sharedStyle}
  border-width: ${thickness.md};
  border-color: ${color.light};
  &:focus {
    border-color: ${color.secondary};
  }
`;
const FilledStyle = css`
  ${sharedStyle}
  border: 0;
  border-bottom: ${thickness.md} solid ${color.light};
  background-color: ${color.grey};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const NormalStyle = css`
  ${sharedStyle}
  border: 0;
  outline: 0;
  border-bottom: ${thickness.md} solid ${color.light};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const OutLinedTextField = styled.input`
  ${OutLinedStyle}
`;
const FilledTextField = styled.input`
  ${FilledStyle}
`;
const NormalTextField = styled.input`
  ${NormalStyle}
`;

const OutLinedTextArea = styled.textarea`
  ${OutLinedStyle}
`;
const FilledTextArea = styled.textarea`
  ${FilledStyle}
`;
const NormalTextArea = styled.textarea`
  ${NormalStyle}
`;
const renderTextField = (props, variant) => {
  switch (variant) {
    case 'outlined':
      return <OutLinedTextField {...props} />;
    case 'filled':
      return <FilledTextField {...props} />;
    default:
      return <NormalTextField {...props} />;
  }
};
const renderTextArea = (props, variant) => {
  switch (variant) {
    case 'outlined':
      return <OutLinedTextArea {...props} />;
    case 'filled':
      return <FilledTextArea {...props} />;
    default:
      return <NormalTextArea {...props} />;
  }
};
// ...props로 하면 자동 완성이 안됨 => propTypes 한다면?
const TextField = ({
  variant,
  multiline,
  autoComplete,
  autoFocus,
  className,
  defaultValue,
  disabled,
  error,
  id,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  rows,
  rowsMax,
  type,
}) => {
  return (
    <Wrapper>
      <SyncProps
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        error={error}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        rows={rows}
        rowsMax={rowsMax}
        type={type}
      >
        {(props) =>
          multiline
            ? renderTextArea(props, variant)
            : renderTextField(props, variant)}
      </SyncProps>
    </Wrapper>
  );
};

TextField.propTypes = {
  variant: oneOf(['outlined', 'filled', 'normal']),
  autoComplete: string,
  autoFocus: bool,
  className: string,
  defaultValue: oneOfType([string, number]),
  disabled: bool,
  error: bool,
  id: string,
  multiline: bool,
  name: string,
  onChange: func,
  placeholder: string,
  readOnly: bool,
  required: bool,
  rows: number,
  rowsMax: number,
  type: string,
};

TextField.defaultProps = {
  variant: 'normal',
  autoComplete: null,
  autoFocus: null,
  className: null,
  defaultValue: null,
  disabled: null,
  error: null,
  id: null,
  multiline: null,
  name: null,
  onChange: null,
  placeholder: null,
  readOnly: null,
  required: null,
  rows: null,
  rowsMax: null,
  type: null,
};
export default TextField;
