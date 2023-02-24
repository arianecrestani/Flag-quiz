const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json(); // array
  console.log(data);
  controller(data);
};
getCountryApi();

const controller = (countries) => { //countries array of objects
  const answerCountry = pickRandom(countries); // here pick a random object one country 
  showFlagData(answerCountry);
  console.log(answerCountry)
  showRandomCountries(countries, answerCountry);// country = array, answerCountry = one objeto 
};

const showFlagData = (data) => {
  const nameFlag = data.flags.png; //show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  console.log(nameFlag)
};
// showFlagData(pickRandom(data))

const showRandomCountries = (countries, answerCountry) => {
  const country1 = pickRandom(countries);// get one random country
  console.log(country1)
  showNameCountry(country1, answerCountry);//
  console.log(answerCountry);

  const country2 = pickRandom(countries);// get one random country
  showNameCountry(country2, answerCountry);
  // console.log(country2);

  const country3 = pickRandom(countries);// get one random country
  showNameCountry(country3, answerCountry);
  // console.log(country3);
  const country4 = pickRandom(countries);// get one random country
  showNameCountry(country4, answerCountry);
  // console.log(country4);

  showNameCountry(answerCountry,answerCountry)

};

const pickRandom = (countryList) => {
  //array
  return countryList[Math.floor(Math.random() * countryList.length)];//pick random country list
};

const showNameCountry = (country, answerCountry, countries) => {

  
  const optionAnswers = document.getElementById("optionAnswers");
  console.log(country, answerCountry);
  console.log(optionAnswers)

  const correctAnswer = answerCountry.name.common;//  update the page with one name of object
  const flagCountryName = country.name.common;//  update the page with one name of object

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

      setTimeout(document.location.reload(), 3000);
                    
      
    }else {
      btnAnswer.setAttribute("style", "background-color:red");
      console.log("incorrect");
    }

  
  });
};




