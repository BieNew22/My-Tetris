/**
 * Writer - 안학룡(BieNew22)
 * Role of this file
 *              - create mino(block)
 *              - rotate mino(block)
 * Date of latest update - 2023.01.28
 */

class Block {
    constructor() {
        //all minos(blocks) come out the same number of times
        this.pocket = new Array();

        // shape data format : [mino color, mino data(2D array)]
        this.shapes = [
            // I mino
            [
                1, 
                [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            ],
            // O mino
            [
                2,
                [
                    [1, 1],
                    [1, 1]
                ]
            ],
            // Z mino
            [
                3,
                [
                    [1, 1, 0],
                    [0, 1, 1]
                ]
            ],
            // S mino
            [
                4,
                [
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            ],
            // J mino
            [
                5,
                [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ]
            ],
            // L mino
            [
                6,
                [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ]
            ],
            // T mino
            [
                7,
                [
                    [0, 1, 0],
                    [1, 1, 1]
                ]
            ]
        ];
    }

    make_pocket() {
        for (let i = 0; i < this.shapes.length; i++) {
            this.pocket.push(i);
        }
        
        // Fisher-Yates shuffle
        for (let i = this.shapes.length - 1; i > 0; i--) {
            const randomIdx = Math.floor(Math.random() * (i + 1));

            const tempValue = this.pocket[i];
            this.pocket[i] = this.pocket[randomIdx];
            this.pocket[randomIdx] = tempValue;
        }
    }

    make_shape() {
        if (this.pocket.length == 0) {
            this.make_pocket();
        }

        // deep copy
        return this.shapes[this.pocket.pop()].slice();
    }

    rotate_270deg_shape(shape) {
        var rotateH = shape.length;
        var rotateW = shape[0].length;
        
        var result = new Array(rotateW);
        for (let i = 0; i < rotateW; i++) {
            result[i] = new Array(rotateH).fill(0);
        }

        // shape basis : (y, x) =rotate=> (x, maxH - 1 - y)
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                result[j][rotateH - 1 - i] = shape[i][j];
            }
        }

        return result;
    }
}