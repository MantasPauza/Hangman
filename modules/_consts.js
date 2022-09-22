const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const hiddenWordContainer = document.querySelector("#hidden_word");
const buttons_container = document.querySelector(".buttons_container");
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

export { alphabet, hiddenWordContainer, buttons_container, titleContainer, playAgain, h3, hangmanHead, hangmanBody, hangmanLeftArm, hangmanRightArm,  hangmanLeftLeg, hangmanRightLeg, hangmanRope };