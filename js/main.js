/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - addEventListener
 *          - add Button click event control
 * Date of latest update - 2023.02.03
 */


var gameControl = new Game();

function clickStart(obj) {
    let text = obj.innerText;

    if (text == "start") {
        document.addEventListener("keydown", keyDownEvent, false);
        gameControl.strat_game();

        obj.innerText = "pause";
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

function keyDownEvent(e) {
    if (gameControl == null) {
        return;
    }

    gameControl.keyboard_event(e.keyCode)
}