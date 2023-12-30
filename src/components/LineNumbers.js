import '../css/LineNumbers.css';

import { useState } from 'react';

export default function LineNumbers({lines}) {

    const numbers = Array.from({ length: lines }, (_, index) => index + 1);


  return (
    <div className='line_number'>
            {numbers.map((number) => (
        <div key={number}>{number}</div>
      ))}

    </div>
    
  );
}


