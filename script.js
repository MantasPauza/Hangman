import {
  resetBoard,
  getIndexesFromArray,
  makeLetterContainers,
  createLetterButtons,
  resetBody,
} from "./modules/_misc.js";
import { getGuessingWord } from "./modules/_api.js"; // importing all misc functions, api data and constants from modules
import {
  alphabet,
  hiddenWordContainer,
  buttons_container,
  titleContainer,
  playAgain,
  h3,
  hangmanHead,
  hangmanBody,
  hangmanLeftArm,
  hangmanRightArm,
  hangmanLeftLeg,
  hangmanRightLeg,
  hangmanRope,
} from "./modules/_consts.js";



let hangmanArray = [
  hangmanRope,
  hangmanHead,
  hangmanBody,
  hangmanLeftArm,
  hangmanRightArm,
  hangmanLeftLeg,
  hangmanRightLeg,
];

playAgain.addEventListener("click", run);

async function run() {
  resetBody(hangmanArray); // im reseting hangman body to make it invisible again
  buttons_container.innerHTML = ""; // reseting buttons container to prevent double appending buttons
  createLetterButtons(alphabet, buttons_container); // creating buttons for each alphabet letter
  const buttons = document.querySelectorAll(".letter_button"); // and selecting them

  resetBoard(h3, hiddenWordContainer, buttons); // reseting board to get ready for next round

  const word = (await getGuessingWord()).toUpperCase(); // getting the word from api

  for (let i = 0; i < word.length; i++) { // creating divs for each letter of given word and making it invisible
    const div = document.createElement("div");
    makeLetterContainers(div, i, hiddenWordContainer);
  }

  titleContainer.appendChild(h3);
  h3.innerText = `Length of the word you are trying to guess is ${word.length}`; // reseting hint

  const wordArray = Array.from(word); // making an array from given word 
  let triesLeft = 7;

  buttons.forEach((button) => { // for each selected letter im itterating through the word array and checking if selected letter is in my word
    button.addEventListener(
      "click",
      () => {
        const letter = button.innerText;

        if (triesLeft === 1) { // if you had last try left, i reveal the last part of the hangman, change the hint to game over text and disabling all buttons
          hangmanRightLeg.classList.remove("hide");
          triesLeft--;
          h3.innerText = "You have died!";
          buttons.forEach((button) => {
            button.setAttribute("disabled", true);
          });
          hangmanArray = [ // after game over, i reset the hangmanArray to get ready for the next round
            hangmanRope,
            hangmanHead,
            hangmanBody,
            hangmanLeftArm,
            hangmanRightArm,
            hangmanLeftLeg,
            hangmanRightLeg,
          ];
        }

        let indexes = getIndexesFromArray(wordArray, letter); // if selected letter is in my word im getting indexes of them

        button.setAttribute("disabled", true);

        if (indexes.length < 1) { // and if there are no returned indexes, i count it as a failure and reveal one hangman body part
          const removedItem = hangmanArray.shift();
          triesLeft--;
          removedItem.classList.remove("hide");
        }

        indexes.forEach((item) => { // from returned indexes, i check where that letter is in my word and append the letter to given index
          const myItem = document.querySelector(`#letter_${item}`);
          if (!myItem) {  
            return;
          } else if (myItem) {
            myItem.classList.remove("hidden");
            myItem.innerText = word[item].toUpperCase();
            console.log(word[item]);
            myItem.classList.add("correct");
            return;
          }
        });
      },
      { once: true }
    );
  });
}
