/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - Manage all current game states
 * Date of latest update - 2023.02.10
 */

class Game {
    constructor() {
        this.user = new User();
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
        // init now mino(block) and next minos(blocks)
        for (let i = 0; i < this.nextBlocks.length; i++) {
            this.nextBlocks[i] = this.blockCreater.make_shape();
        }

        this.make_now_block();
    }

    start_game() {
        this.user.init_name();
        
        this.init_blocks();
        this.set_auto_drop(this.dropInterval - this.countBlock);
    }

    pause_game() {
        this.remove_auto_drop();
    }

    restart_game() {
        this.set_auto_drop(this.dropInterval - this.countBlock);
    }

    game_over() {

    }

    make_now_block() {
        // change now block and add one next block
        this.nowBlock = this.nextBlocks.shift();
        this.reset_offset();
        this.calc_shadow_offset();

        this.nextBlocks.push(this.blockCreater.make_shape());

        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock,  false);
        this.board.print_next_blocks(this.nextBlocks);
    }

    set_auto_drop(time) {
        this.autoDrop = setInterval(() => this.press_down_key(), time);
    }

    remove_auto_drop() {
        clearInterval(this.autoDrop);
    }

    game_over() {
        console.log("game over");
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

    check_rotatable() {
        // Wall kick on my own, Do not fllow link below
        // SRS(Software Requirement Specification) : [https://tetris.wiki/Super_Rotation_System]

        var tx = this.blockOffset[0];
        var ty = this.blockOffset[1];

        // routine format : change x-axis routine
        // change x-axis routine : 0, -1, -2
        var routine = [0, -1, 1, -2, 2, 3];

        for (let yRoutine = 0; yRoutine < 3; yRoutine++) {
            for (let xRoutine of routine) {
                if (this.check_overlap([tx - xRoutine, ty - yRoutine], true)) {
                    this.blockOffset[0] = tx - xRoutine;
                    this.blockOffset[1] = ty - yRoutine;
                    return true;
                }
            }
        }
        return false;
    }

    check_complete_lines() {
        // check from high
        var start = this.blockOffset[1];
        var end = start + this.nowBlock[1].length;
        var clearList = [];

        for (let i = start; i < end ; i++) {
            if (this.board.check_line_complete(i)) {
                clearList.push(i);
            }
        }

        return clearList;
    }

    keyboard_event(code) {
        switch (code) {
            case 37:
                // left key
                this.press_LR_key(1);
                break;
            case 39:
                // right key
                this.press_LR_key(-1);
                break;
            case 40:
                // down key
                this.press_down_key();
                break;
            case 38:
                // up key
                this.press_up_key();
                break;
            case 67:
                // c key - store key
                this.press_store_key();

                break;
            case 32:
                // space key
                this.press_space_key();
                break;
            default:
                break;
        }
    }

    press_LR_key(direction) {
        // move left or right one space
        // merge press_left_key and press_right_key function
        // all codes are the same except direction
        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, true);

        this.blockOffset[0] -= direction;

        // move is Ok -> move and recalc shadow offset
        if (this.check_overlap(this.blockOffset, true)) {
            this.calc_shadow_offset();
        } else {
            this.blockOffset[0] += direction;
        }

        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, false);
    }

    press_down_key() {
        // reset count rotate
        this.countRotate = 0;

        // move down one space immediately
        this.remove_auto_drop();
        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, true);

        this.blockOffset[1] += 1;

        // move down - is Ok -> move and end;
        if (this.check_overlap(this.blockOffset, true)) {
            this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, false);
            this.set_auto_drop(this.dropInterval - this.countBlock);
            return;
        }

        this.blockOffset[1] -= 1;
        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, false);

        // place block - is Ok -> place and change now block;
        if (!this.check_overlap(this.blockOffset, false)) {
            this.game_over();
            return;
        }

        this.board.place_now_block(this.blockOffset, this.nowBlock);

        // check complete lines
        var clearLines = this.check_complete_lines();
        if (clearLines.length > 0) {
            this.board.erase_complete_lines(clearLines);
            // - this.score.add_score(clearLines.length)
        }

        // change now block
        this.make_now_block();

        // state variable change
        this.countBlock += 1;
        this.storable = true;
        this.set_auto_drop(this.dropInterval - this.countBlock);
    }

    press_up_key() {
        // rotate block
        this.remove_auto_drop();
        this.countRotate += 5;

        var tBlock = this.nowBlock.slice();
        var tOffset = this.blockOffset.slice();

        this.nowBlock[1] = this.blockCreater.rotate_270deg_shape(this.nowBlock[1]);

        if (this.check_rotatable()) {
            // erase before block
            this.board.draw_block(tOffset, this.shadowOffset, tBlock, true);
        
            // draw new block
            this.calc_shadow_offset();
            this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, false);
        } else {
            this.nowBlock = tBlock;
        }

        // To prevent infinite rotation
        this.set_auto_drop(500 - this.countRotate);
    }

    press_store_key() {
        // one place - one store
        if (!this.storable) {
            return;
        }
        this.storable = false;

        this.remove_auto_drop();
        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, true);

        if (this.storeBlock == null) {
            // first store
            this.storeBlock = this.nowBlock;

            this.make_now_block();
        } else {
            let tmp = this.storeBlock;
            this.storeBlock = this.nowBlock;
            this.nowBlock = tmp;

            this.reset_offset();
            this.calc_shadow_offset();
            this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, false);
        }

        this.board.print_store_block(this.storeBlock);

        this.set_auto_drop(this.dropInterval - this.countBlock);
    }

    press_space_key() {
        this.remove_auto_drop();
        this.board.draw_block(this.blockOffset, this.shadowOffset, this.nowBlock, true);

        this.blockOffset[0] = this.shadowOffset[0];
        this.blockOffset[1] = this.shadowOffset[1];

        this.press_down_key();
    }
}