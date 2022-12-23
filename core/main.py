# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
import psutil
import socket
import os

hostName = "localhost"
serverPort = 12345

class ApiEndPoint:
    
    def __init__(self) -> None:
        self.Calls={}
        self.ContentTypeTextHtml=("Content-type", "text/html")
        self.ContentTypeTextJson=("Content-type", "application/json")
        self.AccessControlAllowOrigin=("Access-Control-Allow-Origin", "*")
        pass
    
    def resolve(self, path):
        try:
            paths = path.split("/")
            if len(paths)>1:
                print ("/".join(paths[1:]))
                print (self.Calls[paths[0]])
                return self.Calls[paths[0]].resolve("/".join(paths[1:]))
            return self.Calls[paths[0].lower()]
        except KeyError as ex:
            return self.notFound
        
    def notFound(self, server):
        self.send(server, 404, [self.ContentTypeTextHtml], ["<html><head><title>NOT FOUND</title></head>","<body>","<p>404 NOT FOUND","<p>Request: %s</p>" % server.path,"</body></html>"] )
    
    def send(self, server, code, headers, data):
        server.send_response(code)
        for head, type in headers:
            server.send_header(head, type)
        server.end_headers()
        for dat in data:
            server.wfile.write(bytes(dat, "utf-8"))

class HttpEndPoint(ApiEndPoint):
    
    def __init__(self) -> None:
        super().__init__()
    

class SystemApiEndPoint(ApiEndPoint):
    def __init__(self):
        super().__init__()
        self.Calls["temp"]=self.temp
        self.Calls["cpu"]=self.cpu
        self.Calls["ram"]=self.ram
        self.Calls["data"]=self.data
        self.Calls["ip"]=self.ip
    
    def getTemp(self):
        print (os.name)
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
    

class RestApi(ApiEndPoint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["system"] = SystemApiEndPoint()
        self.Calls["favicon.ico"]=self.favicon
        self.Calls[""] = self.root
        pass

    def root(self, server):
        self.send(server, 200, [self.ContentTypeTextHtml], ["<html><head><title>https://pythonbasics.org</title></head>","<body>","<p>Request: %s</p>" % server.path,"</body></html>"] )
    
    def favicon(self, server):
        server.send_response(200)
        server.send_header("Content-type", "text/html")
        server.end_headers()


apiEndpoint=RestApi()

class CoreServer(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            apiEndpoint.resolve(self.path[1:])(self)
        except Exception as ex:
            self.send_response(400)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(str(ex), "utf-8"))
            raise ex


def main():
    webServer = HTTPServer((hostName, serverPort), CoreServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass
    print("stopping server.")

    webServer.server_close()
    print("Server stopped.")


if __name__=="__main__":
    main()