interface AudioPlayer {
    volume: number; // 0 to 100
    songDuration: number; // in seconds
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    volume: 90,
    songDuration: 36,
    song: 'Mess',
    details: {
        author: 'Ed Sheeran',
        year: 2015,
    },
};

const { volume, songDuration: song, details } = audioPlayer; // ? Destructuring audioPlayer and **renaming** songDuration to song
const { author } = details; // ? Destructuring details to get author

// console.log('Volume:', volume);
// console.log('Song Duration:', song);
// console.log('Author:', author);


const dbz: string[] = ['Goku', 'Vegeta'];
// const [p1, p2, trunks] = dbz; // ? Destructuring array
 const [,, trunks = 'No exist'] = dbz; // ? Destructuring array with default value for trunks
// const [,, trunks] = dbz; // ? Skipping elements in array destructuring
console.log('Personaje 3:', trunks);
