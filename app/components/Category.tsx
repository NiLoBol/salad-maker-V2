"use client"
import React, { ReactElement, useState } from "react";
import Check from "./Icon/Check";
import { useCategoryContext } from "./CategoryProvider";
import { IconProps } from "../Type";


const ICON: React.FC<IconProps> = ({ icon, text, getcheck ,setCheck }) => {
  
  return (
    <div onClick={()=>{setCheck(!getcheck)}} className="w-40 h-40 bg-white rounded-2xl">
      <div
        className={`flex flex-col h-full items-center justify-center rounded-2xl ${
          getcheck ? "shadow-custom" : ""
        }`}
      >
        {getcheck?
        
        <div className="relative">
          <div className="absolute -top-4 left-[52px]"><Check/></div>
          
        </div>
        :""}
        <img
          className="w-[74px] h-[74px] mb-4"
          src={icon}
          alt={text}
        />
        <p className="text-center">{text}</p>
      </div>
    </div>
  );
};

const Category: React.FC = () => {
  const {checkVegetables,
    setCheckVegetables,
    checkFruit,
    setCheckFruit,
    checkToppings,
    setCheckToppings,
    checkProtein,
    setCheckProtein,
    checkDressing,
    setCheckDressing,} = useCategoryContext()
  return (
    <div className="flex flex-row gap-6">
      <ICON icon="/icon/vegetables.png" text="Vegetables" getcheck={checkVegetables} setCheck={setCheckVegetables} />
      <ICON icon="/icon/fruit.png" text="Fruits" getcheck={checkFruit} setCheck={setCheckFruit} />
      <ICON icon="/icon/toppings.png" text="toppings" getcheck={checkToppings} setCheck={setCheckToppings} />
      <ICON icon="/icon/protein.png" text="protein" getcheck={checkProtein} setCheck={setCheckProtein} />
      <ICON icon="/icon/dressing.png" text="dressing" getcheck={checkDressing} setCheck={setCheckDressing} />
    </div>
  );
};

export default Category;
