function resetBoard(elem1, elem2, elem3) {
    elem1.innerText = "";
    elem2.innerText = "";
  
    elem3.forEach((elem) => {
        elem.removeAttribute("disabled");
    });
  }
  
  function getIndexesFromArray(arr, letr) {
    return arr.reduce((indexesArray, currentLetter, i) => {
      if (currentLetter === letr) {
        indexesArray.push(i);
      } else {
        indexesArray = [false];
      }
      return indexesArray;
    }, []);
  }
  
  function makeLetterContainers(item, index, container) {
    item.classList.add("letter");
    item.setAttribute("id", `letter_${index}`);
    item.innerText = " ";
    item.classList.add("hidden");
    container.appendChild(item);
  }


export { resetBoard, getIndexesFromArray, makeLetterContainers }