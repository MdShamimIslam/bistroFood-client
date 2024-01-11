import React from 'react';
import Cover from '../../Home/Home/Shared/Cover/Cover';
import offeredImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';

import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../../Home/Home/Shared/MenuCategory/MenuCategory';
import SectionTitle from '../../../components/SectionTitle';

const Menu = () => {
    const [menu] = useMenu();

    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const dessert = menu.filter(item => item.category === 'dessert');

    return (
        <div>
            <Helmet>
                <title> BistroFood | Menu</title>
            </Helmet>
            <Cover img={offeredImg} title={'our menu'}></Cover>
            <SectionTitle heading={'todays offer'} subHeading={"Don't Miss"}></SectionTitle>
            <MenuCategory items={salad} img={saladImg} title={'salad'}></MenuCategory>
            <MenuCategory items={pizza} img={pizzaImg} title={'pizza'}></MenuCategory>
            <MenuCategory items={soup} img={soupImg} title={'soup'}></MenuCategory>
            <MenuCategory items={dessert} img={dessertImg} title={'dessert'}></MenuCategory>
        </div>
    );
};

export default Menu;