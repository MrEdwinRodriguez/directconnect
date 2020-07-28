import React from 'react';
import spinner from './spinner.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={spinner}
      style={{width: '200px', margin: 'auto', display:'block'}}
      alt='loading'
      ></img>
      Loading...  
    </div>
  )
}
