var speedVal = 50;
  var users = [];
  var uname = "host: Beat Machine";
  console.log(uname);
  var ws = new WebSocket("ws://"+myIP+":1234");
  ws.onopen = function() {
      var data = "system：Connection Succesful!";
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

      var data = sender + msg.content;
      listMsg(data);
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

  /**
   * 将消息内容添加到输出框中,并将滚动条滚动到最下方
   */
  function listMsg(data) {
    var msg = document.createElement("p");

    msg.innerHTML = data;
    msg_list.appendChild(msg);
    msg_list.scrollTop = msg_list.scrollHeight;
    let machine_data = data.split(":");

    if(machine_data.length>1 && machine_data[0]=="host master"){
        var host_data = machine_data[1].split(" ");
        if(host_data[1]=="on" || host_data[1]=="off"){
            console.log(host_data[1]);
        }
        else if(host_data[1]=="speed"){
            speedVal = host_data[2];
        }
        else{
            machine_action('master',host_data[1]);
        }
    }
    else{
        var user_data= machine_data[0].split(" ");
        if(user_data[0]=='user'){
            var user_idx = user_data[1].indexOf(user_name);
            console.log(user_idx,parseInt(machine_data[1]));
            if(user_idx!=-1){
                machine_action(user_idx,parseInt(machine_data[1]));
            }
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
      var user_list = document.getElementById("user_list");
      var user_num = document.getElementById("user_num");
      while (user_list.hasChildNodes()) {
          user_list.removeChild(user_list.firstChild);
      }

      for (var index in name_list) {
          var user = document.createElement("p");
          user.innerHTML = name_list[index];
          user_list.appendChild(user);
      }
      user_num.innerHTML = name_list.length;
      user_list.scrollTop = user_list.scrollHeight;
    
      if(type=='login' && user_name!="Beat Machine"){
        users.push(user_name);
      }
      else if(type=='logout'){
        let rm_idx = users.indexOf(user_name);
        if (index> -1) {
         users.splice(rm_idx, 1);
          machine_kill_row(rm_idx);
        }
        
      }
      

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