const API = "https://random-word-api.herokuapp.com/word";
const hiddenWordContainer = document.querySelector("#hidden_word");
const buttons = document.querySelectorAll(".letter_button");

async function hideWord() {
  const guessingWord = await getGuessingWord();
  for (let i = 0; i < guessingWord.length; i++) {
    const div = document.createElement("div");
    hiddenWordContainer.appendChild(div);
    div.classList.add('letter');
    div.setAttribute('id', `letter_${i}`);
    div.innerText = guessingWord.charAt(i);
    div.classList.add("hidden");
  }

  console.log(guessingWord);
}



hideWord();

function getData() {
  return fetch(API).then((response) => response.json());
}

async function getGuessingWord() {
  const data = await getData();
  return data.toString();
}

getGuessingWord();

function checkLetter(e) {
    const getWord = hiddenWordContainer.innerText;
    const fixWord =  getWord.replace(/(\r\n|\n|\r)/gm, "");
    const wordArray = Array.from(fixWord);
    const letter = e.target.innerText;
    let indexes = [], i = -1;
    while ((i = wordArray.indexOf(letter, i+1)) != -1){
        indexes.push(i);
    }

    indexes.forEach((item)=> {
        document.querySelector(`#letter_${item}`).classList.remove('hidden');
    })

    /* forEach(letters, (item) => {
        if (item.innerText === letter) {
            console.log('yes');
        }
        }); */
    console.log(indexes);
    console.log(wordArray);

    
};

buttons.forEach(button => {
    button.addEventListener("click", checkLetter);
});
