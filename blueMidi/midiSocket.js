var uname = "user "+uuid(8, 16);
var ws = new WebSocket("ws://172.16.6.216:1234");
var user_max = 5;
ws.onopen = function() {
    console.log("connecton sucessful")
};

ws.onmessage = function(e) {
    var msg = JSON.parse(e.data);
    var sender, user_name, name_list, change_type;

    switch (msg.type) {
        case 'system':
            sender = '系统消息: ';
            break;
        case 'user':
            sender = msg.from + ': ';
            break;
        case 'handshake':
            var user_info = {
                'type': 'login',
                'content': uname
            };
            sendMsg(user_info);
            return;
        case 'login':
        case 'logout':
            user_name = msg.content;
            name_list = msg.user_list;
            change_type = msg.type;
            dealUser(user_name, change_type, name_list);
            return;
    }

};

ws.onerror = function() {
    var data = "系统消息 : 出错了,请退出重试.";
    console.log("ST goes wrong!!!");
};

window.onbeforeunload = function() {
    var user_info = {
        'type': 'logout',
        'content': uname
    };
    sendMsg(user_info);
    ws.close();
}

/**
 * 在输入框内按下回车键时发送消息
 *
 * @param event
 *
 * @returns {boolean}
 */
function confirm(event) {
    var key_num = event.keyCode;
    if (13 == key_num) {
        send();
    } else {
        return false;
    }
}


function send(idx) { 
    var msg = {
        'content': idx,
        'type': 'send'
    };
    sendMsg(msg);
}

/**
 * 将消息内容添加到输出框中,并将滚动条滚动到最下方
 */

/**
 * 处理用户登陆消息
 *
 * @param user_name 用户名
 * @param type  login/logout
 * @param name_list 用户列表
 */

function dealUser(user_name, type, name_list) {
    if(name_list.length>user_max){
        if(name_list[name_list.length-1]==uname){
            location.replace("userOverflow.html");
        }
    }
    let user_idx = name_list.indexOf(uname);
    if(user_idx >= 0){
        midi_init(user_idx);
    }
}

/**
 * 将数据转为json并发送
 * @param msg
 */
function sendMsg(msg) {
    var data = JSON.stringify(msg);
    ws.send(data);
}

/**
 * 生产一个全局唯一ID作为用户名的默认值;
 *
 * @param len
 * @param radix
 * @returns {string}
 */
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}