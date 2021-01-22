const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            (data.meals).forEach(meal => {

                document.title = `${meal.strMeal} || Random Meal Generator - using API` ;

                //Manupulate main meal in DOM
                document.querySelector(".dish").innerHTML = `<div class="dish-text">${meal.strMeal}</div>
                <div class="category">( ${meal.strCategory} )</div>
                <div class="dish-image">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>`;

                let btn_html = `<div class="buttons">
                <a href=${meal.strSource}><button class="btn link-btn">Read More</button></a>
                </div>`;
                let youtube_btn = `<div class="buttons">
                <a href=${meal.strYoutube}><button class="btn youtube-btn">Watch At Youtube  
                    	<i class="fa fa-play"></i></button></a>
                </div>`;
                if (meal.strSource == "" || meal.strSource == null) {
                    btn_html = "";
                }
                if (meal.strYoutube == "" || meal.strYoutube == null) {
                    youtube_btn = ""
                }

                document.querySelector(".dish").innerHTML += btn_html + youtube_btn;

                //Manupulate instructions in the DOM
                let strInstructions = (meal.strInstructions).split(".");
                let instruction_html = "";

                for (let index = 0; index < strInstructions.length - 1; index++) {
                    const instruction = strInstructions[index];
                    instruction_html += `<p class="ins"> ${instruction}.</p>`;
                }

                document.querySelector(".instruction-text").innerHTML = instruction_html;


                //Find Number of active Ingredients Fetched 
                let noOfIngredients = 0;
                let string = "strIngredient";

                for (const key in meal) {
                    let validItems = (meal[key] !== "" && meal[key] !== " " && meal[key] !== null);

                    if (key.includes(string) && validItems) {
                        noOfIngredients++;
                    }
                }

                //Manupulate number of ingredients in the DOM
                let ingredient_html = "";

                for (let index = 1; index <= noOfIngredients; index++) {
                    let ingredient_name = meal[`strIngredient${index}`];
                    let measures = meal[`strMeasure${index}`]
                    let imageIngredientTxt = ingredient_name.replace(" ", "%20");
                    let imageOfIngredient = `https://www.themealdb.com/images/ingredients/${imageIngredientTxt}.png`;

                    ingredient_html += ` <div class="ingredient">
                                        <div class="ingredient-image">
                                            <img src="${imageOfIngredient}" alt="${ingredient_name}">
                                        </div>
                                        <div class="ingredient-text">${measures} ${ingredient_name}</div>
                                    </div>`;
                }

                document.querySelector(".ingredients").innerHTML += ingredient_html;

            })
        })
        .catch(error => {
            document.querySelector(".main-content").innerHTML = "Failed To Load Resources";
        })
