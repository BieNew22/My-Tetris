/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - addEventListener
 *          - add Button click event control
 * Date of latest update - 2023.02.11
 */


var gameControl = new Game();

function clickStart(obj) {
    let text = obj.innerText;

    if (text == "start") {
        // display popup
        let popupManager = new Popup();

        popupManager.display_input_nickname();
    } else if (text == "pause") {
        document.removeEventListener("keydown", keyDownEvent);
        gameControl.pause_game();

        obj.innerText = "restart";
    } else {
        // text == "restart"
        document.addEventListener("keydown", keyDownEvent, false);
        gameControl.restart_game();

        obj.innerText = "pause";
    }

    obj.blur();
}

function clickInfor() {
    // popup - how to play
    let popupManager = new Popup();

    popupManager.display_infor();
}

function clickSubmit() {
    // close popup and start game
    let name = document.getElementById("nickname").value;

    if (name.length <= 0 || name.length > 7) {
        return;
    }

    document.getElementById("start").innerText = "pause";
    document.addEventListener("keydown", keyDownEvent, false);
    
    clickClose();
    
    gameControl.start_game(name);
}

function input_limit(obj, limit) {
    if (obj.value.length > limit) {
        obj.value = obj.value.slice(0, limit);
    }
}

function clickClose() {
    // close popup
    let popupManager = new Popup();

    popupManager.hidden();
}

function keyDownEvent(e) {
    if (gameControl == null) {
        return;
    }

    gameControl.keyboard_event(e.keyCode)
}