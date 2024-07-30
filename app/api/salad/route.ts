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
  // รับช้อมูลเข้า
  const {
    checkVegetables,
    checkFruit,
    checkToppings,
    checkProtein,
    checkDressing,
  }: salad = await request.json();
  // ถ้าเป็น false ทุกตัวจะส่งข้อมูลทั้งหมด
  // ดึงข้อมูลวัตถุดิบ
  const jsonDirectory = path.join(process.cwd(), "public");
  const fileContents = await fs.readFile(
    path.join(jsonDirectory, "data.json"),
    "utf8"
  );
  const Ingredients:Ingredient[] =JSON.parse(fileContents);

  //  สร้างตัวเก็บข้อมูล
  let data:Ingredient[] =[]
  
  // เก็บข้อมูลตัวที่ต้องการ
  for (let index = 0; index < Ingredients.length; index++) {
    // กรณีที่ทุกตัวเป็น false จะดึงทั้งหมด  หรือ ดึงตัวที่ตรงเช็คแล้วเป็น true
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
