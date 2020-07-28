import React from 'react';
import spinner from './spinner.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
    <h6>This may take a minute</h6> 
      <img src={spinner}
      style={{width: '100px', margin: 'auto',  display:'block'}}
      alt='loading'
      ></img>
      Loading...
    </div>
  )
}
