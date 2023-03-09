const getCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json().catch((error) => alert("error", error));
  return data;
};

let seconds = 0;
let interval;

const setTimer = () => {
  seconds++;
  console.log(seconds);
};

const startSecond = () => {
  interval = setInterval(setTimer, 1000);
};
startSecond();

const stopSecond = () => {
  clearInterval(interval);
};

let totalPoints = 0;

const pointsElement = document.getElementById("points");
const sumOfPoints = () => {
  let pointsToAdd = 5 - seconds;
  if (pointsToAdd < 1) {
    pointsToAdd = 1;
  }
  totalPoints = totalPoints + pointsToAdd;
  pointsElement.textContent = `You have now ${totalPoints} points`;
  console.log(totalPoints);
};

let record = 0;

const checkRecord = () => {
  if (totalPoints > record) {
    record = totalPoints;
    localStorage.setItem("recordValue", record);
  }
};

const showRecord = () => {
  const thirdSection = document.getElementById("third-section");
  const highestRecord = document.createElement("h2");

  const storageRecord = localStorage.getItem("recordValue");
  highestRecord.textContent = `The highest record ${storageRecord}`;
  thirdSection.innerHTML = "";
  thirdSection.appendChild(highestRecord);
  console.log(storageRecord);
};

let chances = 6;

const countRound = () => {
  const countTimes = document.getElementById("countTime");
  chances--;
  countTimes.innerHTML = `you have ${chances} times to play`;
  if (chances === -1) {
    countTimes.innerHTML = "";
  }
};

const messageText = document.createElement("h2");

const pointsAmount = () => {
  const points = document.getElementById("points");

  if (chances === 0) {
    checkRecord();

    points.appendChild(messageText);
    messageText.textContent = `Fineshed the game with ${totalPoints} points`;

    const optionsButtons = document.getElementsByClassName("btn-option");
    for (let i = 0; optionsButtons.length > i; i++) {
      optionsButtons[i].setAttribute("hidden", "true");
    }

    const imageFlag = document.getElementById("flag");
    imageFlag.setAttribute("src", "./world.png");
  }
};
const reloadPage = (countries) => {
  seconds = 0;
  const answerCountry = pickRandomCountry(countries); 
  showFlagData(answerCountry);
  console.log(answerCountry);
  showRandomCountries(countries, answerCountry); 
  countRound();
  pointsAmount();
  showRecord();
  playGameAgain(countries);
};

const endGame = (countries) => {
  const countryOptions = document.getElementById("countryOptions");
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart The Game";
  restartButton.id = "restart-btn";
  countryOptions.appendChild(restartButton);
  countryOptions.setAttribute("disabled", "true");

  stopSecond();
  seconds = 0;

  restartButton.addEventListener("click", function (e) {
    startSecond();
    totalPoints = 0;
    chances = 6;
    answersDiv.innerHTML = "";
    pointsElement.innerHTML = "";
    reloadPage(countries, e.target);
  });
};
const continuePlaying = (countries) => {
  const countryOptions = document.getElementById("countryOptions");
  const nextflagButton = document.createElement("div");
  nextflagButton.innerHTML = "&#8594;";
  nextflagButton.className = "symbol";
  countryOptions.appendChild(nextflagButton);

  nextflagButton.addEventListener("click", function (e) {
    console.log(seconds);
    answersDiv.innerHTML = "";
    reloadPage(countries, e.target);
  });
};

const playGameAgain = (countries) => {

  if (chances === 0) {
    endGame(countries);

  } else {
    continuePlaying(countries);
  }
};

const showFlagData = (data) => {
  const nameFlag = data.flags.png;
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  console.log(imageFlag);
};

const showRandomCountries = (countries, answerCountry) => {
  const country1 = pickRandomCountry(countries); // get one random country
  const country2 = pickRandomCountry(countries);
  const country3 = pickRandomCountry(countries); 
  const country4 = pickRandomCountry(countries); 
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

  countriesOptions.forEach((answerOptions) => {
    showCountryOptionsButton(answerOptions, answerCountry);
  });
  console.log(countriesOptions);
};

const pickRandomCountry = (countryList) => {
  return countryList[Math.floor(Math.random() * countryList.length)];
};

const showCountryOptionsButton = (country, answerCountry) => {
  const correctAnswer = answerCountry.name.common; 
  const flagCountryNameOptions = country.name.common;

  const countriesOption = document.getElementById("countryOptions");
  const countryOptionButton = document.createElement("button");
  countryOptionButton.className = "btn-option";
  countryOptionButton.classList.add("btn-option");

  countryOptionButton.innerHTML = flagCountryNameOptions;
  countryOptionButton.setAttribute("name", flagCountryNameOptions);
  countriesOption.appendChild(countryOptionButton);

  countryOptionButton.addEventListener("click", function (e) {
    if (e.target.name === correctAnswer) {
      countryOptionButton.setAttribute("style", "background-color:green");
      sumOfPoints();
    } else {
      const wrongFlag = document.createElement("div");
      countriesOption.appendChild(wrongFlag);
      wrongFlag.id ='wrong-answer'
      wrongFlag.innerHTML = "Wrong answer, please press the next button";

      const optionsButtons = document.getElementsByClassName("btn-option");
      for (let i = 0; optionsButtons.length > i; i++) {
        optionsButtons[i].setAttribute("disabled", "true");
      }
    }
  });
};

const answersDiv = document.getElementById("countryOptions");

getCountries().then((countries) => {
  reloadPage(countries);
});
