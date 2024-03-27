import classes from "meal-grid.module.css";
import MealItem from "./meal-item";
export default function Mealgrid({meals}) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
            <MealItem{ ...meal}/>
        </li>
      ))}
    </ul>
  );
}
