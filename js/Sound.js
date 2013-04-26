var MusicModel = function () {
    this.soundSrcMp3 = ko.observable("");
    this.soundSrcOgg = ko.observable("");
    this.audioElement = $("#audioinput");

    this.play = function () {
        document.getElementById('audioinput').innerHTML = ' <audio id="audio" autoplay><source src=' + this.soundSrcMp3() + '  type="audio/mpeg" /><source src="' + this.soundSrcOgg() + '" type="audio/ogg" /></audio>';
        document.getElementById('audio').play();
    }
}

var play = function(sound) {
    musicModel.soundSrcMp3("sounds/" + sound + ".mp3");
    musicModel.soundSrcOgg("sounds/" + sound + ".ogg");
    musicModel.play();
}

var musicModel = new MusicModel();
ko.applyBindings(musicModel);