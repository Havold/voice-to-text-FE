import React from 'react';
import './navBar.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const NavBar = () => {
    return (
        <div className="container">
            <Link to="/" className="logo">
                hwc
            </Link>
            <div className="right">
                <Button url="/experiment">Start</Button>
            </div>
        </div>
    );
};

export default NavBar;
