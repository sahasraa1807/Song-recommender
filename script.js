const API_KEY = "637f72e589345f69b5e73d92f7e71380"; 

async function fetchSongs() {
    let query = document.getElementById("searchInput").value;
    if (!query) {
        alert("Please enter a mood or genre!");
        return;
    }

    let url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${query}&api_key=${API_KEY}&format=json`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        displaySongs(data.tracks.track);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displaySongs(songs) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (songs.length === 0) {
        resultsDiv.innerHTML = "<p> sorry! No results found. </p>";
        return;
    }

    songs.forEach(song => {
        let songElement = document.createElement("div");
        songElement.classList.add("song");
        songElement.innerHTML = `
            <h3>${song.name} - ${song.artist.name}</h3>
            <a href="${song.url}" target="_blank">Listen</a>
        `;
        resultsDiv.appendChild(songElement);
    });
}
