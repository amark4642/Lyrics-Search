

const apiUrl = `https://api.lyrics.ovh`;
var searchBox, artist, title;



async function searchSongs() {
    searchBox = document.getElementById("input-id").value;
    const res = await fetch(`${apiUrl}/suggest/${searchBox}`);
    if (res.status !== 200) {
        if (!res.ok) {
            prompt("Not Found !", "Please enter a valid song or artist name !");
            return;
        }
        if (res.status >= 400) {
            prompt("Not Found !", "No such song in the database ! Sorry !")
        }
    }
    else {
    const data = await res.json();
    const arrayData = data.data;
    title = arrayData[0].title;
    artist = arrayData[0].artist.name;
    write(arrayData);
}
}


function write(data)
{
    document.getElementById("result").innerHTML =
        `<span><h2>${data[0].title} - ${data[0].artist.name}</span> - <button id="newButton">Get Lyrics</button>`;
        document.getElementById("newButton").addEventListener("click", getLyrics);
                
}

async function getLyrics() {
    const res = await fetch(`${apiUrl}/v1/${artist}/${title}`);
    if (res.status >= 400) {
        prompt("Not Found !", "No such song in the database ! Sorry !");
        return;
    }
    else {
        const data = await res.json();
        document.getElementById("result").innerHTML =
            `<span><div>Lyrics of - "<strong>${searchBox}</strong>"</div><br>${data.lyrics}</span>`;
    }
}

document.getElementById("button-id").addEventListener("click", searchSongs);



