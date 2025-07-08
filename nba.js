const input = document.querySelector('input[name="q"]');
const suggestions = document.getElementById("suggestions");
const playerInfo = document.getElementById("playerInfo");

// Show suggestions as you type
input.addEventListener("input", () => {
    const query = input.value.trim();

    if (query.length === 0) {
        suggestions.innerHTML = "";
        playerInfo.innerHTML = "";
        return;
    }

    fetch(`https://api-nba-v1.p.rapidapi.com/players?search=${query}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b49e4c715fmshbd83223ed76921cp12465ejsn96a5e59db8c7',
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    .then(res => res.json())
    .then(data => {
        suggestions.innerHTML = "";

        data.response.slice(0, 5).forEach(player => {
            const div = document.createElement("div");
            div.textContent = `${player.firstname} ${player.lastname}`;
            div.onclick = () => {
                input.value = div.textContent;
                suggestions.innerHTML = "";
                showPlayerInfo(player); // Show on page
            };
            suggestions.appendChild(div);
        });
    })
    .catch(() => {
        suggestions.innerHTML = "<div>Error loading players</div>";
    });
});

// Show player info below
function showPlayerInfo(player) {
    const name = `${player.firstname} ${player.lastname}`;
    const team = player.team?.name || "N/A";
    const position = player.leagues?.standard?.pos || "N/A";

    playerInfo.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Team:</strong> ${team}</p>
        <p><strong>Position:</strong> ${position}</p>
    `;
}
