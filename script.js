const API = "https://random-word-api.herokuapp.com/word";
const hiddenWordContainer = document.querySelector("#hidden_word");
const buttons = document.querySelectorAll(".letter_button");
const titleContainer = document.querySelector(".title");

function getData() {
  return fetch(API).then((response) => response.json());
}

function run() {
  // viena funkcija kuri atliks visus veiksmus, zodi padeti i konstanta, ir tada loopinti/appendinti atspeta raide
}

async function getGuessingWord() {
  const data = await getData();
  return data.toString();
}

async function hideWord() {
  const guessingWord = await getGuessingWord();
  for (let i = 0; i < guessingWord.length; i++) {
    const div = document.createElement("div");
    hiddenWordContainer.appendChild(div);
    div.classList.add("letter");
    div.setAttribute("id", `letter_${i}`);
    div.innerText = guessingWord.charAt(i);
    div.classList.add("hidden");
    div.style.fontWeight = "bold";
    div.style.fontSize = "35px";
    div.style.color = "#1A1A1A";
  }

  const h3 = document.createElement("h3");
  titleContainer.appendChild(h3);
  h3.innerText = `Length of the word you are trying to guess is ${guessingWord.length}`;

  console.log(guessingWord);
}

function checkLetter(e) {
  const getWord = hiddenWordContainer.innerText;
  const fixWord = getWord.replace(/(\r\n|\n|\r)/gm, "");
  const wordArray = Array.from(fixWord);
  const letter = e.target.innerText;
  let indexes = [],
    i = -1;
  while ((i = wordArray.indexOf(letter, i + 1)) != -1) {
    indexes.push(i);
  }

  indexes.forEach((item) => {
    if (document.querySelector(`#letter_${item}`)) {
      document.querySelector(`#letter_${item}`).classList.remove("hidden");
    } else {
      return;
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", checkLetter);
});

hideWord();
