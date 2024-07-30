"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DATAT, Ingredient } from "../Type";
import axios from "axios";

interface CategoryContextProps {
  checkVegetables: boolean;
  setCheckVegetables: React.Dispatch<React.SetStateAction<boolean>>;
  checkFruit: boolean;
  setCheckFruit: React.Dispatch<React.SetStateAction<boolean>>;
  checkToppings: boolean;
  setCheckToppings: React.Dispatch<React.SetStateAction<boolean>>;
  checkProtein: boolean;
  setCheckProtein: React.Dispatch<React.SetStateAction<boolean>>;
  checkDressing: boolean;
  setCheckDressing: React.Dispatch<React.SetStateAction<boolean>>;

  Repect: number[];
  setRepect: React.Dispatch<React.SetStateAction<number[]>>;

  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;

  CreateRecipe: boolean;
  setCreateRecipe: React.Dispatch<React.SetStateAction<boolean>>;

  data: DATAT[];
  setdata: React.Dispatch<React.SetStateAction<DATAT[]>>;
  fetchData: () => Promise<void>;
  fetchData2: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [checkVegetables, setCheckVegetables] = useState(false);
  const [checkFruit, setCheckFruit] = useState(false);
  const [checkToppings, setCheckToppings] = useState(false);
  const [checkProtein, setCheckProtein] = useState(false);
  const [checkDressing, setCheckDressing] = useState(false);

  const [Repect, setRepect] = useState<number[]>([]);
  const [CreateRecipe, setCreateRecipe] = useState<boolean>(false);
  const [data, setdata] = useState<DATAT[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/salad", {
        checkVegetables,
        checkFruit,
        checkToppings,
        checkProtein,
        checkDressing,
      });
      setIngredients(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get("/api/Recipe");
      setdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  useEffect(() => {
    fetchData2();
    fetchData();
    setRepect(
      Array.apply(null, Array(23)).map(function (x, i) {
        return 0;
      })
    );
  }, []);
  useEffect(() => {
    fetchData();
  }, [checkVegetables, checkFruit, checkToppings, checkProtein, checkDressing]);

  return (
    <CategoryContext.Provider
      value={{
        ingredients,
        setIngredients,
        checkVegetables,
        setCheckVegetables,
        checkFruit,
        setCheckFruit,
        checkToppings,
        setCheckToppings,
        checkProtein,
        setCheckProtein,
        checkDressing,
        setCheckDressing,
        Repect,
        setRepect,
        CreateRecipe,
        setCreateRecipe,
        data,
        setdata,
        fetchData,
        fetchData2,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export { CategoryProvider, useCategoryContext };
