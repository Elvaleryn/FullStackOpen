import React from 'react';

const Notifications = ({ message, messageType }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

export default Notifications;