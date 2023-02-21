const getCountryApi = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  console.log(data)
  showFlag(data);
  showName(data)
};
getCountryApi();

const showFlag = (data) => {
  const imageFlag = document.getElementById("flag");
  imageFlag.setAttribute("src", data[0].flags.png);

};

const showName = (data) => {

  const firstOption = document.getElementById('firstOption') // put functionallity event listner in this button
  firstOption.innerHTML = data[0].name.common;

  const secondOption = document.getElementById('secondOption')
  secondOption.innerHTML = data[1].name.common;

  const thirdOption = document.getElementById('thirdOption')
  thirdOption.innerHTML = data[2].name.common; 

  const fourthOption = document.getElementById('fourthOption')
  fourthOption.innerHTML = data[3].name.common;
}

