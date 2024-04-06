

let currentsong = new Audio()
let songs;
let playmusic;

function convertToMinuteSeconds(seconds) {
    if(isNaN(seconds) || seconds<0){
        return "00:00"
    }
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Adding leading zeros if necessary
    var minutesString = minutes < 10 ? "0" + minutes : minutes;
    var secondsString = Math.floor(remainingSeconds); // Round off remaining seconds
    secondsString = secondsString < 10 ? "0" + secondsString : secondsString;

    return minutesString + ":" + secondsString;
}


// get the table list of songs
async function getsongs() {
    let a = await fetch("http://140.82.114.4/punisherisback/music-player/tree/main/assets/songs/")

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



    // get the list of songs
   songs = await getsongs()
    console.log(songs)

    // add songs to library
    let songul = document.querySelector(".mysongs").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> <img id = "${song}" src="assets/imgplay.svg" alt="play"> 
        <div class="songname">${song}</div>
        <div>Sahil</div>
        </li>`
    }

   playmusic = (track) => {

        currentsong.src = "/assets/songs/" + track
        currentsong.play()
        playicon.src = "assets/pause.svg"
        // var songplayicon = document.getElementById(track);
        //  songplayicon.src = "assets/music.gif"
        document.querySelector(".songinfo").innerHTML = `${track}`
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
        
    }



    // attach an eventlistner to each song
    Array.from(document.querySelector(".mysongs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {

            console.log(e.getElementsByTagName("div")[0].innerHTML)
            playmusic(e.getElementsByTagName("div")[0].innerHTML)

        })

    })



    // attach an eventlisyner to play, pause and go to the next or previous songs
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            playicon.src = "assets/pause.svg"


        }
        else {
            currentsong.pause()
            playicon.src = "assets/play.svg"



        }
    })
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

// add event listner for current time 
currentsong.addEventListener("timeupdate", () => {
    
    document.querySelector(".songtime").innerHTML = `${convertToMinuteSeconds(currentsong.currentTime)}/${convertToMinuteSeconds(currentsong.duration)}`
    document.querySelector(".seekbar").style.marginLeft = (currentsong.currentTime/currentsong.duration)*100 + "%"
})


// add eventlistner to seekbar container
document.querySelector(".seekbar-container").addEventListener("click", e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 
    document.querySelector(".seekbar").style.marginLeft = percent + "%";
    currentsong.currentTime = (currentsong.duration)*percent/100

})

// add event listner to header icon
document.querySelector(".headericon").addEventListener("click", ()=>{
    document.querySelector(".homeleft").style.left = "0"
})

document.querySelector(".cross").addEventListener("click", ()=>{
    document.querySelector(".homeleft").style.left = "-120%"
})


// add event listner to previous and next 
previous.addEventListener("click", ()=>{
    let index = songs.indexOf(currentsong.src.split("/").slice(-1) [0])
    if ((index-1)>=0)
    playmusic(songs[index+1])
    
})

next.addEventListener("click", ()=>{
   
    let index = songs.indexOf(currentsong.src.split("/").slice(-1) [0])
    if ((index+1)<songs.length)
    playmusic(songs[index+1])
})

main()


