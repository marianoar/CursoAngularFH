
interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "qwerty",
    details: {
        author: "Shakira",
        year:2009
    }
}

const {song: songDes, songDuration: duration, details: {author: autor}} = audioPlayer; // name variable a desescructurar : nuevo nombre

// const {author: autor} =  audioPlayer.details;
console.log(songDes, duration, autor);

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
console.log( 'Personaje tercero: ', dbz[2]);

const [ , , p3] = dbz; //

console.log("personaje 3: ", p3);