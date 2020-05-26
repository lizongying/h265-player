import '../css/content.css';
import './lib/common';
import './lib/pcm-player';
import './lib/webgl';
import './lib/player';

window.onload = () => {
    let url = '';
    const home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAXUlEQVR4AWMY5uD///8yQLwfiJ8DMQdU7DwQr4eyJYD4OxDnQ/n+/xGgHtmgcrgwpmIDKL8f0yJMg+phppDqKkyDyADDxaBRg6opMCgf2SANIL5PhiGXgViEYXgDABvjwDyWY92hAAAAAElFTkSuQmCC';
    const play = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAX0lEQVR4AWMYgeD///8s1DLoPBCbUG4QBPwG4m4g5qHMIAS4D8TulBuEAMuBWIQygxDgPRDHU8Og70BcD8QclBh0GIg1yPMawjvplAb2aiCWoST6HwOxPzUSpACYMQoAzxvOzfqrVecAAAAASUVORK5CYII=';
    const pause = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAALElEQVR4AWMYQeD///8KQOwAxQq4xQkbVP8fAepxiQ9Kg0YNGjWI8iwycgAAialdoGi8Bn4AAAAASUVORK5CYII=';
    const stop = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAKElEQVR4AWMgHYyC////OwBxPQHsQNAgsELCoH7UoFGD6JEgMcEoAAAvYnuEwh5UiAAAAABJRU5ErkJggg==';
    const fullscreen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAANUlEQVR4AWMYIeA/GiBNHlPhfiCuB2Es8vVQvJ+gQdgMwGYgXQxCgFEw6GON8gRJeRYZGQAA6D+2QVCGKXAAAAAASUVORK5CYII=';
    const exitscreen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAOElEQVR4AWMYYeD////1/4EAQxwC6ulnEEgRFO/HY9B+mDrcBqEBgvIEwSigWWBTHv0Dn7JHFgAA6D+2Qf4nYQMAAAAASUVORK5CYII=';
    const videoPlayer = document.createElement('div');
    videoPlayer.id = 'videoPlayer';
    videoPlayer.style.visibility = 'hidden';
    videoPlayer.innerHTML =
        '    <div class="canvasDiv">\n' +
        '        <div class="loadEffect" id="loading" style="display:none;">\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '            <span></span>\n' +
        '        </div>\n' +
        '        <canvas id="playCanvas"></canvas>\n' +
        '    <div class="sideBar">\n' +
        '        <span class="no-padding">\n' +
        '            <img src="' + play +
        '" class="left player-icon" id="btnPlayVideo"/>\n' +
        '        </span>\n' +
        '        <span class="no-padding">\n' +
        '            <img src="' + stop +
        '" class="left player-icon" id="btnStopVideo"/>\n' +
        '        </span>\n' +
        '        <span class="no-padding">\n' +
        '            <input id="timeTrack" type="range" value="0">\n' +
        '            </span>\n' +
        '        <span class="no-padding">\n' +
        '            <label id="timeLabel">00:00:00/00:00:00</label>\n' +
        '        </span>\n' +
        '        <span class="no-padding right">\n' +
        '            <img src="' + fullscreen +
        '" class="right player-icon" id="btnFullscreen"/>\n' +
        '        </span>\n' +
        '    </div>\n' +
        '    </div>';

    document.body.appendChild(videoPlayer);

    //Player object.
    self.player = new Player();

    self.player.setLoadingDiv(document.getElementById('loading'));

    //Formated logger.
    var logger = new Logger('Page');
    const btnPlayVideo = document.getElementById('btnPlayVideo');
    const btnStopVideo = document.getElementById('btnStopVideo');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const canvas = document.getElementById('playCanvas');
    canvas.onclick = btnPlayVideo.onclick = () => {
        var currentState = self.player.getState();
        if (currentState === playerStatePlaying) {
            btnPlayVideo.src = play;
            sideBar.style.visibility = 'visible';
        } else {
            btnPlayVideo.src = pause;
        }

        if (currentState !== playerStatePlaying) {
            self.player.play(url, canvas, function(e) {
                console.log(
                    'play error ' + e.error + ' status ' + e.status + '.');
                if (e.error === 1) {
                    logger.logInfo('Finished.');
                }
            }, 512 * 1024, false);

            self.player.setTrack(document.getElementById('timeTrack'),
                document.getElementById('timeLabel'));
        } else {
            self.player.pause();
        }
    };

    btnStopVideo.onclick = () => {
        self.player.stop();
        btnPlayVideo.value = 'Play';
        btnPlayVideo.src = play;
        sideBar.style.visibility = 'visible';
    };

    let full = false;
    btnFullscreen.onclick = () => {
        let r = false;
        if (full) {
            r = self.player.exitscreen();
        } else {
            r = self.player.fullscreen();
        }
        if (r) {
            full
                ? btnFullscreen.src = fullscreen
                : btnFullscreen.src = exitscreen;
            full = !full;
        }

    };

    let show = false;

    const nodes = document.getElementsByTagName('video');
    for (let i = 0; i < nodes.length; i++) {
        let src = nodes[i].src ? nodes[i].src : nodes[i].firstChild.src;
        let div = document.createElement('div');
        div.innerHTML = '<img src="' + home + '">';
        div.classList.add('player-home');
        div.onclick = () => {
            url = src;
            show
                ? videoPlayer.style.visibility = 'hidden'
                : videoPlayer.style.visibility = 'visible';
            show = !show;
        };
        let parent = nodes[i].parentNode;
        parent.classList.add('player-out');
        parent.appendChild(div);
    }

    const sideBar = document.getElementsByClassName(
        'sideBar')[0];
    videoPlayer.onmouseout = () => {
        if (self.player.getState() === playerStatePlaying) {
            sideBar.style.visibility = 'hidden';
        }
    };
    videoPlayer.onmouseover = () => {
        sideBar.style.visibility = 'visible';
    };
};
