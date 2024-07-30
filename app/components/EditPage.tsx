import React, { useEffect, useState } from "react";
import { useCategoryContext } from "./CategoryProvider";
import { DATAT, Ingredient } from "../Type";
import axios from "axios";

export default function EditPage(props: {
  edit: number;
  gotoRecipe: React.Dispatch<React.SetStateAction<number>>;
  DeleteData: (index: number) => Promise<void>;
}) {
  const edit = props.edit;

  const {
    Repect,
    CreateRecipe,
    setCreateRecipe,
    setRepect,
    data,
    setdata,
    fetchData2,
  } = useCategoryContext();
  const [newData, setnewData] = useState<DATAT>(
    JSON.parse(JSON.stringify(data[edit]))
  );
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

  const handleUpdateRecipe = async (index: number, newdata: DATAT) => {
    try {
      await axios.patch(`/api/Recipe/`, { index, newdata });
      fetchData2();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  if (ingredients) {
    return (
      <div>
        <div className="text-4xl font-bold mb-8">Edit</div>
        <div className="flex flex-row flex-wrap w-full min-h-[700px] bg-white px-6 py-10 content-start ">
          <div className="basis-full text-2xl font-bold mb-10">
            Your ingredients to make a salad Recipe
          </div>
          {newData.items.map((item, index) => {
            return (
              <div
                className="basis-full flex flex-row text-normal font-semibold flex-nowrap justify-between my-4 items-center"
                key={"data-" + edit + "item" + index}
              >
                <div className="basis-20 h-20">
                  <img
                    className="h-20 w-20 object-cover"
                    src={ingredients[item.index].image}
                    alt=""
                  />
                </div>
                <div className="basis-10/12">
                  <div>{ingredients[item.index].ingredient}</div>
                  <div
                    onClick={() => {
                      const DATA: DATAT = JSON.parse(JSON.stringify(newData));
                      // if (DATA.items[index].count >= 1) {
                      //   if (DATA.items[index].count == 1) {
                      //     DATA.calories -=
                      //       ingredients[newData.items[index].index].calories;
                      //     DATA.items.splice(index, 1);
                      //   } else {
                      //     DATA.items[index].count -= 1;
                      //     DATA.calories -=
                      //       ingredients[newData.items[index].index].calories;
                      //   }
                      //   setnewData(DATA);
                      // } else {
                      // }
                      DATA.items.splice(index, 1);
                      setnewData(DATA);
                    }}
                    className="text-sm font-normal"
                  >
                    <span className="text-Slate">
                      x{newData.items[index].count}
                    </span>{" "}
                    <span className="text-Red underline font-medium hover:cursor-pointer">
                      Delete
                    </span>
                  </div>
                </div>
                <div className="basis-32 ">
                  <div className="float-end">
                    +{ingredients[item.index].calories * item.count}{" "}
                    <span className="text-Primary">Cal</span>
                  </div>
                </div>
              </div>
            );
          })}
          <hr className="basis-full my-10" />

          <div className="basis-full my-10 flex flex-row justify-between">
            <div className="font-medium text-normal">Total Calorie</div>
            <div className="font-medium text-2xl">
              {newData.calories} <span className="text-Primary">Cal</span>
            </div>
          </div>

          <div
            onClick={() => {
              if (newData.items.length == 0) {
                props.DeleteData(edit);
              } else {
                handleUpdateRecipe(edit, newData);
              }
              props.gotoRecipe(-1);
            }}
            className="basis-full py-5 bg-Primary text-white rounded-2xl text-center font-bold text-normal hover:cursor-pointer"
          >
            Update Recipe
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
