import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../Home/Shared/MenuCategory/MenuCategory';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <div>
            <SectionTitle heading='from our menu' subHeading='Popular Items'></SectionTitle>
           <MenuCategory items={popular}></MenuCategory>
        </div>
    );
};

export default PopularMenu;