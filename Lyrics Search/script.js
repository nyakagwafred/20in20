const apiURL = "https://api.lyrics.ovh";

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

//Search function

const searchSongs = (term) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Origin", "http://localhost:3000");

  fetch(`${apiURL}/suggest/${term}`, {
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

//Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please enter serach term");
  } else {
    searchSongs(searchTerm);
  }
});
