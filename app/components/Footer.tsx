"use client";
import React, { ReactHTMLElement, useEffect, useRef, useState } from "react";
import { useCategoryContext } from "./CategoryProvider";
import SaladmakerIcon from "./Icon/SaladmakerIcon";
import SaladmakerIconFooter from "./Icon/SaladmakerIconFooter";
import CloseIcon from "./Icon/CloseIcon";
import { DATAT, Ingredient } from "../Type";
import axios from "axios";

export default function Footer() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    Repect,
    CreateRecipe,
    setCreateRecipe,
    setRepect,
    data,
    setdata,
    setCheckVegetables,
    setCheckFruit,
    setCheckToppings,
    setCheckProtein,
    setCheckDressing,
  } = useCategoryContext();

  const [count, setcount] = useState<number>(0);
  const [count2, setcount2] = useState<number>(0);

  const [ingredients, setingredients] = useState<Ingredient[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/salad", {
          checkVegetables: false,
          checkFruit: false,
          checkToppings: false,
          checkProtein: false,
          checkDressing: false,
        });
        setingredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sum: number = 0;
    let sum2: number = 0;
    for (let index = 0; index < Repect.length; index++) {
      if (Repect[index] > 0 && ingredients) {
        sum += Repect[index];
        sum2 += ingredients[index].calories * Repect[index];
      }
    }
    setcount(sum);
    setcount2(sum2);
  }, [Repect]);
  useEffect(() => {
    if (CreateRecipe) {
      document.getElementsByTagName("html")[0].className +=
        " overflow-y-hidden";
    } else {
      document.getElementsByTagName("html")[0].className = "no-scrollbar";
    }
  }, [CreateRecipe]);
  const UpdateData = async (data: DATAT[]) => {
    try {
      // Sample payload for the POST request, you should replace this with your actual payload
      const response = await axios.post("/api/Recipe", data);
      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  return (
    <footer>
      <div className="h-36"></div>
      <div className="relative z-10 ">
        <div className="fixed bottom-0 h-36 w-full left-0 bg-white shadow-bottombar text-white">
          <div className="flex flex-row justify-between gap-0">
            <div className="basis-[345px]"></div>
            <div className="basis-[1575px] flex flex-row gap-4 px-8 py-6 items-center text-3xl font-bold">
              <div className="basis-[1201px] h-24 bg-Primary flex flex-row items-center rounded-2xl ">
                <div className="basis-10/12 flex flex-row gap-4">
                  <div className="p-6 h-16 bg-white text-Primary rounded-2xl ms-8 flex items-center justify-center">
                    {count}
                  </div>
                  <div className="flex items-center">Your ingredients</div>
                </div>

                <div className="basis-2/12 text-center">{count2} Cal</div>
              </div>
              <div
                onClick={() => {
                  if (count == 0) {
                    alert("You don't have any ingredients");
                  } else {
                    setCreateRecipe(true);
                  }
                }}
                className="basis-[294px] h-24 bg-Green flex items-center justify-center rounded-2xl hover:cursor-pointer"
              >
                Create Recipe
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {CreateRecipe ? (
        <div className="fixed w-screen h-screen bg-black/20 top-0 left-0 z-50 ">
          <div className="absolute top-32 left-1/2 -translate-x-1/2  w-[500px]  bg-white rounded-2xl">
            <div
              onClick={() => setCreateRecipe(false)}
              className="hover:cursor-pointer flex flex-row-reverse pt-5 pe-10"
            >
              <CloseIcon />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center mx-10">
                <div className="relative -top-3">
                  <div className="bg-Primary w-[74px] h-[74px] flex justify-center items-center rounded-full ">
                    <SaladmakerIconFooter className="fill-white " />
                  </div>
                </div>

                <div className="text-xl font-bold mb-6">Recipe Name</div>
                <input
                  type="text"
                  className="w-full h-10 border-[#E8EAEB] border-[1px] rounded-lg mb-6 p-2 focus-visible:outline-none text-sm "
                  ref={ref}
                  placeholder="Input Your Recipe Name....."
                />
              </div>
              <div className="flex flex-row items-center mx-10 mt-4 mb-6  ">
                <div
                  onClick={() => {
                    setCreateRecipe(false);
                  }}
                  className="basis-1/2 flex justify-center items-center cursor-pointer h-[48px] font-bold bg-white rounded-lg"
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    if (typeof ref.current?.value !== "string") {
                      alert("Please input your recipe name");
                    } else {
                      const Repectname = ref.current?.value;
                      console.log(data);
                      const Item: {
                        index: number;
                        count: number;
                      }[] = [];
                      const DATAs: DATAT = {
                        name: Repectname,
                        items: Item,
                        calories: count2,
                      };
                      for (let index = 0; index < Repect.length; index++) {
                        if (Repect[index] !== 0) {
                          const counts = Repect[index];
                          Item.push({ index: index, count: counts });
                        }
                      }
                      const Copydata = JSON.parse(JSON.stringify(data));
                      Copydata.push(DATAs);
                      setdata(Copydata);
                      localStorage.setItem(
                        "SaladMakerRecipe-232325",
                        JSON.stringify(Copydata)
                      );
                      UpdateData(Copydata);
                      setRepect(
                        Array.apply(null, Array(23)).map(function (x, i) {
                          return 0;
                        })
                      );
                      setCreateRecipe(false);
                    }
                  }}
                  className="basis-1/2 flex justify-center items-center cursor-pointer h-[48px] font-bold bg-Green text-white rounded-lg"
                >
                  Create New Recipe
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </footer>
  );
}
