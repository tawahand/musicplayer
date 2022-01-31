
const music = document.querySelector('audio');
const img = document.querySelector('img');
const play = document.getElementById('play');


const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration-tt');
let current_time = document.getElementById('current-time');

let progress_div = document.getElementById('progress_div');

const songs =[
{
	name:"naat1",
	title:"Kalam e Raza",
	artist:"Tahir Qadri",
},
{
	name:"naat2",
	title:"Kalam e Sufia",
	artist:"Anas Qadri",
},
{
	name:"rizvi3",
	title:"Rizvi Bayan",
	artist:"Khadim Rizvi",
},
];
let isPlaying = false;

/*FOR PLAY FUNCTION*/

const playMusic= () =>{
	isPlaying = true;
	music.play();
	

	play.classList.replace('fa-play',"fa-pause");
	img.classList.add("anime");
};

/*FOR PAUSE FUNCTION*/

const 	pauseMusic= () =>{
	isPlaying = false;
	music.pause();
	

	play.classList.replace('fa-pause',"fa-play");
	img.classList.remove("anime");
};
play.addEventListener('click' , () => {
	/*if(isPlaying){
		pauseMusic();
	}else{
		playMusic();
	}*/
	isPlaying ? pauseMusic() : playMusic();
});

/*CHANGING THE MUSIC DATA*/

const loadSong = (songs) =>{
	title.textContent = songs.title;
	artist.textContent = songs.artist;
	music.src = "" +songs.name + ".mp3";
	img.src = "" +songs.name + ".jpg";
} 


songIndex=0;


const nextSong = () =>{
songIndex = (songIndex + 1) % songs.length;

loadSong(songs[songIndex]);
playMusic();
}
const prevSong = () =>{
songIndex = (songIndex - 1 + songs.length) % songs.length;

loadSong(songs[songIndex]);
playMusic();
};

/*PROGRESS BAR JS CODDING*/

music.addEventListener("timeupdate", (event) => {
	const{currentTime,duration} = event.srcElement;
	let progress_time = (currentTime / duration) * 100;
	progress.style.width = `${progress_time}%`;

	/*MUSIC DURATION UPDATE*/
	
	let min_duration = Math.floor(duration / 60);
	let sec_duration = Math.floor(duration % 60);
	let tot_duration= `${min_duration}:${sec_duration}`;
	if(duration){
		total_duration.textContent = `${tot_duration}`;
	}
	
	/*MUSIC CURRENT TIME UPDATE*/
	
	let min_current_time = Math.floor(currentTime / 60);
	let sec_current_time = Math.floor(currentTime % 60);
	if(sec_current_time < 10){

	sec_current_time = `0${sec_current_time}`;		

	}

	let tot_current_time= `${min_current_time}:${sec_current_time}`;
	current_time.textContent = `${tot_current_time}`;
	


});

	/*FOR TUCH PROGRESS BAR*/
	progress_div.addEventListener('click',(event) => {
		const{duration} = music;

		let move_progress = event.offsetX/event.srcElement.clientWidth *duration;
		console.log(move_progress);
		music.currentTime = move_progress;

	});


/*FOR NEXT SONG*/

music.addEventListener('ended',nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
/*Event.srcElement*/
