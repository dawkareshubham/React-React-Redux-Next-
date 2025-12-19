export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');
  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }
  const resData = await response.json();
  return resData;
};