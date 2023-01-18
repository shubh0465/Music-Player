console.log("Welcome")

//Initializing Variables
let songIndex = 0;
let audioElement = new Audio("Songs/1.mp3")
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("playingGif")
let songItems = Array.from(document.getElementsByClassName('songItem'))
let playingSongName = document.getElementById('playingSongName')


let songs = [
    {songName:"Apna Bana Le - Arijit Singh", filePath:"Songs/1.mp3", coverPath: "Covers/1.jpg"},
    {songName:"Tu Maan Meri Jaan - King", filePath:"Songs/2.mp3", coverPath: "Covers/2.jpg"},
    {songName:"Todh - Prince Narula", filePath:"Songs/3.mp3", coverPath: "Covers/3.jpg"},
    {songName:"Ram Darshan - Narci", filePath:"Songs/4.mp3", coverPath: "Covers/4.jpg"},
    {songName:"Excuses - AP Dhillon", filePath:"Songs/5.mp3", coverPath: "Covers/5.jpg"},
]
// audioElement.play();
// console.log(songItems)
songItems.forEach((element,i) => {
    // console.log(element,i);
    // console.log(element.getElementsByTagName("img"))
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    // console.log(element.getElementsByClassName("songName"))
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause'); 
        gif.style.opacity=1;
        playingSongName.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play'); 
        gif.style.opacity=0;
        playingSongName.style.opacity=0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlayButton = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
        makeAllPlayButton();
        songIndex = parseInt(e.target.id);
        playingSongName.innerText = songs[songIndex-1].songName;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `Songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        playingSongName.style.opacity=1;
    })
});
document.getElementById("next").addEventListener('click',()=>{
    if(songIndex<5){
        songIndex+=1;
    }
    else{
        songIndex=1;
    }
    playingSongName.innerText = songs[songIndex-1].songName;
    audioElement.src = `Songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    playingSongName.style.opacity=1;
})
document.getElementById("previous").addEventListener('click',()=>{
    if(songIndex>1){
        songIndex-=1;
    }
    else{
        songIndex=5;
    }
    playingSongName.innerText = songs[songIndex-1].songName;
    audioElement.src = `Songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    playingSongName.style.opacity=1;
})