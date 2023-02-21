/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - manage popup (display/content, content)
 *          - use singleton pattern
 * Date of latest update - 2023.02.21
 */

let popupInstance = null;
class Popup {
    constructor() {
        if (popupInstance != null) {
            return popupInstance;
        }
        this.popupBackground = document.getElementById("popup_background");
        this.popupContent = document.getElementById("popup_content");
        popupInstance = this
    }

    display() {
        this.popupBackground.style.display = "block";
        this.popupContent.style.display = "block";
    }

    hidden() {
        this.popupBackground.style.display = "none";
        this.popupContent.style.display = "none";
    }

    display_infor() {
        this.popupContent.innerHTML = `
            <div id="popup_close" onclick="clickClose()"></div>
            <h2 style="margin:auto;padding-top: 20px; text-align:center;">How To Play</h2>
            <h3 style="margin-left: 20px;">← , → : Move mino(block) left or right.</h3>
            <h3 style="margin-left: 20px;">↑ : Rotate mino(block) clockwise.</h3>
            <h3 style="margin-left: 20px;">↓ : Soft down.</h3>
            <h3 style="margin-left: 20px;">space : Hard down.</h3>
            <h3 style="margin-left: 20px;">Ｃ : Store mino(block)</h3>
        `;

        this.display();
    }

    display_input_nickname() {
        this.popupContent.innerHTML = `
            <div id="popup_close" onclick="clickClose()"></div>
            <h2 style="margin:auto; padding-top: 20px; text-align:center;">
                Enter Your Nickname</h2>
            <div id="nickname_wrap">
                <input type="text" id="nickname" 
                    placeholder="Max nickname length is 7!" 
                    oninput="input_limit(this, 7)" required>
                <span id="nickname_line"></span>
            </div>
            <button class="submit simplebutton" onclick="clickSubmit()">submit</button>
        `;

        this.display();
    }

    display_new_record(score) {
        this.popupContent.innerHTML = `
            <div id="popup_close" onclick="clickEnd()"></div>
            <h2 style="margin:auto; padding-top: 20px; text-align:center;">
                Congratulation!!</h2>
            <h3 style="margin:auto; margin-top: 10px; padding-top: 10px; text-align:center;">
                New Record!! </h3>
            <h4 style="margin: 20px auto; text-align:center;">
                ${score} </h4>
            <button class="check simplebutton" onclick="clickEnd()">check</button>
            <canvas id="canvas"></canvas>
        `;

        this.display();
    }

    display_game_over(score) {
        this.popupContent.innerHTML = `
            <div id="popup_close" onclick="clickEnd()"></div>
            <h2 style="margin:auto; padding-top: 20px; text-align:center;">
                Record fail...!!</h2>
            <h4 style="margin:auto; margin-top: 10px; padding-top: 10px; text-align:center;">
                Your Score</h4>
            <h3 style="margin: 15px auto; text-align:center;">
                ${score} </h3>
            <button class="end simplebutton" onclick="clickEnd()">check</button>
        `;
        this.display();
    }
}