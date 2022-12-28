
import json
import os
import socket
import psutil

from RestApi import ApiEndPoint

class SystemApiEndPoint(ApiEndPoint):
    def __init__(self):
        super().__init__()
        self.Calls["temp"]=self.temp
        self.Calls["cpu"]=self.cpu
        self.Calls["ram"]=self.ram
        self.Calls["data"]=self.data
        self.Calls["ip"]=self.ip
    
    def getTemp(self):
        if os.name == "nt":
            return  {"tmp":"not implemented on windows"}
        return {"tmp": round(int(open("/sys/class/thermal/thermal_zone0/temp", "r").readlines()[0])/1000)}

    def getRamUsage(self):
        return {"ram_usage": psutil.virtual_memory().percent}

    def getCpuUsage(self):
        return {"cpu_usage": psutil.cpu_percent()}       

    def get_ip(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0)
        try:
            # doesn't even have to be reachable
            s.connect(('10.254.254.254', 1))
            IP = s.getsockname()[0]
        except Exception:
            IP = '127.0.0.1'
        finally:
            s.close()
            return {"local_ip": IP}

    def ip(self, server):
        self.send(server, 200, [self.ContentTypeTextJson],[json.dumps(self.get_ip())])

    def data(self, server):
        self.send(server, 200, [self.ContentTypeTextJson, self.AccessControlAllowOrigin],[json.dumps(self.getTemp()|self.getRamUsage()|self.getCpuUsage()|self.get_ip())])

    def temp(self, server):
        self.send(server, 200, [self.ContentTypeTextJson],[json.dumps(self.getTemp())])

    def cpu(self, server):
        self.send(server, 200, [self.ContentTypeTextJson],[json.dumps(self.getCpuUsage())])

    def ram(self, server):
        self.send(server, 200, [self.ContentTypeTextJson],[json.dumps(self.getRamUsage())])

    def ip(self, server):
        self.send(server, 200, [self.ContentTypeTextJson],[json.dumps(self.get_ip())])
    
