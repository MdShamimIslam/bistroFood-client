import React, { useState } from "react";
import Cover from "../../Home/Home/Shared/Cover/Cover";
import orderCoverImg from "../../../assets/shop/order.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
  const categories = ['salad','pizza','soup','dessert','drinks'];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category);
  
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const [menu] = useMenu();

  const salad = menu.filter(item => item.category === 'salad');
  const pizza = menu.filter(item => item.category === 'pizza');
  const soup = menu.filter(item => item.category === 'soup');
  const drink = menu.filter(item => item.category === 'drinks');
  const dessert = menu.filter(item => item.category === 'dessert');

  return (
    <div>
      <Cover img={orderCoverImg} title={"Order Food"}></Cover>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drink</Tab>
        </TabList>
        <TabPanel className='mt-8'>
            <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={drink}></OrderTab>
        </TabPanel>
        
      </Tabs>
    </div>
  );
};

export default Order;
