import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div>
        <nav className='navigation'>
            <div className='container'>
                <a className='a' href='/cases'> Cases  </a>
                <a className='a' href='/createCase'> CreateCase  </a>
            </div>
        </nav>
    </div>
  )
}
