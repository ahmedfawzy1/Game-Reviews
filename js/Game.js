import { UI } from "./UI.js";
import { GameDetails } from "./gameDetails.js";

export class Game {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);
        const category = link.getAttribute("data-category");
        this.getGames(category);
      });
    });
    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");
    this.UI = new UI();
    this.getGames("MMORPG");
  }

  changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getGames(category) {
    this.loading.classList.remove("d-none");
    const option = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8d89f1e3b5msh0d2f1e87f267d86p1b923fjsnc626d19521d3",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      option
    );
    const response = await api.json();
    this.loading.classList.add("d-none");
    this.UI.displayGames(response);

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");
        new GameDetails(card.dataset.id);
      });
    });
  }
}
