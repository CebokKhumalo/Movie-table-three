import React from 'react';

const videoPlayer = () => {
    return (
        <div>
            {' '}
            <video controls>
                <source type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default videoPlayer;