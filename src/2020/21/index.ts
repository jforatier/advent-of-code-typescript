import { readInput } from "./../../utils";

export const rawInput = readInput();

export class Food {
  ingredients: string[] = [];
  allergens: string[] = [];

  constructor(line: string) {
    const [rawIngredients, rawAllergens] = line.split(" (contains ");
    this.ingredients = rawIngredients.split(" ");
    this.allergens = rawAllergens
      .substring(0, rawAllergens.length - 1)
      .split(", ");
  }
}

export class FoodList {
  foods: Food[] = [];

  constructor(list: string[]) {
    list.forEach((foodLine) => {
      this.foods.push(new Food(foodLine));
    });
  }
  getAllergensMap = (): Map<string, Set<string>> => {
    const allergensMap: Map<string, Set<string>> = new Map();

    for (let food of this.foods) {
      for (const allergen of food.allergens) {
        const previous = allergensMap.get(allergen);
        if (previous) {
          for (const ingredient of previous) {
            if (!food.ingredients.includes(ingredient)) {
              previous.delete(ingredient);
            }
          }
        } else {
          allergensMap.set(allergen, new Set(food.ingredients));
        }
      }
    }
    return allergensMap;
  };

  getDangerousIngredient = () => {
    let foodByAllergen = new Map<string, Food[]>();
    let allergenMap = new Map<string, string>();
    let ingredients = new Set<string>();

    this.foods.forEach((food) => {
      for (const allergen of food.allergens) {
        foodByAllergen.set(allergen, foodByAllergen.get(allergen) ?? []);
        foodByAllergen.get(allergen)!.push(food);
      }
    });

    while (allergenMap.size < foodByAllergen.size) {
      for (const [allergen, foods] of foodByAllergen) {
        let suspicious = new Set<string>(foods[0].ingredients);

        for (const food of foods.slice(1)) {
          suspicious = new Set<string>(
            food.ingredients.filter((x) => suspicious.has(x))
          );
        }

        suspicious = new Set<string>(
          [...suspicious].filter((x) => !ingredients.has(x))
        );

        if (suspicious.size === 1) {
          let allergen_ingredient = [...suspicious][0];
          allergenMap.set(allergen, allergen_ingredient);
          ingredients.add(allergen_ingredient);
        }
      }
    }

    return Array.from(allergenMap.keys())
      .sort()
      .map((a) => allergenMap.get(a)!);
  };
}

export const parse = (input: string): string[] => input.split(/\r?\n/);

export const processPartOne = (input: string): number => {
  const foodList = new FoodList(parse(input));
  const ingredientsWithAllergens = new Set(
    [...foodList.getAllergensMap().values()].flatMap((a) => [...a])
  );

  return foodList.foods
    .flatMap((food) => food.ingredients)
    .filter((ingredient) => !ingredientsWithAllergens.has(ingredient)).length;
};

export const processPartTwo = (input: string): string => {
  const foodList = new FoodList(parse(input));
  return foodList.getDangerousIngredient().join(",");
};

/* Results */

console.time("Time");
const resultA = processPartOne(rawInput);
const resultB = processPartTwo(rawInput);
console.timeEnd("Time");

console.log("[Solution] 2020/21 - Part 1:", resultA); // -> 1679
console.log("[Solution] 2020/21 - Part 2:", resultB); // -> lmxt,rggkbpj,mxf,gpxmf,nmtzlj,dlkxsxg,fvqg,dxzq
