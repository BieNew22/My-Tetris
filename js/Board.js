/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - init stage table
 *          - control stage state : minos(blocks) existence
 *          - print mino(block) and shadow currunt position
 *          - display next minos(blocks) and stored mino(block)
 * Date of latest update - 2023.01.28 
 */

class Board {
    constructor() {
        this.blockColorTable = ['rgba(0, 0, 0, 0.1', '#0080ff', '#ffff00', 
            '#ff0000', '#008000', '#005282', '#ff7f00', '#8b00ff'];

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

    print_now_block(offset, block) {
        // does not need check escape -> Game will check in moveable function
        // just need check in overflowing from the top. (start state)
        var ox = offset[0];
        var oy = offset[1];
        var data = block[1];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                // empty space Or overflowing from the top.
                if (data[i][j] == 0 || oy + i >= this.stage.length) {
                    continue;
                }

                this.stage[oy + i][ox + j][1].style.backgroundColor = this.blockColorTable[block[0]];
            }
        }
    }

    print_next_blocks(blocks) {
        console.log(blocks)
        for (let i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            var h = block[1].length;
            var w = block[1][0].length;
            var size = i == 0 ? 20 : 15;

            // set display size
            this.nextBlocksTag[i].style.width = String(w * (size + 1)) + "px";
            this.nextBlocksTag[i].style.height = String(h * (size + 1)) + "px";

            // remove all child : remove before next block div tag
            while (this.nextBlocksTag[i].firstChild) {
                this.nextBlocksTag[i].removeChild(this.nextBlocksTag[i].firstChild);
            }

            // add now next block
            for (let j = 0; j < block[1].length; j++) {
                for (let k = 0; k < block[1][j].length; k++) {
                    let divTag = document.createElement("div");
                    let divSize = i == 0 ? "20px" : "15px";

                    divTag.style.width = divSize;
                    divTag.style.height = divSize;
                    
                    if (block[1][j][k] == 0) {
                        divTag.style.backgroundColor = "transparent";
                    } else {
                        divTag.style.backgroundColor = this.blockColorTable[block[0]];
                    }

                    this.nextBlocksTag[i].appendChild(divTag);
                }
            }
        }
    }

    print_store_block() {

    }

    print_block_shadow(offset, shadow) {

    }
}