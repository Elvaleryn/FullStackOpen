import React from 'react';

const Country = ({ selectCountry }) => {
    

    

    return (
        <div>
            {selectCountry()}
        </div>
    );
};

export default Country;