
// get the table list of songs
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/assets/songs/")

    let response = await a.text()



    // now parse the tables and get only songs
    let div = document.createElement("div")
    div.innerHTML = response

    // using for loop to select only those links which ends with .mp3 then pusing them in "songs" array

    let as = div.getElementsByTagName("a")
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs

}
async function main() {
    let songs = await getsongs()
    console.log(songs)

    // add songs to library
    let songul = document.querySelector(".mysongs").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> <img src="assets/imgplay.svg" alt="play"> 
        <div class="songname"> ${song}</div>
        <div>Sahil</div>
        </li>`
    }
    // play songs
    var audio = new Audio(songs[1])
    audio.play()

    audio.addEventListener("loadeddata", () => {
        let duration = audio.duration
        let currentsrc = audio.currentSrc
        let currenttime = audio.currentTime
        console.log(duration, currentsrc, currenttime)
    })
}
main()


