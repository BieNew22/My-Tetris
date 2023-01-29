/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - Manage all current game states
 * Date of latest update - 2023.01.29 
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

        this.board.print_now_block(this.blockOffset, this.nowBlock);
        this.board.print_block_shadow(this.shadowOffset, this.nowBlock);
        this.board.print_next_blocks(this.nextBlocks);
    }

    reset_offset() {
        this.offset[0] = Math.floor((10 - this.nowBlock[1][0].length) / 2);
        this.offset[1] = 0 - this.nowBlock[1].length;
    }

    calc_shadow_offset() {

    }
}