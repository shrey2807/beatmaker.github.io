class Drumkit {
    constructor() {
        this.isPlaying = null;
        this.notes = document.querySelectorAll('.note');
        this.playBtn = document.querySelector('.playBtn');
        this.kickAudio = document.querySelector('.kick-audio');
        this.snareAudio = document.querySelector('.snare-audio');
        this.hihatAudio = document.querySelector('.hihat-audio');
        this.sequences = document.querySelector('.sequences');
        this.muteBtn = document.querySelectorAll('.mute');
        this.index = 0;
        this.rate = 180;
    }

    repeat() {
        let step = this.index % 10;
        let activeNotes = document.querySelectorAll(`.n${step}`);
        activeNotes.forEach(note => {
            note.style.animation = `playing 0.3s alternate ease-in-out 2`;
            note.addEventListener('animationend', () => {
                note.style.animation = '';
            })
            if (note.classList.contains('kick-selected') && !this.muteBtn[0].classList.contains('isMuted')) {
                this.kickAudio.currentTime = 0;
                this.kickAudio.play();
            }
            else if (note.classList.contains('snare-selected') && !this.muteBtn[1].classList.contains('isMuted')) {
                this.snareAudio.currentTime = 0;
                this.snareAudio.play();
            }
            else if (note.classList.contains('hihat-selected') && !this.muteBtn[2].classList.contains('isMuted')) {
                this.hihatAudio.currentTime = 0;
                this.hihatAudio.play();
            }
        });
        this.index++;
    }

    start() {
        let interval = 60 / this.rate * 1000;
        this.isPlaying = setInterval(() => {
            this.repeat();
        }, interval);
    }

    updateBtn() {
        // if isPlaying is null, it will execute if (when it was not eing played, and the play btn is clicked)
        if (!this.isPlaying) {
            this.index = 0;
            this.playBtn.innerText = 'Stop';
            this.start();
        }
        else {
            clearInterval(this.isPlaying);
            this.playBtn.innerText = 'Play';
            this.isPlaying = null;
        }
    }
}


const drumkit = new Drumkit;

// EVENT LISTENERS
drumkit.playBtn.addEventListener('click', function () {
    drumkit.updateBtn();
});

drumkit.sequences.addEventListener('click', (e) => {
    if (e.target.classList.contains('kick-note')) {
        if (e.target.classList.contains('kick-selected'))
            e.target.classList.remove('kick-selected');
        else
            e.target.classList.add('kick-selected');
    }
    else if (e.target.classList.contains('snare-note')) {
        if (e.target.classList.contains('snare-selected'))
            e.target.classList.remove('snare-selected');
        else
            e.target.classList.add('snare-selected');
    }
    else if (e.target.classList.contains('hihat-note')) {
        if (e.target.classList.contains('hihat-selected'))
            e.target.classList.remove('hihat-selected');
        else
            e.target.classList.add('hihat-selected');
    }
    else if (e.target.classList.contains('mute')) {
        if (e.target.classList.contains('isMuted'))
            e.target.classList.remove('isMuted');
        else {
            e.target.classList.add('isMuted');
        }
    }
})

