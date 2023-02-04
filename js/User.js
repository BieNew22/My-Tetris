/**
 * Writer - 안학룡(BieNew22)
 * Role of file
 *          - manage user information (name, socre, rank)
 * Date of latest update - 2023.02.03
 */


class User {
    constructor() {
        this.nameKey = "mt_b_name";
        this.scoreKey = "mt_b_score";


        this.name = "None";
        
        this.score = 0;
        this.bestScore = 0;

        this.combo = 1;
        this.lastBlockCount = 0;

        this.bestScoreTag = null;
        this.nowScoreTag = null;

        this.init_user();
    }

    init_user() {
        // init tag
        this.bestScoreTag = document.getElementById("best_score");
        this.nowScoreTag = document.getElementById("now_score");

        // init best score
        let score = parseInt(window.localStorage.getItem(this.scoreKey));
        let name = window.localStorage.getItem(this.nameKey);

        if (isNaN(score) || name == null) {
            this.bestScoreTag.innerText = "None";
        } else {
            this.bestScore = score;

            this.bestScoreTag.innerText = name + "(" + score + ")";
        }
    }

    init_name() {
        let name = null;

        this.update_score();
    }

    add_score(line, blockCount) {
        if (blockCount - this.lastBlockCount == 1) {
            this.combo = this.combo == 10 ? 10 : this.combo + 1;
        } else {
            this.combo = 1;
        }

        this.lastBlockCount = blockCount;

        this.score += (line * (2 ** this.combo));

        this.update_score();
    }

    update_score() {
        this.nowScoreTag.innerText = this.name + "(" + this.score + ")";
    }

    store_score() {
        window.localStorage.setItem(this.nameKey, this.name);
        window.localStorage.setItem(this.scoreKey, String(this.score));
    }

    is_best() {
        if (this.score <= this.bestScore) {
            return false;
        }
        return true;
    }
}