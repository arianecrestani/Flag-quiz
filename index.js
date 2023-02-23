const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array
  console.log(data);
  controller(data);
};
getCountryApi();

const controller = (data) => {
  const showRandom = pickRandom(data); // obj
  showFlagData(showRandom);
  showRandomCountries(data, showRandom);
};

const showFlagData = (data) => {
  const nameFlag = data.flags.png; //show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
};
// showFlagData(pickRandom(data))

const showRandomCountries = (country, answerCountry) => {
  const country1 = pickRandom(country);
  showNameCountry(country1, answerCountry);
  // console.log(country1);

  const country2 = pickRandom(country);
  showNameCountry(country2, answerCountry);
  // console.log(country2);

  const country3 = pickRandom(country);
  showNameCountry(country3, answerCountry);
  // console.log(country3);
  const country4 = pickRandom(country);
  showNameCountry(country4, answerCountry);
  // console.log(country4);

  showNameCountry(answerCountry,answerCountry)

};

const pickRandom = (countryList) => {
  //array
  return countryList[Math.floor(Math.random() * countryList.length)];
};

const showNameCountry = (data, answerCountry) => {
  
  const optionAnswers = document.getElementById("optionAnswers");
  console.log(data, answerCountry);
  console.log(optionAnswers)

  const correctAnswer = answerCountry.name.common;
  const flagCountryName = data.name.common;

  const btnAnswer = document.createElement("button");
  btnAnswer.innerHTML = flagCountryName;
  btnAnswer.setAttribute("name", flagCountryName);
  optionAnswers.appendChild(btnAnswer);
  console.log();

  btnAnswer.addEventListener("click", function (e) {
    console.log("e.target.name", e.target.name);
    console.log("flagCountryName", flagCountryName);

    if (e.target.name === correctAnswer) {
      btnAnswer.setAttribute("style", "background-color:green");
      console.log("correct", e.target.name);
    }else {
      btnAnswer.setAttribute("style", "background-color:red");
      console.log("incorrect");
    }
  });
};
