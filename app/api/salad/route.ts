import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { Ingredient } from "../../Type";


type salad = {
  checkVegetables: boolean;
  checkFruit: boolean;
  checkToppings: boolean;
  checkProtein: boolean;
  checkDressing: boolean;
};
export async function POST(request: Request) {
  const {
    checkVegetables,
    checkFruit,
    checkToppings,
    checkProtein,
    checkDressing,
  }: salad = await request.json();

  const jsonDirectory = path.join(process.cwd(), "public");
  const fileContents = await fs.readFile(
    path.join(jsonDirectory, "data.json"),
    "utf8"
  );
  const Ingredients:Ingredient[] =JSON.parse(fileContents);

  let data:Ingredient[] =[]
  
  for (let index = 0; index < Ingredients.length; index++) {

    if((checkVegetables==false&&checkFruit==false&&checkToppings==false&&checkProtein==false&&checkDressing==false)||
    (Ingredients[index].category==="dressing"&&checkDressing)||
    (Ingredients[index].category==="protein"&&checkProtein)||
    (Ingredients[index].category==="toppings"&&checkToppings)||
    (Ingredients[index].category==="fruit"&&checkFruit)||
    (Ingredients[index].category==="vegetable"&&checkVegetables)){
        data.push(Ingredients[index])
    }
  }

  return NextResponse.json(data);
}
