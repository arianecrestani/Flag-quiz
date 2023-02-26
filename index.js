const getCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array
  return data;
};

const reloadPage = (countries) => {
  const answerCountry = pickRandomCountry(countries); // here pick a random object, one country
  showFlagData(answerCountry);
  console.log(answerCountry);
  showRandomCountries(countries, answerCountry);

  const nextflag = document.getElementById("nextflag");
  nextflag.addEventListener("click", function (e) {
    answersDiv.innerHTML = "";
    reloadPage(countries, e.target);
    console.log(optionAnswers);
  });
};

const showFlagData = (data) => {
  const nameFlag = data.flags.png; //show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  console.log(nameFlag);
};

const showRandomCountries = (countries, answerCountry) => {
  const country1 = pickRandomCountry(countries); // get one random country
  showCountryButton(country1, answerCountry);

  const country2 = pickRandomCountry(countries); // get one random country
  showCountryButton(country2, answerCountry);

  const country3 = pickRandomCountry(countries); // get one random country
  showCountryButton(country3, answerCountry);

  const country4 = pickRandomCountry(countries); // get one random country
  showCountryButton(country4, answerCountry);

  console.log(answerCountry);
  showCountryButton(answerCountry, answerCountry);
};

const pickRandomCountry = (countryList) => {
  //array
  return countryList[Math.floor(Math.random() * countryList.length)]; //pick random country list
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
    console.log("flagCountryName", flagCountryName);

    if (e.target.name === correctAnswer) {
      btnAnswer.setAttribute("style", "background-color:green");
      console.log("correct", e.target.name);
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
