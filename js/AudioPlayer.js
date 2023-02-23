/**
 * Writer - 안학룡(BieNew22)
 * Role of this file
 *              - control BGM, and background music
 * Date of latest update - 2023.02.23
 */

let apInstance = null;
class AudioPlayer {
    constructor() {
        if (apInstance != null) {
            return apInstance;
        }

        this.audioTagList = { 
            "DS": document.getElementById("drop_sound"), 
            "CL": document.getElementById("clear_line"), 
            "GO": document.getElementById("game_over"), 
            "NR": document.getElementById("new_record")
        };

        apInstance = this;
    }

    play_music(cmd) {
        let audio = this.audioTagList[cmd];

        // to prevent mute by calling during playback
        if (!audio.ended) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio.play();
    }
}