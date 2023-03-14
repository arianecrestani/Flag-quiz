const getCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json().catch((error) => alert("error", error));
  return data;
};

let seconds = 0;
let interval;

const setTimer = () => {
  seconds++;
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

  const pointsElement = document.getElementById("points");
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

  if (storageRecord !== null) {
    highestRecord.textContent = `The highest record ${storageRecord}`;
    thirdSection.innerHTML = "";
    thirdSection.appendChild(highestRecord);
  } else {
    highestRecord.textContent = `There is no record yet`;
    thirdSection.innerHTML = "";
    thirdSection.appendChild(highestRecord);
  }
};

let chances = 6;

const countRound = () => {
  const countTimes = document.getElementById("countTime");
  chances--;
  countTimes.innerHTML = `You have ${chances} times to play`;
  if (chances === -1) {
    countTimes.innerHTML = "";
  }
};

const pointsAmount = () => {
  const messageText = document.createElement("h2");
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
const updateUi = (countries) => {
  const answersDiv = document.getElementById("buttonOptions");
  answersDiv.innerHTML = "";
  seconds = 0;
  const answerRegionName = pickRandomCountry(countries);
  const answerCountryName = pickRandomCountry(countries);

  const date = new Date().getMilliseconds();
  console.log("date", date); //random
  if (date % 2 === 0) {
    showFlagData(answerRegionName);
    showRegions(answerRegionName, countries);
  } else {
    showRandomCountries(countries, answerCountryName);
    showFlagData(answerCountryName);
  }
  countRound();
  pointsAmount();
  showRecord();
  quizStatus(countries);
  if (totalPoints === 0) {
    const pointsElement = document.getElementById("points");
    totalPoints = 0;
    pointsElement.textContent = `You have now ${totalPoints} points`;
  }
};

const endGame = (countries) => {
  const countryOptions = document.getElementById("buttonOptions");
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
    pointsElement.innerHTML = "";
    updateUi(countries, e.target);
  });
};
const continuePlaying = (countries) => {
  const countryOptions = document.getElementById("buttonOptions");

  const nextflagButton = document.createElement("div");
  nextflagButton.innerHTML = "&#8594;";
  nextflagButton.className = "symbol";
  countryOptions.appendChild(nextflagButton);

  nextflagButton.addEventListener("click", function (e) {
    console.log(seconds);
    updateUi(countries, e.target);
  });
};

const quizStatus = (countries) => {
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
};

const createButton = (title) => {
  const button = document.createElement("button");
  button.innerHTML = title;
  button.className = "btn-option";
  button.setAttribute("name", title);

  return button;
};

const showRegions = (answerRegionName) => {
  const correctAnswerRegion = answerRegionName.region;
  const regionsOption = document.getElementById("buttonOptions");

  const region1 = createButton("Asia");
  const region2 = createButton("Americas");
  const region3 = createButton("Oceania");
  const region4 = createButton("Africa");
  const region5 = createButton("Europe");

  const regions = [region1, region2, region3, region4, region5];

  regions.forEach((optionButton) => {
    regionsOption.appendChild(optionButton);
    eventButtons(optionButton, correctAnswerRegion);
  });
};
const eventButtons = (optionButton, correctAnswerRegion) => {
  const regionsOption = document.getElementById("buttonOptions");
  optionButton.addEventListener("click", function (e) {
    if (e.target.name === correctAnswerRegion) {
      optionButton.setAttribute("style", "background-color:green");
      sumOfPoints();
    } else {
      const wrongFlag = document.createElement("div");
      regionsOption.appendChild(wrongFlag);
      wrongFlag.id = "wrong-answer";
      wrongFlag.innerHTML = "Wrong answer, please press the next button";

      const optionsButtons = document.getElementsByClassName("btn-option");
      for (let i = 0; optionsButtons.length > i; i++) {
        optionsButtons[i].setAttribute("disabled", "true");
      }
    }
  });
};

const showRandomCountries = (countries, answerCountryName) => {
  const country1 = pickRandomCountry(countries);
  const country2 = pickRandomCountry(countries);
  const country3 = pickRandomCountry(countries);
  const country4 = pickRandomCountry(countries);
  const countriesOptions = [
    country1,
    country2,
    country3,
    country4,
    answerCountryName,
  ];

  let shuffleCountries = (arrayCountries) => {
    return arrayCountries.sort(() => Math.random() - 0.5);
  };
  shuffleCountries(countriesOptions);

  countriesOptions.forEach((answerOptions) => {
    showCountryOptionsButton(answerOptions, answerCountryName);
  });
};

const pickRandomCountry = (countryList) => {
  return countryList[Math.floor(Math.random() * countryList.length)];
};

const showCountryOptionsButton = (country, answerCountryName) => {
  const correctAnswerCountry = answerCountryName.name.common;
  const flagCountryNameOptions = country.name.common;
  const countriesOption = document.getElementById("buttonOptions");

  const optionButton = document.createElement("button");
  optionButton.className = "btn-option";
  optionButton.classList.add("btn-option");

  optionButton.innerHTML = flagCountryNameOptions;
  optionButton.setAttribute("name", flagCountryNameOptions);
  countriesOption.appendChild(optionButton);

  eventButtons(optionButton, correctAnswerCountry);
};

getCountries().then((countries) => {
  updateUi(countries);
});
