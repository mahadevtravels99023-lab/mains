// Sample Live Sports Data (Cleaned of any betting/points odds)
const matches = [
    {
        id: 1,
        sport: "Football",
        teamA: "Team Alpha",
        teamB: "Team Beta",
        scoreA: 2,
        scoreB: 1,
        status: "Live (75')",
    },
    {
        id: 2,
        sport: "Basketball",
        teamA: "Lions",
        teamB: "Tigers",
        scoreA: 88,
        scoreB: 92,
        status: "Live (Q4)",
    },
    {
        id: 3,
        sport: "Tennis",
        teamA: "Player One",
        teamB: "Player Two",
        scoreA: "6, 4",
        scoreB: "3, 6",
        status: "Set 3",
    }
];

function renderScores() {
    const container = document.getElementById("scores-container");
    container.innerHTML = "";

    matches.forEach(match => {
        const card = document.createElement("div");
        card.className = "score-card";
        card.innerHTML = `
            <div class="match-header">
                <span class="sport-label">${match.sport}</span>
                <span class="status-badge">${match.status}</span>
            </div>
            <div class="match-body">
                <div class="team">
                    <span class="team-name">${match.teamA}</span>
                    <span class="team-score">${match.scoreA}</span>
                </div>
                <div class="team">
                    <span class="team-name">${match.teamB}</span>
                    <span class="team-score">${match.scoreB}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderScores);
