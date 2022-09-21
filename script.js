const API = "https://random-word-api.herokuapp.com/word";
const hiddenWordContainer = document.querySelector("#hidden_word");
const buttons = document.querySelectorAll(".letter_button");
const titleContainer = document.querySelector(".title");
const playAgain = document.querySelector(".play_again");
const h3 = document.createElement("h3");
const hangManHead = document.querySelector("#hangman_head");
function getData() {
  return fetch(API).then((response) => response.json());
}

playAgain.addEventListener("click", run);

async function run() {
  resetBoard(h3, hiddenWordContainer);
  const word = (await getGuessingWord()).toUpperCase();
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    const div = document.createElement("div");
    hiddenWordContainer.appendChild(div);
    div.classList.add("letter");
    div.setAttribute("id", `letter_${i}`);
    div.innerText = " ";
    div.classList.add("hidden");
    div.style.fontWeight = "bold";
    div.style.fontSize = "35px";
    div.style.color = "#1A1A1A";
  }

  titleContainer.appendChild(h3);
  h3.innerText = `Length of the word you are trying to guess is ${word.length}`;
  /* console.log(word); */

  const wordArray = Array.from(word);
  const triesLeft = 5;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const letter = button.innerText;
      let indexes = [], 
      i = -1;
      while ((i = wordArray.indexOf(letter, i + 1)) != -1) {
        indexes.push(i);
        console.log(indexes);
        console.log(word);
        console.log(wordArray);
      }
      button.setAttribute("disabled", true);

      indexes.forEach((item) => {
        if (document.querySelector(`#letter_${item}`)) {
          document.querySelector(`#letter_${item}`).classList.remove("hidden");
          document.querySelector(`#letter_${item}`).innerText =
            word[item].toUpperCase();
          document.querySelector(`#letter_${item}`).classList.add("correct");
        } else {
          return;
        }
      });
    });
  });
}
async function getGuessingWord() {
  const data = await getData();
  return data.toString();
}

function resetBoard(elem1, elem2) {
  elem1.innerText = "";
  elem2.innerText = "";
  buttons.forEach((button) => {
    button.removeAttribute('disabled');
  })
}
