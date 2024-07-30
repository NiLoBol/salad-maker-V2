import React from "react";
import SearchIcon from "./Icon/SearchIcon";
import Category from "./Category";
import SaladList from "./SaladList";

export default function SaladMakerPage() {
  
  return (
    <div className="">
      <nav className="flex flex-row justify-between">
        <div className="basis-7/12 text-4xl font-bold">Let's Create...your own salad!!!</div>
        <div className="basis-[513px] flex bg-white items-center h-[60px] rounded-2xl">
          <div className="hover:cursor-pointer ms-6 me-2">
            <SearchIcon className="fill-Primary " />
          </div>
          <p className="text-normal text-Slate">Search ingredients to make a salad...</p>
        </div>
      </nav>

      <div className="bg-Yellow my-10">
        <img className="-z-10" src="/image/Fresh.png" alt="" />
        <div className="relative text-Header">
          <div className="absolute -top-52 left-10 w-52 text-[32px] font-bold">Fresh & tasty salads</div>
          <div className="absolute -top-24 left-10 text-sm  ">
            <p>Relax please, we've got you</p>
            <p>covered every day of the week</p>
          </div>
        </div>
      </div>
      <div className="text-2xl mt-10 mb-6 font-bold">Select Category</div>
      <Category/>
      <div className="text-2xl mt-10 mb-6 font-bold">Choose your ingredients to make a salad</div>
      <SaladList/>

      
    </div>
  );
}
