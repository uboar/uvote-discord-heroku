const exp = require('express');

var app = exp();
app.set('view engine', 'ejs');


var votes = {
    icon: [
        "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg",
        "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg",
        "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg",
        "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg",
        "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg",
    ],
    username: ["", "", "", "", "",],
    userId: ["", "", "", "", "",],
    num: ["-", "-", "-", "-", "-",],
    point: ["", "", "", "", "",],
    comment: [
        "",
        "",
        "",
        "",
        "",
    ],
    hide: [
        "",
        "d-none",
        "d-none",
        "d-none",
        "d-none",
    ],
    attached: [
        false,
        false,
        false,
        false,
        false,
    ],
    voted: [
        false,
        false,
        false,
        false,
        false,
    ],

    hide_sum: "",
    num_sum: "-",
    point_sum: "",
    comment_sum: "",
};

const MAX_USER_NUM = 5;

const IDLE = 0;
const VOTING = 1;
const RESULT = 2;

var servStatus = IDLE;

module.exports = {
    /*サーバー開始*/
    async servStart() {

        app.get('/', function (req, res) {
            res.render('./index.ejs', votes);
        });
        app.listen(process.env.PORT);
        console.log(`listening on ${ process.env.PORT }` );
    },

    /*アイドル状態にする*/
    setIdle() {
        servStatus = IDLE;

        for (var i = 0; i < MAX_USER_NUM; i++) {
            if (votes.attached[i] == true) {
                votes.voted[i] = false;
                votes.num[i] = "";
                votes.point[i] = "-";
            }
        }

        votes.num_sum = "";
        votes.point_sum = "";
    },

    /*num番のユーザーネーム変更*/
    modifyUserName(str, num) {
        votes.username[num] = str;
    },

    /*num番のユーザーID変更*/
    modifyUserId(id, num) {
        votes.userId[num] = id;
    },

    /*num番のアイコンを変更*/
    modifyIcon(str, num) {
        votes.icon[num] = str;
    },

    /*num番のポイントを変更*/
    modifyPoint(point, num) {
        votes.num[num] = point.toString();
        votes.voted[num] = true;
    },

    /*num番のコメントを変更*/
    modifyComment(comment, num) {
        votes.comment[num] = comment;
    },

    /*num番のユーザーを表示*/
    showUser(num) {
        votes.hide[num] = "";
    },

    /*num番のユーザーを非表示*/
    hideUser(num) {
        votes.hide[num] = "d-none";
    },

    /*num番のユーザー割当を解除*/
    detachUser(num) {
        votes.comment[num] = "";
        votes.point[num] = "";
        votes.userId[num] = "";
        votes.icon[num] = "https://pbs.twimg.com/profile_images/1354485696392613893/9T6ogVOI_400x400.jpg";
        votes.attached[num] = false;
    },

    /*num番のユーザーを割り当て*/
    attachUser(num) {
        votes.attached[num] = true;
    },

    /*投票をスタート*/
    startVote() {
        servStatus = VOTING;
        for (var i = 0; i < MAX_USER_NUM; i++) {
            votes.voted[i] = false;
            votes.point[i] = " / 4点";
            votes.num[i] = "-";
        }
        votes.num_sum = "";
        votes.point_sum = "記入中…";
    },

    getUserSlot(id) {
        for (var i = 0; i < MAX_USER_NUM; i++) {
            if ((votes.attached[i] == true) && (votes.userId[i] == id)) {
                return i;
            }
        }
        return -1;
    },

    getStatus() {
        return servStatus;
    },

    /*全員の投票が終わったか*/
    getAllUserVoted() {
        for (var i = 0; i < MAX_USER_NUM; i++) {
            if ((votes.voted[i] == false) && (votes.attached[i] == true)) {
                return false;
            }
        }
        return true;
    },

    /*投票終了・合計表示(引数は投票してない人に入れる点数)*/
    endVote(num) {
        var sum = 0;

        servStatus = RESULT;

        for (var i = 0; i < MAX_USER_NUM; i++) {
            if (votes.attached[i] == true) {
                if (votes.voted[i] == false) {
                    votes.voted[i] = true;
                    votes.num[i] = num.toString();
                }
                sum += Number(votes.num[i]);
            }
        }

        votes.num_sum = sum.toString();
        votes.point_sum = "点";
    },
}

exports.MAX_USER_NUM = MAX_USER_NUM;

exports.IDLE = IDLE;
exports.VOTING = VOTING;
exports.RESULT = RESULT;
exports.servStatus = servStatus;