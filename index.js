const getCountryApi = async () => {

  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array

  const showRandom = pickRandom(data) // obj
  showFlagData(showRandom)
  showRandomCountries(data);

};
getCountryApi()

const showFlagData = (data) => {

  const nameFlag = data.flags.png;//show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  console.log(data)
};
// showFlagData(pickRandom(data))

const showRandomCountries = (country) => {

  const country1 = pickRandom(country);
  showNameCountry(country1);

  const country2 = pickRandom(country);
  showNameCountry(country2);

  const country3 = pickRandom(country);
  showNameCountry(country3);

  const country4 = pickRandom(country);
  showNameCountry(country4);

  return country

};

const pickRandom = (countryList) => { //array
  return countryList[Math.floor(Math.random() * countryList.length)];
};

const showNameCountry = (data) => {
  const optionAnswers = document.getElementById("optionAnswers");
  
  const btnAnswer = document.createElement("button");
  btnAnswer.innerHTML = data.name.common;
  optionAnswers.appendChild(btnAnswer);
};
