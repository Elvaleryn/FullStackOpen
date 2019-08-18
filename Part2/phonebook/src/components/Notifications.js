import React from 'react';

const Notifications = ({ message, messageStyle }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
}

export default Notifications;