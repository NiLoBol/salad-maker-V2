"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import SaladmakerIcon from "./components/Icon/SaladmakerIcon";
import Recipe from "./components/Icon/Recipe";
import SaladMakerPage from "./components/SaladMakerPage";
import { Ingredient } from "./Type";
import Footer from "./components/Footer";
import RecipePage from "./components/RecipePage";

export default function Home() {
  const [Listselect, setListselect] = useState<"Salad maker" | "Recipe">(
    "Salad maker"
  );
  
  return (
    <main className="flex min-h-screen flex-row  text-Black bg-BG  hide-scrollbar ">
      <section className="basis-[345px] bg-white p-12  z-20 ">
        <h1 className="text-Header text-[30px] font-bold text-center mb-[60px]">
          SALADMAKER<span className="text-Primary ">.</span>
        </h1>
        <button
          onClick={() => setListselect("Salad maker")}
          className={
            Listselect == "Salad maker"
              ? "text-white bg-Primary w-full flex rounded-2xl px-6 py-3 my-4"
              : " text-Slate bg-white w-full flex  rounded-2xl px-6 py-3 my-4"
          }
        >
          <div className="flex items-center h-10 ms-2">
            <SaladmakerIcon
              className={
                Listselect == "Salad maker" ? "fill-white" : "fill-Slate"
              }
            />
            <span className="ms-8 text-normal">Salad maker</span>
          </div>
        </button>
        <button
          onClick={() => setListselect("Recipe")}
          className={
            Listselect == "Recipe"
              ? "text-white bg-Primary w-full flex  rounded-2xl px-6 py-3 my-4"
              : " text-Slate bg-white w-full flex  rounded-2xl px-6 py-3 my-4"
          }
        >
          <div className="flex items-center h-10 ms-2">
            <Recipe
              color={Listselect == "Recipe" ? "fill-white" : "fill-Slate"}
            />
            <span className="ms-8 text-normal">Recipe</span>
          </div>
        </button>
      </section>
      <section className="basis-[1495px] m-10">
        {Listselect == "Salad maker" ? (
          <>
            <SaladMakerPage />
            <Footer />
          </>
        ) : (
          <RecipePage />
        )}
      </section>
    </main>
  );
}
