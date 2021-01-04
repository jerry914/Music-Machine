#!/usr/bin/env python
# 后端
# WS server example that synchronizes state across clients

import asyncio
import json
import websockets
# import serial

# ser = serial.Serial('/dev/ttyACM1', 9600, timeout=1)
# ser.flush()

# 名字:websockets
USERS = {}

normal_users = []
midi_data = [[0]*8 for i in range(10)]
midi_beat = 0

async def chat(websocket, path):
    # 握手
    await websocket.send(json.dumps({"type": "handshake"}))
    async for message in websocket:
        data = json.loads(message)
        print(data)
        message = ''
        # 用户发信息
        if data["type"] == 'send':
           name = '404'
           for k, v in USERS.items():
                if v == websocket:
                    name = k
           if len(USERS) != 0:  # asyncio.wait doesn't accept an empty list
                message = json.dumps(
                    {"type": "user", "content": data["content"], "from": name}
                )
                if(name in normal_users):
                    touch_x = normal_users.index(name)
                    touch_y = int(data["content"])
                    if midi_data[touch_x][touch_y]==0:
                        midi_data[touch_x][touch_y]=1
                    else:
                        midi_data[touch_x][touch_y]=0
                elif(name.find('Beat Machine')!=-1):
                    midi_beat=int(data["content"])
                    # ser.write(b"Hello from Raspberry Pi!\n")
                    # line = ser.readline().decode('utf-8').rstrip()

        #用户登录
        elif data["type"] == 'login':
            USERS[data["content"]] = websocket
            if len(USERS) != 0:  # asyncio.wait doesn't accept an empty list
                message = json.dumps(
                    {"type": "login", "content": data["content"], "user_list": list(USERS.keys())})
                if data["content"].find("host")<0:
                    normal_users.append(data["content"])
        #用户退出
        elif data["type"] == 'logout':
            del USERS[data["content"]]
            if len(USERS) != 0:  # asyncio.wait doesn't accept an empty list
                message = json.dumps(
                    {"type": "logout", "content": data["content"], "user_list": list(USERS.keys())})
                if data["content"].find("host")<0:
                    normal_users.remove(data["content"])

        # 群发
        await asyncio.wait([user.send(message) for user in USERS.values()])


start_server = websockets.serve(chat, "192.168.68.164", 1234)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
