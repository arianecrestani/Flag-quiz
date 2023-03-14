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
  console.log("date", date);
  if (date % 2 === 0) {
    showFlagData(answerRegionName);
    showRandomRegions(answerRegionName, countries);
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
    // answersDiv.innerHTML = "";
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
const showRandomRegions = (answerRegionName) => {
  const correctAnswerRegion = answerRegionName.region;

  const regionsOption = document.getElementById("buttonOptions");

  const region1 = document.createElement("button");
  region1.innerHTML = "Asia";
  region1.className = "btn-option";
  region1.setAttribute("name", "Asia");
  console.log(region1);
  regionsOption.appendChild(region1);

  const region2 = document.createElement("button");
  region2.innerHTML = "Americas";
  region2.className = "btn-option";
  region2.setAttribute("name", "Americas");
  regionsOption.appendChild(region2);

  const region3 = document.createElement("button");
  region3.innerHTML = "Oceania";
  region3.className = "btn-option";
  region3.setAttribute("name", "Oceania");
  regionsOption.appendChild(region3);

  const region4 = document.createElement("button");
  region4.innerHTML = "Africa";
  region4.className = "btn-option";
  region4.setAttribute("name", "Africa");
  regionsOption.appendChild(region4);

  const region5 = document.createElement("button");
  region5.textContent = "Europe";
  region5.className = "btn-option";
  region5.setAttribute("name", "Europe");
  regionsOption.appendChild(region5);

  const regions = [region1, region2, region3, region4, region5];

  regions.forEach((region) => {
    region.addEventListener("click", function (e) {
      if (e.target.name === correctAnswerRegion) {
        region.setAttribute("style", "background-color:green");
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

  const countryOptionButton = document.createElement("button");
  countryOptionButton.className = "btn-option";
  countryOptionButton.classList.add("btn-option");

  countryOptionButton.innerHTML = flagCountryNameOptions;
  countryOptionButton.setAttribute("name", flagCountryNameOptions);
  countriesOption.appendChild(countryOptionButton);

  countryOptionButton.addEventListener("click", function (e) {
    if (e.target.name === correctAnswerCountry) {
      countryOptionButton.setAttribute("style", "background-color:green");
      sumOfPoints();
    } else {
      const wrongFlag = document.createElement("div");
      countriesOption.appendChild(wrongFlag);
      wrongFlag.id = "wrong-answer";
      wrongFlag.innerHTML = "Wrong answer, please press the next button";

      const optionsButtons = document.getElementsByClassName("btn-option");
      for (let i = 0; optionsButtons.length > i; i++) {
        optionsButtons[i].setAttribute("disabled", "true");
      }
    }
  });
};

getCountries().then((countries) => {
  updateUi(countries);
});
