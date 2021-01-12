var speedVal = 50;
var users = [];

var uname = "host Beat_Machine";
console.log(uname);
var ws = new WebSocket("ws://"+myIP+":1234");
var machine_open = false;

var nSteps = 8;
var nTracks = 10;
var midi_data=[];
for(var track = 0; track < nTracks; track++){
    midi_data[track] = [];
    for(var step = 0; step < nSteps; step++){
        midi_data[track][step] = 0;
    }
}

  ws.onopen = function() {
      var data = "system：Connection Succesful!";
      machine_open=true;
      listMsg(data);
  };

  ws.onmessage = function(e) {
      var msg = JSON.parse(e.data);
      var sender, user_name, name_list, change_type;

      switch (msg.type) {
          case 'system':
              sender = 'system: ';
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
          case 'logout':
              user_name = msg.content;
              name_list = msg.user_list;
              change_type = msg.type;
              dealUser(user_name, change_type, name_list);
              return;
      }

  };

  ws.onerror = function() {
      var data = "system:出错了,请退出重试.";
      listMsg(data);
  };

  //窗口关闭时，发信息给服务器，说明下线了
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

  /**
   * 发送并清空消息输入框内的消息
   */
  function send() {
      var msg_box = document.getElementById("msg_box");
      var content = msg_box.value;
      var reg = new RegExp("\r\n", "g");
      content = content.replace(reg, "");
      var msg = {
          'content': content.trim(),
          'type': 'send'
      };
      sendMsg(msg);
      msg_box.value = '';
      // todo 清除换行符
  }

  function listMsg(sender,msg) {
    
    var sender_name = sender.split(" ");
    
    if(sender_name[0]=="user"){
        var msg_idx = msg.content.split(" ");
        midi_data[parseInt(msg_idx[0])][parseInt(msg_idx[1])] = !midi_data[parseInt(msg_idx[0])][parseInt(msg_idx[1])] ;
    }
    else if(sender_name[1]=="master"){
        if(msg.content)
            machine_action(msg.content);
    }
  }

  /**
   * 处理用户登陆消息
   *
   * @param user_name 用户名
   * @param type  login/logout
   * @param name_list 用户列表
   */


function smashArray(){
    let data = "";
    for(var track = 0; track < 5; track++){
        for(var step = 0; step < 8; step++){
            data += midi_data[track][step];
            data += ",";
        }
    }
    return data;
}

function send_midi_array(){
    var msg = {
        'content': smashArray(),
        'type': 'send'
    };
    sendMsg(msg);
}

  function dealUser(user_name, type, name_list) {

      var change = type == 'login' ? 'online' : 'offline';
      var data = 'system:' + user_name + ' has ' + change;
      

      listMsg(data);
      
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