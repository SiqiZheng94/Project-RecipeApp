import { Meal } from "../Meal.ts";
import { useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import axios from "axios";

type MealPageProps = {
    meals: Meal[],
    getMeals: () => void
}

export default function AllMealPage(props: MealPageProps) {
    const navigate = useNavigate();
    const [meals, setMeals] = useState(props.meals);
    const [manage, setManage] = useState<boolean>(true);

    function changeManageState() {
        setManage(!manage);
    }

    function deleteThisItem(id: string) {
        const updatedMeals = meals.filter(meal => meal._id !== id);

        setMeals(updatedMeals);

        axios.delete("api/meals/delete/" + id)
            .then(() => {
            })
            .catch(error => {
                console.error('Error deleting the item:', error);
            });
    }


    return (
        <div>
            <div className={"management"}>
                <button onClick={changeManageState}><span>Manage</span></button>
                <SearchBar setMeals={setMeals} />
            </div>

            <div className={"meal-container"}>
                {meals.map((meal: Meal) => (
                        <div className={"meal-card"} key={meal.idMeal}>
                            {meal.strMealThumb && (
                                <img className={"meal-picture"}
                                     onClick={()=>navigate("/recipe/"+meal._id)}
                                     src={meal.strMealThumb}
                                     alt={meal.strMeal}
                                />
                            )}
                            {manage &&
                            <div className={"two-buttons"}>
                                <button onClick={()=>navigate("/recipe/edit/"+meal._id)}><span>Edit</span></button>
                                <button onClick={()=>deleteThisItem(meal._id)}><span>Delete</span></button>
                            </div>}
                            <p className={"meal-introduction"} onClick={()=>navigate("/recipe/"+meal._id)}>
                                {meal.strMeal}
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}