function resetBoard(elem1, elem2, elem3) { // function to reset the board
  elem1.innerHTML = " ";
  elem2.innerText = " ";

  elem3.forEach((elem) => { // and remove disabled attributes from the buttons
    elem.removeAttribute("disabled");
  });
}

function createLetterButtons(arr, container) { // function to create the buttons from alphabet
  arr.forEach((item) => {
    const createButton = document.createElement("button");
    createButton.classList.add("letter_button");
    container.appendChild(createButton).innerText = item;
  });
}

function makeLetterContainers(item, index, container) { // function to create the containers for each letter from given word
  item.classList.add("letter");
  item.setAttribute("id", `letter_${index}`);
  item.innerText = " ";
  item.classList.add("hidden");
  container.appendChild(item);
}

function resetBody(arr) { // function to reset the hangman body to be invisible again
  arr.forEach((item) => {
    item.classList.add("hide");
  });
}

function getIndexesFromArray(arr, letr) { // function to get the indexes of selected letter in given word array
  return arr.reduce((indexesArray, currentLetter, index) => {
    if (currentLetter === letr) {
      indexesArray.push(index);
    } else {
      return indexesArray;
    }
    return indexesArray;
  }, []);
}

export {
  resetBoard,
  getIndexesFromArray,
  makeLetterContainers,
  createLetterButtons,
  resetBody,
};
