const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  console.log(data);
  showFlag(data);
  
};
getCountryApi();

const showFlag = (data) => {

  const nameFlag = data[0].flags.png
  const flagCountryName = data[0].name.common;
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", nameFlag);
  showNameCountry(data, flagCountryName);
};

const showNameCountry = (data,flagCountryName) => {

  // const nameCountry =  data[0].name.common;
  const firstOption = document.getElementById("firstOption");
  firstOption.addEventListener("click", function (e) {
    console.log('e.target.name', e.target.name)

    console.log("User has clicked on the button!");
    if(flagCountryName === e.target.name) 
   console.log("correct")
  });
  firstOption.innerHTML = nameCountry;

  const secondOption = document.getElementById("secondOption");
  secondOption.innerHTML = data[1].name.common;

  const thirdOption = document.getElementById("thirdOption");
  thirdOption.innerHTML = data[2].name.common;

  const fourthOption = document.getElementById("fourthOption");
  fourthOption.innerHTML = data[3].name.common;
};
