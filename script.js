import { resetBoard, getIndexesFromArray, makeLetterContainers } from "./modules/_misc.js";
import { getGuessingWord } from "./modules/_api.js";

const hiddenWordContainer = document.querySelector("#hidden_word");
const buttons = document.querySelectorAll(".letter_button");
const titleContainer = document.querySelector(".title");
const playAgain = document.querySelector(".play_again");
const h3 = document.createElement("h3");
const hangmanHead = document.querySelector("#hangman_head");
const hangmanBody = document.querySelector("#hangman_body");
const hangmanLeftArm = document.querySelector("#hangman_left_arm");
const hangmanRightArm = document.querySelector("#hangman_right_arm");
const hangmanLeftLeg = document.querySelector("#hangman_left_leg");
const hangmanRightLeg = document.querySelector("#hangman_right_leg");
const hangmanRope = document.querySelector("#rope");

const hangmanArray = [ hangmanRope, hangmanHead, hangmanBody, hangmanLeftArm, hangmanRightArm, hangmanLeftLeg, hangmanRightLeg];

playAgain.addEventListener("click", run);

async function run() {
  resetBoard(h3, hiddenWordContainer, buttons);
  const word = (await getGuessingWord()).toUpperCase();
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    const div = document.createElement("div");
    makeLetterContainers(div, i, hiddenWordContainer);
  }

  titleContainer.appendChild(h3);
  h3.innerText = `Length of the word you are trying to guess is ${word.length}`;

  const wordArray = Array.from(word);
  const triesLeft = 5;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const letter = button.innerText;

      let indexes = getIndexesFromArray(wordArray, letter);

      button.setAttribute("disabled", true);

      indexes.forEach((item) => {
        const myItem = document.querySelector(`#letter_${item}`);
        if (!myItem) {
          const removedItem = hangmanArray.shift();
          removedItem.classList.remove('hide');
          console.log(hangmanArray);
          console.log(removedItem);
        } else if (myItem) {
        myItem.classList.remove("hidden");
        myItem.innerText = word[item].toUpperCase();
        console.log(word[item]);
        myItem.classList.add("correct");
        }
      });
    }, {once: true});
  });
}


