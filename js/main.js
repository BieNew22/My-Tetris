let gameControl = new Game();

function clickStart() {
    document.addEventListener("keydown", keyDownEvent);
    gameControl.init_blocks();
    gameControl.set_auto_drop(500);
}

function keyDownEvent(e) {
    if (gameControl == null) {
        return;
    }

    gameControl.keyboard_event(e.keyCode)
}