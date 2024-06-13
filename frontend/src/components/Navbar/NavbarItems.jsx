import React from 'react';

const NavbarItem = ({ label, isActive, onClick }) => (
    <li className={isActive ? 'active' : ''} onClick={onClick}>{label}</li>
);

export default NavbarItem;