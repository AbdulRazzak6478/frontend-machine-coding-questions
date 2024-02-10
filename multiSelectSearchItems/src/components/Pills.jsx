import React from 'react';
import '../App.css';

const Pills = ({userImg, name, handler, email}) => {
  return (
    <span className='pill'>
        <img src={userImg} alt={name} />
        <span className='pill-name'>{name}</span>
        <span className='pill-cancel' onClick={handler}>X</span>
    </span>
  )
}

export default Pills