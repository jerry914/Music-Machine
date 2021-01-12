const urlParams = new URLSearchParams(window.location.search);
var user_idx = parseInt(urlParams.get('idx'));
if(!user_idx){
    user_idx = 0;
}
var uname = "user "+uuid(8,16);

var ws = new WebSocket("ws://"+myIP+":1234");

ws.onopen = function() {
    console.log("connecton sucessful");
    midi_init(user_idx);
};

var nSteps = 8;
var midi_data=[];

for(var step = 0; step < nSteps; step++){
    midi_data[step] = 0;
}


ws.onmessage = function(e) {
    var msg = JSON.parse(e.data);
    var sender;
    switch (msg.type) {
        case 'system':
            sender = '系统消息: ';
            break;
        case 'user':
            sender = msg.from;
            listMsg(sender,msg);
            break;
        case 'handshake':
            var user_info = {
                'type': 'login',
                'content': uname
            };
            sendMsg(user_info);
            return;
        case 'login':
            login_state(msg);
            break;
        case 'logout':
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


function send(idx,data) { 
    var msg = {
        'content': user_idx+" "+idx+" "+data,
        'type': 'send'
    };
    sendMsg(msg);
}


function listMsg(sender,msg){
    var sender_name = sender.split(" ");
    // if(sender_name[1]=="Beat_Machine"){
    //     console.log(msg);
    //     var ary_beat = msg.content.split(",");
    //     if(ary_beat.length>8){
    //         console.log(ary_beat);
    //         for(var i=0;i<8;i++){
    //             if(ary_beat[i+user_idx*8]=="true"){
    //                 changeColor_bystate(i,true);
    //             }
    //             else{
    //                 changeColor_bystate(i,false);
    //             }
    //         }
    //     }
    // }
    
    if(sender_name[0]=="user"){
        var ary_beat = msg.content.split(" ");
        if(parseInt(ary_beat[0])==user_idx){
            changeColor_bystate(ary_beat[1],ary_beat[2]);
        }
    }
}

function login_state(msg){
    for(var i=0;i<8;i++){
        if(msg.midi_data[user_idx][i]=="1"){
            changeColor_bystate(i,true);
        }
        else{
            changeColor_bystate(i,false);
        }
    }
}
/**
 * 处理用户登陆消息
 *
 * @param user_name 用户名
 * @param type  login/logout
 * @param name_list 用户列表
 */




function dealUser(user_name, type, name_list) {

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