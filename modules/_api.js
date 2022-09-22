const API = "https://random-word-api.herokuapp.com/word";

function getData() {
  return fetch(API).then((response) => response.json());
}

async function getGuessingWord() {
  const data = await getData();
  console.log(data);
  return data.toString();
}

export { getGuessingWord };
