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
  pointsElement.textContent = `you have ${totalPoints} points`;
  console.log(totalPoints);
};

let record = 0;

const showRecord = () => {
  const thirdSection = document.getElementById("third-section");
  const highestRecord = document.createElement("h2");

  if (totalPoints > record) {
    record = totalPoints;
    localStorage.setItem("recordValue", record);
  }

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
    showRecord();

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
  const answerCountry = pickRandomCountry(countries); // here pick a random object, one country and shows one flag for that
  showFlagData(answerCountry); // each time reload the page will show one random flag image
  console.log(answerCountry);
  showRandomCountries(countries, answerCountry); // each time a reload page run this function which shows random countries

  countRound();
  pointsAmount();

  seconds = 0;

  const countryOptions = document.getElementById("countryOptions");

  if (chances === 0) {
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
  } else {
    const nextflagButton = document.createElement("div"); // a button each time when is clicked
    nextflagButton.innerHTML = "&#8594;";
    nextflagButton.className = "symbol";
    countryOptions.appendChild(nextflagButton);

    nextflagButton.addEventListener("click", function (e) {
      console.log(seconds);
      answersDiv.innerHTML = "";
      reloadPage(countries, e.target);
    });
  }
  showRecord();
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

  countriesOptions.forEach((answerOptions) => {
    showCountryButtons(answerOptions, answerCountry);
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
  countryOptionButton.className = "btn-option";
  countryOptionButton.classList.add("btn-option");

  countryOptionButton.innerHTML = flagCountryName;
  countryOptionButton.setAttribute("name", flagCountryName);
  countryOptions.appendChild(countryOptionButton);

  countryOptionButton.addEventListener("click", function (e) {
    if (e.target.name === correctAnswer) {
      countryOptionButton.setAttribute("style", "background-color:green");
      // countryOptions.setAttribute("disabled", "true");
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
  });
};

const answersDiv = document.getElementById("countryOptions");

getCountries().then((countries) => {
  reloadPage(countries);
});
