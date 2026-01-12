const allEpisodes = getAllEpisodes();
const root = document.getElementById("root");

function formatEpisodeCode(season, number) {
  return `S${String(season).padStart(2, "0")}E${String(number).padStart(
    2,
    "0"
  )}`;
}
function renderEpisodes(episodes) {
  root.innerHTML = "";

  episodes.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.className = "episode";
    episodeDiv.innerHTML = `
      <h2>${episode.name} (${formatEpisodeCode(
      episode.season,
      episode.number
    )})</h2>
      <img src="${episode.image.medium}" alt="${episode.name}">
      <p>Season: ${episode.season}</p>
      <p>Episode: ${episode.number}</p>
      <div>${episode.summary}</div>
    `;
    root.appendChild(episodeDiv);
  });
}
renderEpisodes(allEpisodes);

const searchInput = document.getElementById("search-input");
const matchCount = document.getElementById("match-count");

function searchEpisodes(searchTerm) {
  const filteredEpisodes = [];

  allEpisodes.forEach((episode) => {
    if (
      episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      filteredEpisodes.push(episode);
    }
  });

  matchCount.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episodes`;

  renderEpisodes(filteredEpisodes);
}

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value;

  if (searchTerm === "") {
    matchCount.textContent = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
    renderEpisodes(allEpisodes);
  } else {
    searchEpisodes(searchTerm);
  }
});

const episodeSelector = document.getElementById("episode-selector");
allEpisodes.forEach((episode) => {
  const option = document.createElement("option");
  option.value = formatEpisodeCode(episode.season, episode.number);
  option.textContent = `${option.value} - ${episode.name}`;
  episodeSelector.appendChild(option);
});

episodeSelector.addEventListener("change", (event) => {
  const selectedEpisodeCode = event.target.value;

  if (selectedEpisodeCode) {
    const selectedEpisodeDiv = Array.from(root.children).find((child) => {
      return child
        .querySelector("h2")
        .textContent.includes(selectedEpisodeCode);
    });

    if (selectedEpisodeDiv) {
      selectedEpisodeDiv.scrollIntoView({ behavior: "smooth" });
    }
  }
});
