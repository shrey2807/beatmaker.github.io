class Drumkit {
    constructor() {
        this.isPlaying = null;
        this.notes = document.querySelectorAll('.note');
        this.playBtn = document.querySelector('.playBtn');
        this.allAudio = document.querySelectorAll('audio');
        this.kickSelect = document.querySelector('#kick-select');
        this.allSelect = document.querySelectorAll('.options');
        this.allh1 = document.querySelectorAll('.allh1');
        this.sequences = document.querySelector('.sequences');
        this.muteBtn = document.querySelectorAll('.mute');
        this.index = 0;
        this.slider = document.querySelector('.slider');
        this.rate;
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
                this.allAudio[0].currentTime = 0;
                this.allAudio[0].play();
            }
            if (note.classList.contains('snare-selected') && !this.muteBtn[1].classList.contains('isMuted')) {
                this.allAudio[1].currentTime = 0;
                this.allAudio[1].play();
            }
            if (note.classList.contains('hihat-selected') && !this.muteBtn[2].classList.contains('isMuted')) {
                this.allAudio[2].currentTime = 0;
                this.allAudio[2].play();
            }
            if (note.classList.contains('s1selected') && !this.muteBtn[3].classList.contains('isMuted')) {
                this.allAudio[3].currentTime = 0;
                this.allAudio[3].play();
            }
            if (note.classList.contains('s2selected') && !this.muteBtn[4].classList.contains('isMuted')) {
                this.allAudio[4].currentTime = 0;
                this.allAudio[4].play();
            }
        });
        this.index++;
    }

    start() {
        let interval = 60 / this.slider.value * 1000;
        console.log(this.slider.value);
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

    allOptions(x) {
        this.allh1[x].innerText = this.allSelect[x].children[this.allSelect[x].selectedIndex].innerText;
        this.allAudio[x].src = this.allSelect[x].value;
    }

    tempo() {
        document.querySelector('.bpm').innerText = `BPM: ${this.slider.value}`;
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.start();
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
    else if (e.target.classList.contains('sound1')) {
        if (e.target.classList.contains('s1selected'))
            e.target.classList.remove('s1selected');
        else
            e.target.classList.add('s1selected');
    }
    else if (e.target.classList.contains('sound2')) {
        if (e.target.classList.contains('s2selected'))
            e.target.classList.remove('s2selected');
        else
            e.target.classList.add('s2selected');
    }
    else if (e.target.classList.contains('mute')) {
        if (e.target.classList.contains('isMuted'))
            e.target.classList.remove('isMuted');
        else {
            e.target.classList.add('isMuted');
        }
    }
})

drumkit.allSelect.forEach((select, index) => {
    select.addEventListener('change', () => {
        drumkit.allOptions(index - 1);
    })
    index++;
})

drumkit.slider.addEventListener('input', () => {
    drumkit.tempo();
})



