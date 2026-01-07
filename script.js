const allEpisodes = getAllEpisodes();
const root = document.getElementById("root");

function formatEpisodeCode(season, number) {
  return `S${String(season).padStart(2, "0")}E${String(number).padStart(2, "0")}`;
}

allEpisodes.forEach((episode) => {
  const episodeDiv = document.createElement("div");
  episodeDiv.className = "episode";

  episodeDiv.innerHTML = `
    <h2>${episode.name} (${formatEpisodeCode(episode.season, episode.number)})</h2>
    <img src="${episode.image.medium}" alt="${episode.name}">
    <p>Season: ${episode.season}</p>
    <p>Episode: ${episode.number}</p>
    <div>${episode.summary}</div>
  `;

  root.appendChild(episodeDiv);
});
