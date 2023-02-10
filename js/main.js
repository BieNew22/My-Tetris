/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - addEventListener
 *          - add Button click event control
 * Date of latest update - 2023.02.10
 */


var gameControl = new Game();

function clickStart(obj) {
    let text = obj.innerText;

    if (text == "start") {
        // display popup
        let popupBack = document.getElementById("popup_background");
        let popupTag = document.getElementById("popup_content");

        popupTag.innerHTML = `
        <div id="popup_close" onclick="clickClose()"></div>
        <h2 style="margin:auto; padding-top: 20px; text-align:center;">
            Enter Your Nickname</h2>
        <div>
            <input type="text" id="nickname" 
                placeholder="Max nickname length is 7!" 
                oninput="input_limit(this, 7)" required>
            <span></span>
        </div>
        <button id="submit" onclick="clickSubmit()">submit</button>
        `;

        popupBack.style.display = "block";
        popupTag.style.display = "block";
    } else if (text == "pause") {
        document.removeEventListener("keydown", keyDownEvent);
        gameControl.pause_game();

        obj.innerText = "restart"
    } else {
        // text == "restart"
        document.addEventListener("keydown", keyDownEvent, false);
        gameControl.restart_game();

        obj.innerText = "pause"
    }

    obj.blur();
}

function clickInfor() {
    let popupBack = document.getElementById("popup_background");
    let popupTag = document.getElementById("popup_content");
    popupTag.innerHTML = `
    <div id="popup_close" onclick="clickClose()"></div>
    <h2 style="margin:auto;padding-top: 20px; text-align:center;">How To Play</h2>
    <h3 style="margin-left: 20px;">← , → : Move mino(block) left or right.</h3>
    <h3 style="margin-left: 20px;">↑ : Rotate mino(block) clockwise.</h3>
    <h3 style="margin-left: 20px;">↓ : Soft down.</h3>
    <h3 style="margin-left: 20px;">space : Hard down.</h3>
    <h3 style="margin-left: 20px;">Ｃ : Store mino(block)</h3>
    `;

    popupBack.style.display = "block";
    popupTag.style.display = "block";
}

// popup_display [input name] -> check_name -> game_start
//                            -> re input name
function clickSubmit() {

    document.getElementById("start").innerText = "pause";
    document.addEventListener("keydown", keyDownEvent, false);
        
    gameControl.start_game();
}

function input_limit(obj, limit) {
    if (obj.value.length > limit) {
        obj.value = obj.value.slice(0, limit);
    }
}

function clickClose() {
    let popupBack = document.getElementById("popup_background");
    let popupTag = document.getElementById("popup_content");

    popupBack.style.display = "none";
    popupTag.style.display = "none";
}

function keyDownEvent(e) {
    if (gameControl == null) {
        return;
    }

    gameControl.keyboard_event(e.keyCode)
}