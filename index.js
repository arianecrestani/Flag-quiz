const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  showFlag(data);
};
getCountryApi();

const showFlag = (data) => {
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", data[0].flags.png);
};
