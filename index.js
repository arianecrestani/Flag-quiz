const getCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array
  return data;
};

const points = document.getElementById("points");

let score = 0;

const sumOfPoints = () => {
  score += 5;
  points.innerHTML = score;
};

const reloadPage = (countries) => {
  const answerCountry = pickRandomCountry(countries); // here pick a random object, one country and shows one flag for that
  showFlagData(answerCountry); // each time reload the page will show one random flag image
  console.log(answerCountry);
  showRandomCountries(countries, answerCountry); // each time a reload page run this function which shows random countries
  sumOfPoints()
  const nextflag = document.getElementById("nextflag"); // a button each time when is clicked cleaning-up the buttons and show new countries
  nextflag.addEventListener("click", function (e) {
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

  let shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  shuffle(countriesOptions);

  countriesOptions.forEach((answer) => {
    showCountryButton(answer, answerCountry);
  });
  console.log(countriesOptions);
};

const pickRandomCountry = (countryList) => {
  //array
  return countryList[Math.floor(Math.random() * countryList.length)];
  //pick random country list
};

const showCountryButton = (country, answerCountry) => {
  const correctAnswer = answerCountry.name.common; //  update the page with one name of object
  const flagCountryName = country.name.common; //  update the page with one name of object

  const optionAnswers = document.getElementById("optionAnswers");
  const btnAnswer = document.createElement("button");

  btnAnswer.innerHTML = flagCountryName;
  btnAnswer.setAttribute("name", flagCountryName);
  optionAnswers.appendChild(btnAnswer);

  btnAnswer.addEventListener("click", function (e) {
    console.log("e.target.name", e.target.name);

    if (e.target.name === correctAnswer) {
      btnAnswer.setAttribute("style", "background-color:green");
      sumOfPoints();
    } else {
      btnAnswer.setAttribute("style", "background-color:red");
      console.log("incorrect");
    }
  });
};

const answersDiv = document.getElementById("optionAnswers");

getCountries().then((countries) => {
  reloadPage(countries);
});
