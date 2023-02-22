const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  showFlagData(data);
};
getCountryApi();

const showFlagData = (data) => {
  const nameFlag = data[0].flags.png; //show Flag
  // const flagCountryName = data[i].name.common; // show country name
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  showNameCountry(data);
};

const showNameCountry = (data) => {
  const optionAnswers = document.getElementById("optionAnswers");

  let array = data;
  let newArray = [];

  console.log(array);

  for (let i = 0; 7 > i; i++) {
    newArray.push(array[i]);
    console.log(newArray);
    const btnAnswer = document.createElement("button");
    btnAnswer.innerHTML = newArray[i].name.common;
    optionAnswers.appendChild(btnAnswer);
  }
  return newArray;

  // return nameCountry
  // const nameCountry =  data[0].name.common;
  // const optionAnswers = document.getElementById("optionAnswers"); // first button
  // optionAnswers.addEventListener("click", function (e) {

  //   console.log('e.target.name', e.target.name)
  //   console.log("User has clicked on the button!");
  //   if(flagCountryName === e.target.name)
  //  console.log("correct")
  // });
  // buttons.innerHTML = nameCountry;
};
