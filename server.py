#!/usr/bin/env python
# 后端
# WS server example that synchronizes state across clients

import asyncio
import json
import websockets
import time
import midi_loop

USERS = {}

midi_data = [[0]*8 for i in range(10)]

strip = midi_loop.init()

async def chat(websocket, path):
    # 握手
    await websocket.send(json.dumps({"type": "handshake"}))
    async for message in websocket:
        midi_beat = 0
        data = json.loads(message)
        print(data)
        message = ''
        # 用户发信息
        if data["type"] == 'send':
           name = '404'
           for k, v in USERS.items():
                if v == websocket:
                    name = k
           if len(USERS) != 0:  
                message = json.dumps(
                    {"type": "user", "content": data["content"], "from": name}
                )
                if(name == "host Beat_Machine"):
                    msg_data = data["content"].split(",")
                    if len(msg_data)<8:
                        midi_beat=data["content"]
                        midi_loop.beat_on(strip,midi_beat,midi_data,1)
                    
                elif(name.split(" ")[0]=="user"):
                    touch_x = int(data["content"].split(" ")[0])
                    touch_y = int(data["content"].split(" ")[1])
                    midi_data[touch_x][touch_y] = int(data["content"].split(" ")[2])
                    
                    midi_loop.midi_light(strip,touch_x,touch_y,midi_data[touch_x][touch_y])
                
        #用户登录
        elif data["type"] == 'login':
            USERS[data["content"]] = websocket
            if len(USERS) != 0:  
                message = json.dumps(
                    {"type": "login", "content": data["content"], "user_list": list(USERS.keys()),"midi_data": midi_data})
                

        #用户退出
        elif data["type"] == 'logout':
            del USERS[data["content"]]
            if len(USERS) != 0:  
                message = json.dumps(
                    {"type": "logout", "content": data["content"], "user_list": list(USERS.keys())})            

        # 群发
        await asyncio.wait([user.send(message) for user in USERS.values()])


start_server = websockets.serve(chat, "192.168.68.139", 1234)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
