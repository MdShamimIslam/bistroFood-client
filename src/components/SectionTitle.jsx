import React from 'react';

const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='text-center my-8'>
            <p className='text-orange-500'>-------{subHeading}-------</p>
            <h3 className='text-2xl uppercase border-b-2 border-t-2 w-1/3 py-2 mx-auto mt-2'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;