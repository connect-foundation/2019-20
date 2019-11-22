import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>홈이야</NavLink>
        </li>
        <li>
          <NavLink to='/product'>상품이야</NavLink>
        </li>
      </ul>
    </nav>
  );
}
