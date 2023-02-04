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

function clickInfor() {
    let popupBack = document.getElementById("popup_background");
    let popupTag = document.getElementById("popup_content");
    popupTag.innerHTML = `
    <div id="popup_close" onclick="clickClose()"></div>
    <h2 style="margin:auto;padding-top: 20px; text-align:center;"> 게임 방법 </h2>
    <h3 style="margin-left: 20px;">→ : 블럭 오른쪽으로 한 칸 이동</h3>
    <h3 style="margin-left: 20px;">← : 블럭 왼쪽으로 한 칸 이동</h3>
    <h3 style="margin-left: 20px;">↑ : 블럭 시계방향으로 회전</h3>
    <h3 style="margin-left: 20px;">↓ : 블럭 한 칸 즉시 드랍</h3>
    <h3 style="margin-left: 20px;">Ｃ : 블럭 저장 / 저장한 블럭과 교환</h3>
    <h3 style="margin-left: 20px;">space bar : 블럭 즉시 드랍</h3>
    <h3 style="margin-left: 20px;">연속으로 라인을 클리어 시 콤보 점수있습니다. </h3>
    `;

    popupBack.style.display = "block";
    popupTag.style.display = "block";
}

function clickClose() {

}

function keyDownEvent(e) {
    if (gameControl == null) {
        return;
    }

    gameControl.keyboard_event(e.keyCode)
}