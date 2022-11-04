import React from 'react';

import NotFoundGif from '../../assets/404.gif';

function NotFound() {
    return (
        <div className="centered-image">
            <img src={NotFoundGif} alt="404 error" />
        </div>
    );
}

export default NotFound;
