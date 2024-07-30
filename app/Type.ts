export type Ingredient = {
  id:number,
  calories: number;
  category: "vegetable" | "fruit" | "protein" | "dressing" | "toppings";
  image: string;
  ingredient: string;
};

export interface IconProps {
  icon: string;
  text: string;
  getcheck: boolean;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
export type DATAT = {
  name: string;
  items: { index: number; count: number }[];
  calories: number;
};
