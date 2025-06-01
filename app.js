

let inputBox = document.getElementById("inputBox");
let suggestionCont = document.getElementById("suggestionCont");
let searchBtn = document.getElementById('searchBtn');



let storeName = [];


////////////////////     this part for retrieve all name fro the api   /////////////////////////
let countryNameArr = [];
const fetchCountryName = async () => {
    try {
        let res = await fetch('https://restcountries.com/v3.1/all');
        let data = await res.json();
        for (index in data) {
            countryNameArr[index] = data[index].name.common;
        }
        // console.log(countryNameArr);
    }
    catch (err) {
        countryNameArr = ['India', 'Nepal', 'China'];
        window.alert("Search Suggestion not working properly")
        console.log("Captain", err);
    }
}
fetchCountryName();



const searchResult = (event) => {

    storeName = [];
    let value = inputBox.value;
    let liTag = '';

    for (name of countryNameArr)
        if (name.toLowerCase().startsWith(value.toLowerCase())) // for every letter input in inputBox, each time input.value is startWith those value in country arr they will push in to the storeName arr
            storeName.push(name);

    if (storeName.length == 0) {  //// if no suggestion present then suggestion list hide
        suggestionCont.style.cssText = "display: none;"
    }
    else {                        ////  if suggestion present then show 
        suggestionCont.style.cssText = "display: block;"
        for (name of storeName)   // after receiving all name list suggestion are generate
            liTag += `<li>${name}</li>`;

        suggestionCont.innerHTML = liTag;
    }

}
inputBox.addEventListener('input', searchResult)


///////////  this part for click event for all list suggestion     ////////////
suggestionCont.addEventListener('click', (event) => {
    if (event.target) {
        inputBox.value = event.target.innerText;
        searchFun();
        suggestionCont.style.display = 'none';
    }
});

///////////    this part for inputBox focus or not and the corresponding action     ///////////////
let inputFocus = 0;
inputBox.addEventListener('focus', () => {
    inputFocus++;
    if (inputFocus > 1)
        suggestionCont.style.cssText = "display: block;"
    inputBox.style.cssText = "border: 1px solid #1c62b9;";

})
inputBox.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionCont.style.cssText = "display: none;";
    }, 200)
    inputBox.style.cssText = "border: 1px solid gray;"
})






// let  countryNameVal, capitalVla, continentVla, currencyVal, isdVal, ccTLDVal, populationVal, languagesVal, flagVal;
let countryDetailsArr = [];
let flagSvg;
////////////////     this part for receive details using inputBox.value    /////////////////

const searchFun = async () => {
    nowName = inputBox.value;
    console.log(nowName)
    try {
        let res = await fetch(`https://restcountries.com/v3.1/name/${nowName}`);
        let data = await res.json();
        console.log(data);

        let targetIndex = 0;  // hold The Actual Index is which the inputBox data present
        for (index in data) {
            if (data[index].name.common == nowName) {
                targetIndex = index;                 // Some time api send multiple data for an input in array for retrieve the correct value i use it
                // console.log(data[index].name.common);
            }
        }


        console.log(`Country Name: ${data[targetIndex].name.common} (${data[targetIndex].cioc})`);
        console.log(`Currency: ${data[targetIndex].currencies[Object.keys(data[targetIndex].currencies)[0]].name} - ${Object.keys(data[targetIndex].currencies)[0]}`);
        console.log(`Capital: ${data[targetIndex].capital}`);
        console.log(`Flag: ${data[targetIndex].flags.svg}`);
        console.log(`Coat Of Arms: ${data[targetIndex].coatOfArms.svg}`);
        console.log(`Population: ${data[targetIndex].population}`);
        console.log(`Continent: ${data[targetIndex].continents[0]}`);
        console.log(`Languages: ${Object.values(data[targetIndex].languages).join(', ')}`);
        console.log(`ISD: ${Object.values(data[targetIndex].idd).join('')}`);
        console.log(`ccTLD: ${data[targetIndex].tld[0]}`);


        countryFlagImage.src = countryDetailsArr[0] = data[targetIndex].flags.svg;
        bodyBackground.style.backgroundImage = `url(${data[targetIndex].flags.svg})`;
        countryHeading.innerText = countryDetailsArr[1] = (data[targetIndex].name.common).toUpperCase();
        countryName.innerText = countryDetailsArr[2] = `Country Name: ${data[targetIndex].name.common} (${data[targetIndex].cioc})`;
        capital.innerText = countryDetailsArr[3] = `Capital: ${data[targetIndex].capital}`;
        continent.innerText = countryDetailsArr[4] = `Continent: ${data[targetIndex].continents[0]}`;
        currency.innerText = countryDetailsArr[5] = `Currency: ${data[targetIndex].currencies[Object.keys(data[targetIndex].currencies)[0]].name} - ${Object.keys(data[targetIndex].currencies)[0]}`;
        isd.innerText = countryDetailsArr[6] = `ISD: ${Object.values(data[targetIndex].idd).join('')}`;
        cctld.innerText = countryDetailsArr[7] = `ccTLD: ${data[targetIndex].tld[0]}`;
        population.innerText = countryDetailsArr[8] = `Population: ${data[targetIndex].population}`;
        language.innerText = countryDetailsArr[9] = `Languages: ${Object.values(data[targetIndex].languages).join(', ')}`;
        countryDetailsArr[10] = data[targetIndex].coatOfArms.svg;
        (countryDetailsArr[10] != null) ? coatOfArms.src = countryDetailsArr[10] : coatOfArms.src = 'defaultCoatOfArms.png';

        localStorage.setItem('countryDetailsArrL', JSON.stringify(countryDetailsArr));

        countryHeadingSize();
        (container.offsetHeight > 650) ? container.style.cssText = 'width: 550px; padding: 30px;' : container.style.cssText = 'width: 500px; padding: 40px;';


    }
    catch (err) {
        inputBox.value = '';
        window.alert(`Don't find the Country "${nowName}"`);
        console.log(err);
    }
}
searchBtn.addEventListener('click', searchFun);


////////////////   Retrieve data from local storage   ///////////////

window.onload = () => {
    test = JSON.parse(localStorage.getItem('countryDetailsArrL'));
    if (test != null) {
        countryDetailsArr = test;
        countryFlagImage.src = countryDetailsArr[0];
        bodyBackground.style.backgroundImage = `url(${countryDetailsArr[0]})`;
        countryHeading.innerText = countryDetailsArr[1];
        countryName.innerText = countryDetailsArr[2];
        capital.innerText = countryDetailsArr[3];
        continent.innerText = countryDetailsArr[4];
        currency.innerText = countryDetailsArr[5];
        isd.innerText = countryDetailsArr[6];
        cctld.innerText = countryDetailsArr[7];
        population.innerText = countryDetailsArr[8];
        language.innerText = countryDetailsArr[9];
        (countryDetailsArr[10] != null) ? coatOfArms.src = countryDetailsArr[10] : coatOfArms.src = 'defaultCoatOfArms.png';


        countryHeadingSize();
        (container.offsetHeight > 650) ? container.style.cssText = 'width: 550px; padding: 30px;' : container.style.cssText = 'width: 500px; padding: 40px;';

    }
    else
        console.log('null...')
}


///// letter spacing fix depending on the length of the country name  /////

const countryHeadingSize = () => {
    if (countryDetailsArr[1].length > 15) {
        countryHeading.style.cssText = 'letter-spacing: 0px;';
        countryHeading.style.cssText = 'font-size: 20px;';
    }
    else if (countryDetailsArr[1].length > 25) {
        countryHeading.style.cssText = 'letter-spacing: 9px';
        countryHeading.style.cssText = 'font-size: 15px;';
    }
    else {
        countryHeading.style.cssText = 'letter-spacing: 3px';
        countryHeading.style.cssText = 'font-size: 32px;';
    }
}

























/*



        let inputBox = document.getElementById("inputBox");
        let suggestionCont = document.getElementById("suggestionCont");
        let searchBtn = document.getElementById('searchBtn');



        let storeName = [];


        ////////////////////     this part for retrieve all name fro the api   /////////////////////////
        let countryNameArr = [];
        const fetchCountryName = async () => {
            try {
                let res = await fetch('https://restcountries.com/v3.1/all');
                let data = await res.json();
                for (index in data) {
                    countryNameArr[index] = data[index].name.common;
                }
                // console.log(countryNameArr);
            }
            catch (err) {
                countryNameArr = ['India', 'Nepal', 'China'];
                window.alert("Search Suggestion not working properly")
                console.log("Captain", err);
            }
        }
        fetchCountryName();



        const searchResult = (event) => {

            storeName = [];
            let value = inputBox.value;
            let liTag = '';

            for (name of countryNameArr)
                if (name.toLowerCase().startsWith(value.toLowerCase())) // for every letter input in inputBox, each time input.value is startWith those value in country arr they will push in to the storeName arr
                    storeName.push(name);

            if (storeName.length == 0) {  //// if no suggestion present then suggestion list hide
                suggestionCont.style.cssText = "display: none;"
            }
            else {                        ////  if suggestion present then show 
                suggestionCont.style.cssText = "display: block;"
                for (name of storeName)   // after receiving all name list suggestion are generate
                    liTag += `<li>${name}</li>`;

                suggestionCont.innerHTML = liTag;
            }

        }
        inputBox.addEventListener('input', searchResult)


        ///////////  this part for click event for all list suggestion     ////////////
        suggestionCont.addEventListener('click', (event) => {
            if (event.target) {
                inputBox.value = event.target.innerText;
                searchFun();
                suggestionCont.style.display = 'none';
            }
        });

        ///////////    this part for inputBox focus or not and the corresponding action     ///////////////
        let inputFocus = 0;
        inputBox.addEventListener('focus', () => {
            inputFocus++;
            if (inputFocus > 1)
                suggestionCont.style.cssText = "display: block;"
            inputBox.style.cssText = "border: 1px solid #1c62b9;";

        })
        inputBox.addEventListener('blur', () => {
            setTimeout(() => {
                suggestionCont.style.cssText = "display: none;";
            }, 100)
            inputBox.style.cssText = "border: 1px solid gray;"
        })


        ////////////////     this part for receive details using inputBox.value    /////////////////

        const searchFun = async () => {
            nowName = inputBox.value;
            console.log(nowName)
            try {
                let res = await fetch(`https://restcountries.com/v3.1/name/${nowName}`);
                let data = await res.json();
                // console.log(data);

                let targetIndex = 0;  // hold The Actual Index is which the inputBox data present
                for (index in data) {
                    if (data[index].name.common == nowName) {
                        targetIndex = index;                 // Some time api send multiple data for an input in array for retrieve the correct value i use it
                        // console.log(data[index].name.common);
                    }
                }


                console.log(`Country Name: ${data[targetIndex].name.common} (${data[targetIndex].cioc})`);
                console.log(`Currency: ${data[targetIndex].currencies[Object.keys(data[targetIndex].currencies)[0]].name} - ${Object.keys(data[targetIndex].currencies)[0]}`);
                console.log(`Capital: ${data[targetIndex].capital}`);
                console.log(`Flag: ${data[targetIndex].flags.svg}`);
                console.log(`Coat Of Arms: ${data[targetIndex].coatOfArms.svg}`);
                console.log(`Population: ${data[targetIndex].population}`);
                console.log(`Continents: ${data[targetIndex].continents[0]}`);
                console.log(`Languages: ${Object.values(data[targetIndex].languages).join(', ')}`);
                console.log(`ISD: ${Object.values(data[targetIndex].idd).join('')}`);
                console.log(`ccTLD: ${data[targetIndex].tld[0]}`);


                countryFlagImage.src = data[targetIndex].flags.svg
                countryName.innerText = `Country Name: ${data[targetIndex].name.common} (${data[targetIndex].cioc})`;




            }
            catch (err) {
                inputBox.value = '';
                window.alert(`Don't find the Country "${nowName}"`);
                console.log(err);
            }
        }
        searchBtn.addEventListener('click', searchFun);





*/