import React from 'react';

// components
import TextField from '../components/TextField';

export default function CreateProduct() {
  return (
    <>
      <TextField variant='outlined' placeholder='f' />
      <TextField variant='filled' />
      <TextField multiline rows={5} />
      {/* <TextField val /> */}
    </>
  );
}
