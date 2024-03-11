setInterval(() => {
  location.reload(true);
}, 5000); // 110 seconds in milliseconds

function fetchLeaderboardData() {
  fetch("../js/storeleaderboard.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log("Leaderboard data updated:", data);
      playerNameInput.value = "";

      updateLeaderboard();
      location.reload(true);
    })
    .catch((error) => {
      console.error("There was a problem updating leaderboard data:", error);
    });
}

function updateLeaderboard() {
  fetch("../js/leaderboardData.json")
    .then((response) => response.json())
    .then((leaderboardData) => {
      const leaderboardContainer = document.querySelector(".leaderboard-data");
      leaderboardContainer.innerHTML = "";

      leaderboardData.forEach((entry, index) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("item");

        const playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add("leaditem");
        playerNameDiv.textContent = entry.name;

        const scoreDiv = document.createElement("div");
        scoreDiv.classList.add("right");
        scoreDiv.textContent = entry.score;

        playerNameDiv.appendChild(scoreDiv);
        newEntry.appendChild(playerNameDiv);

        leaderboardContainer.appendChild(newEntry);
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}

updateLeaderboard();

function renderLeaderboard() {
  fetch("../js/leaderboardData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((leaderboardData) => {
      leaderboardData.sort((a, b) => b.score - a.score);

      const leaderboardContainer = document.querySelector(".list");
      leaderboardContainer.innerHTML = "";

      leaderboardData.forEach((entry, index) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("item");

        const playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add("leaditem");
        playerNameDiv.textContent = entry.name;

        const scoreDiv = document.createElement("div");
        scoreDiv.classList.add("right");
        scoreDiv.textContent = entry.score;

        playerNameDiv.appendChild(scoreDiv);
        newEntry.appendChild(playerNameDiv);

        leaderboardContainer.appendChild(newEntry);
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}

renderLeaderboard();

function updateLeaderboardData(updatedData) {
  fetch("../js/leaderboardData.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    })
    .then((data) => {
      renderLeaderboard();
    })
    .catch((error) => {
      console.error("There was a problem updating leaderboard data:", error);
    });
}

renderLeaderboard();
