import { fetchMeals } from '../http';
import { useFetch } from '../hooks/useFetch';
import MealItem from './MealItem';

export default function Meals() {
  
  const { fetchedData: loadedMeals, isFetching, error } = useFetch(fetchMeals, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  )
}
