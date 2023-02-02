/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - Manage all current game states
 * Date of latest update - 2023.02.02 
 */

class Game {
    constructor() {
        this.score = new Score();
        this.board = new Board();
        this.blockCreater = new Block();

        // data format : interval object
        this.autoDrop = null;

        this.countBlock = 0;
        this.countRotate = 1;
        this.dropInterval = 1000;

        // data format : [x, y]
        this.blockOffset = [0, 0];
        this.shadowOffset = [0, 0];

        // block object
        this.nowBlock = null;
        this.storeBlock = null;
        this.nextBlocks = new Array(4);

        this.storable = true;
    }

    init_blocks() {
        // int now mino(block) and next minos(blocks)
        this.nowBlock = this.blockCreater.make_shape();
        this.reset_offset();
        this.calc_shadow_offset();

        for (let i = 0; i < this.nextBlocks.length; i++) {
            this.nextBlocks[i] = this.blockCreater.make_shape();
        }

        console.log(this.shadowOffset);

        this.board.print_now_block(this.blockOffset, this.shadowOffset, this.nowBlock);
        this.board.print_next_blocks(this.nextBlocks);
    }

    reset_offset() {
        this.blockOffset[0] = Math.floor((10 - this.nowBlock[1][0].length) / 2);
        this.blockOffset[1] = 0 - this.nowBlock[1].length;
    }

    calc_shadow_offset() {
        var find = false;
        var tX = this.blockOffset[0];
        var tY = this.blockOffset[1];

        while (!find) {
            find = true;

            // if next offset return false means now offset is shadow offset.
            tY += 1;
            if (this.check_overlap([tX, tY], true)) {
                find = false;
                continue;
            }
            tY -= 1;
        }
        this.shadowOffset[0] = tX;
        this.shadowOffset[1] = tY;
    }

    check_overlap(offset, isMove) {
        // check moveable or palceable to next offset
        // diff mave and place
        // move : allow y-axis(top) escape, decline x-axis escape
        // place : decline all escape

        var ox = offset[0];
        var oy = offset[1];
        var data = this.nowBlock[1];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                // bottom escape
                if (oy + i >= this.board.stage.length) {
                    return false;
                }

                // x-axis escape
                if (ox + j < 0 || ox + j >= this.board.stage[0].length) {
                    return false;
                }

                // empty space
                if (data[i][j] == 0) {
                    continue;
                }

                // move : allow top escape
                if (isMove && oy + i < 0) {
                    continue;
                }

                // place : decline top escape
                if (!isMove && oy + i < 0) {
                    return false;
                }

                // overlap
                if (this.board.stage[oy + i][ox + j][0] != 0) {
                    return false;
                }
            }
        }

        return true;
    }
}