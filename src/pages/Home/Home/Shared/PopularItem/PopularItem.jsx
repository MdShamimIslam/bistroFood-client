import React from 'react';


const PopularItem = ({item}) => {
    const {name,image,recipe,price} = item;
    return (
        <div className='flex gap-6'>
            <img style={{borderRadius:'0 200px 200px 200px'}} className='w-[100px]' src={image} alt="" />
            <div>
                <h4 className='text-xl font-semibold'>{name}</h4>
                <p>{recipe}</p>
            </div>
            <p className='text-orange-700 text-lg font-bold'>${price}</p>
        </div>
    );
};

export default PopularItem;