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
        for (var i = 0; i < this.stage.length; i++) {
            this.stage[i] = new Array(10);

            for (var j = 0; j < this.stage[i].length; j++) {
                this.stage[i][j] = [0, null];
            }
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
}