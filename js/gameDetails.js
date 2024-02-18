import { UI } from "./UI.js";

export class GameDetails {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });
    this.loading = document.querySelector(".loading");
    this.displayGameDetails(id);
  }

  async displayGameDetails(id) {
    this.loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8d89f1e3b5msh0d2f1e87f267d86p1b923fjsnc626d19521d3",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const response = await api.json();
    this.loading.classList.add("d-none");
    new UI().displayGameDetails(response);
  }
}
