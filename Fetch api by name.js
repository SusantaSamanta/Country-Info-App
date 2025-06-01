

let countryNameArr = []
const fetchCountryName = async () => {

  try {
    let res = await fetch('https://restcountries.com/v3.1/all');
    let data = await res.json();
    for (index in data) {
      countryNameArr[index] = data[index].name.common;
    }
    console.log(countryNameArr);
  }
  catch (err) {
    countryNameArr = ['India', 'Nepal', 'China'];
    window.alert("Search Suggestion not working properly")
    console.log("Captain", err);
  }
}
//fetchCountryName();


const fetchDeitailsByApi = async (nowName) => {
  //nowName = cName.charAt(0).toUpperCase() + cName.slice(1).toLowerCase();
  try {
    let res = await fetch(`https://restcountries.com/v3.1/name/${nowName}`);
    let data = await res.json();

    let targetIndex = 0;  // hold The Actual Index is which the inputBox data present
    for(index in data){
      if(data[index].name.common == nowName){
        targetIndex = index;
        console.log(data[index].name.common);
      }
    }

    console.log(`Country Name: ${data[targetIndex].name.common} (${data[targetIndex].cioc})`);
    console.log(`Currency: ${data[0].currencies[Object.keys(data[0].currencies)[0]].name} - ${Object.keys(data[0].currencies)[0]}`);
    console.log(`Capital: ${data[targetIndex].capital}`);
    console.log(`Flag: ${data[targetIndex].flags.svg}`);
    console.log(`Coat Of Arms: ${data[targetIndex].coatOfArms.svg}`);
    console.log(`Population: ${data[targetIndex].population}`);
    console.log(`Continents: ${data[targetIndex].continents[0]}`);
    console.log(`Languages: ${Object.values(data[targetIndex].languages).join(', ')}`);
    console.log(`ISD: ${Object.values(data[targetIndex].idd).join('')}`);
    console.log(`ccTLD: ${data[targetIndex].tld[0]}`);

  }
  catch (err) {
    countryNameArr = ['India', 'Nepal', 'China'];
    window.alert("Don't find the Country ")
    console.log("Captain", err);
  }

}
fetchDeitailsByApi('nepal');

if(undefined)
  console.log('nooot')
else
console.log('okkkk')
