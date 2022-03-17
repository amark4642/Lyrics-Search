

const apiUrl = `https://api.lyrics.ovh`;
//  searchBox, artist, title;



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
        // title = arrayData[0].title;
        // artist = arrayData[0].artist.name;
        write(arrayData);
    }
}

var resultList = "";
function write(data) {
    let temp = "";
    for (let i = 0; i < data.length; i++) {
        const a = data[i].artist.name;
        const b = data[i].title;
        // console.log(data[i].artist.name,data[i].title);
        // temp = temp + `<li>${data[i].title}-${data[i].artist.name}-<button onclick="getLyrics(${data[i].artist.name},${data[i].title})" class="myButton" id="${i}">Get Lyrics</button></li>`
        temp = temp + `<div id="x"><div class="a">${data[i].title}-${data[i].artist.name}</div><div class="b"><button onclick="getLyrics('${a}','${b}')" class="myButton">Get Lyrics</button></div></div></li>`        
    }
    resultList = temp;
    document.getElementById("result").innerHTML = `<p class="temp">Search results for<strong> " ${searchBox} " :-</strong><hr><br></p>${temp}<button class="backbtn" onclick="goBack()">Back</button>`;

}

function goBack()
{
    document.getElementById("result").innerHTML = `Results will be displayed here..`;
}

function goBacktoResult(temp)
{
    document.getElementById("result").innerHTML = `${resultList}<br><button class="backbtn" onclick="goBack()">Back</button>`;
}

async function getLyrics(artist,title) {
    console.log(artist, title);
    const res = await fetch(`${apiUrl}/v1/${artist}/${title}`);
    if (res.status >= 400) {
        prompt("Not Found !", "No such song in the database ! Sorry !");
        return;
    }
    else {
        const data = await res.json();
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        document.getElementById("result").innerHTML =
            `<span><div><p class="temp">Lyrics of - <strong>" ${searchBox} "</strong></p></div><br>${lyrics}</span><br><button class="backbtn" onclick="goBacktoResult()">Back</button>`;
    }
}

document.getElementById("button-id").addEventListener("click", searchSongs);



