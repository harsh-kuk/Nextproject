"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function isinvalidtext(text) {
  return !text || text.trim() === "";
}

export default async function sharemeal(prevState,formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isinvalidtext(meal.title) ||
    isinvalidtext(meal.summary) ||
    isinvalidtext(meal.instructions) ||
    isinvalidtext(meal.creator) ||
    isinvalidtext(meal.creator_email)||
    !meal.creator_email.includes('@')||
    !meal.image||meal.image.size===0
  ) {
    return{
      message:"invalid inputs"
    };
  }
  await saveMeal(meal);
  revalidatePath('/meals','layout');
  redirect("/meals");
}
