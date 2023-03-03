const getCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array
  return data;
};


let seconds = 0 

// const setTimer = () => {
//   seconds++
//   console.log(seconds)
// }
// let interval = setInterval(setTimer, 1000);

let totalPoints = 0;

const sumOfPoints = () => {
  const pointsElement = document.getElementById("points");
  const pointsToAdd = 5 - seconds
  if(pointsToAdd < 1){
    pointsToAdd = 1
  }
  totalPoints = totalPoints + pointsToAdd
  pointsElement.textContent = `you have ${totalPoints} points`
  console.log(totalPoints)
};

let chances = 10;

const countRound = () => {
  const countTimes = document.getElementById("countTime");
  chances--;
  countTimes.innerHTML =`you have ${chances} times to play` 
  
};

const pointsAmount = () => {
  const points = document.getElementById("points");
  if (chances === 0) {
    const messageText = document.createElement("h2");
    points.appendChild(messageText);
    messageText.textContent = `fineshed the game with ${totalPoints} points`;
    console.log(messageText);
   } 
  //  if(point < 6){
  //   const loser = document.createElement("h2");
  //   points.appendChild(loser);
  //   loser.textContent = `Game over ${point}`;
  //   console.log(loser);

  //  }
  // player will have 10x times to try the game, if the player get 60% (6 correct answer) of correct answer will be a winner otherwise will loser
};

const reloadPage = (countries) => {
  const answerCountry = pickRandomCountry(countries); // here pick a random object, one country and shows one flag for that
  showFlagData(answerCountry); // each time reload the page will show one random flag image
  console.log(answerCountry);
  showRandomCountries(countries, answerCountry); // each time a reload page run this function which shows random countries

  const nextflagButton = document.getElementById("nextflag"); // a button each time when is clicked cleaning-up the buttons and show new countries
  seconds = 0

  nextflagButton.addEventListener("click", function (e) {
    answersDiv.innerHTML = "";
    reloadPage(countries, e.target);
  });
};

const showFlagData = (data) => {
  const nameFlag = data.flags.png; //show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  console.log(imageFlag);
};

const showRandomCountries = (countries, answerCountry) => {
  const country1 = pickRandomCountry(countries); // get one random country
  const country2 = pickRandomCountry(countries); // get one random country
  const country3 = pickRandomCountry(countries); // get one random country
  const country4 = pickRandomCountry(countries); // get one random country
  const countriesOptions = [
    country1,
    country2,
    country3,
    country4,
    answerCountry,
  ];

  let shuffleCountries = (array) => {
    return array.sort(() => Math.random() - 0.5); // suffle the country answer
  };
  shuffleCountries(countriesOptions);

  countriesOptions.forEach((answer) => {
    showCountryButtons(answer, answerCountry);
  });
  console.log(countriesOptions);
};

const pickRandomCountry = (countryList) => {
  //array
  return countryList[Math.floor(Math.random() * countryList.length)];
  //pick random country list
};

const showCountryButtons = (country, answerCountry) => {
  const correctAnswer = answerCountry.name.common; //  update the page with one name of object
  const flagCountryName = country.name.common; //  update the page with one name of object

  const countryOptions = document.getElementById("countryOptions");
  const countryOptionButton = document.createElement("button");
  countryOptionButton.classList.add("btn-option");

  countryOptionButton.innerHTML = flagCountryName;
  countryOptionButton.setAttribute("name", flagCountryName);
  countryOptions.appendChild(countryOptionButton);
  countryOptionButton.className = 'button'

  countryOptionButton.addEventListener("click", function (e) {

    if (e.target.name === correctAnswer) {
      countryOptionButton.setAttribute("style", "background-color:green");
      // countryOptions.setAttribute('disabled', 'true')
      sumOfPoints();
    } else {
      
      const wrongFlag = document.createElement("div");
      countryOptions.appendChild(wrongFlag);
      wrongFlag.innerHTML = "wrong answer, please press the next button";

      const optionsButtons = document.getElementsByClassName("btn-option");
      for (let i = 0; optionsButtons.length > i; i++) {
        optionsButtons[i].setAttribute("disabled", "true");
      }
    }
    pointsAmount()
    countRound()
 
  });
};

const answersDiv = document.getElementById("optionAnswers");

getCountries().then((countries) => {
  reloadPage(countries);
});
