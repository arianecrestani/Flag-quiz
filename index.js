const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  console.log(data);


  const figure = document.getElementById("flag-container");
  const imageFlag = document.getElementById("flag");
  console.log(imageFlag)
  imageFlag.setAttribute("src", data[1].flags.png);
  figure.appendChild(imageFlag);
  console.log(figure)

  return data;
};
getCountryApi();
