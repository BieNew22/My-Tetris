/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - init stage table
 *          - control stage state : minos(blocks) existence
 *          - print mino(block) and shadow currunt position
 *          - display next minos(blocks) and stored mino(block)
 * Date of latest update - 2023.02.02 
 */

class Board {
    constructor() {
        this.blockColorTable = ['rgba(0, 0, 0, 0.1)', '#0080ff', '#ffff00', 
            '#ff0000', '#008000', '#005282', '#ff7f00', '#8b00ff'];
        this.shadowColor = "rgba(0, 0, 0, 0.4)";

        // stage width x height = 20 x 10
        // data format : [value(color), tag obj]
        this.stage = new Array(20);
        for (let i = 0; i < this.stage.length; i++) {
            this.stage[i] = new Array(10);

            for (let j = 0; j < this.stage[i].length; j++) {
                this.stage[i][j] = [0, null];
            }
        }

        // data format : html tag
        this.storeTag = document.getElementById("store");
        this.nextBlocksTag = new Array(4);

        for (let i = 0; i < this.nextBlocksTag.length; i++) {
            this.nextBlocksTag[i] = document.getElementById("next" + String(i));
        }

        this.init_board();
    }

    init_board() {
        // make stage table and init this.stage

        var stageTag = document.getElementById("stage");
        var tableTag = document.createElement("table");

        for (var i = 0; i < this.stage.length; i++) {
            var trTag = document.createElement("tr");

            for (var j = 0; j < this.stage[i].length; j++) {
                var tdTag = document.createElement("td");
                tdTag.className = "stage_pixel";

                trTag.appendChild(tdTag);

                this.stage[i][j][1] = tdTag;
            }

            tableTag.appendChild(trTag);
        }

        stageTag.appendChild(tableTag);
    }

    place_now_block(offset, block) {
        // does not need check esacpe -> Game.js will check and call.
        var ox = offset[0];
        var oy = offset[1];

        for (let i = 0; i < block[1].length; i++) {
            for (let j = 0; j < block[1][i].length; j++) {
                if (block[1][i][j] == 0) {
                    continue;
                }

                this.stage[oy + i][ox + j][0] = block[0];
            }
        }
    }

    draw_block(offset, shadowOffset, block, isErase) {
        // isErase == true : erase block, isErase is false : print block

        // does not need check escape -> Game will check in moveable function
        // just need check in overflowing from the top (start state) and empty space.
        
        // merge print_now_block & print_block_shadow
        // merge print_now_block & erase_now_block
        // reason : all codes are the same.

        var ox = offset[0];
        var oy = offset[1];

        var sox = shadowOffset[0];
        var soy = shadowOffset[1];

        var data = block[1];

        let blockC = this.blockColorTable[block[0]];
        let shadowC = this.shadowColor;

        if (isErase) {
            blockC = this.blockColorTable[0];
            shadowC = this.blockColorTable[0];
        }

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                // empty space
                if (data[i][j] == 0) {
                    continue;
                }

                // print shadow first : block can overlap shadow
                if (soy + i >= 0) {
                    this.stage[soy + i][sox + j][1].style.backgroundColor = shadowC;
                }
                
                if (oy + i >= 0) {
                    this.stage[oy + i][ox + j][1].style.backgroundColor = blockC;
                }
            }
        }
    }

    print_informative_block(block, size, displayTag) {
        // erase before block and print now block

        var h = block[1].length;
        var w = block[1][0].length;

        // set display size
        displayTag.style.width = String(w * (size + 1)) + "px";
        displayTag.style.height = String(h * (size + 1)) + "px";

        // remove all child
        while (displayTag.firstChild) {
            displayTag.removeChild(displayTag.firstChild);
        }

        // add block
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                var divTag = document.createElement("div");

                divTag.style.width = String(size) + "px";
                divTag.style.height = String(size) + "px";

                if (block[1][i][j] == 0) {
                    divTag.style.backgroundColor = "transparent";
                } else {
                    divTag.style.backgroundColor = this.blockColorTable[block[0]];
                }

                displayTag.appendChild(divTag);
            }
        }
    }

    print_next_blocks(blocks) {
        for (let i = 0; i < blocks.length; i++) {
            let size = i == 0 ? 20 : 15;

            this.print_informative_block(blocks[i], size, this.nextBlocksTag[i]);
        }
    }

    print_store_block(block) {
        this.print_informative_block(block, 20, this.storeTag);
    }

    check_line_complete(idx) {
        for (let i = 0; i < this.stage[idx].length; i++) {
            if (this.stage[idx][i][0] == 0) {
                return false;
            }
        }
        return true;
    }

    erase_complete_liens(idxs) {
        for (let cls of idxs) {
            for (let i = cls; i > 0; i--) {
                for (let j = 0; j < this.stage[i].length; j++) {
                    this.stage[i][j][0] = this.stage[i - 1][j][0];
                    this.stage[i][j][1].style.backgroundColor = this.blockColorTable[this.stage[i][j][0]];
                }
            }

            for (let i = 0; i < this.stage[0].length; i++) {
                this.stage[0][i][0] = 0;
                this.stage[0][i][1].style.backgroundColor = this.blockColorTable[0];
            }
        }
    }
}