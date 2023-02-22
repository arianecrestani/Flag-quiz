const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  showFlagData(data);
};
getCountryApi();

const showFlagData = (data) => {
  const nameFlag = data[0].flags.png; //show Flag
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  showNameCountry(data);
};

function pickRandom(data) {
  let randomArray = data;
  return randomArray[Math.floor(Math.random() * randomArray.length)];
}

const showNameCountry = (data) => {
  const optionAnswers = document.getElementById("optionAnswers");

  let array = data;
  let newArray = [];
  console.log(data);

  for (let i = 0; 5 >= i; i++) {
    newArray.push(array[i]);

    const btnAnswer = document.createElement("button");
    let newArrayOfCountryNames = array[i].name.common;
    btnAnswer.innerHTML = newArrayOfCountryNames;
    optionAnswers.appendChild(btnAnswer);

    btnAnswer.addEventListener("click", function (e) {
    console.log("e.target.name", e.target.name);
    console.log("User has clicked on the button!");
    if (newArrayOfCountryNames === e.target.name) console.log("correct");
    });
  }
  // return newArray

  // return nameCountry
  // const nameCountry =  data[0].name.common;
  // const optionAnswers = document.getElementById("optionAnswers"); // first button

  // buttons.innerHTML = nameCountry;
  // return  newArray
};
