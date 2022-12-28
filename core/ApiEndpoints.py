
from RestApi import ApiEndPoint
from SystemApiEndpoint import SystemApiEndPoint
from RestApi import PostApiEndpint
import logging

class HttpEndPoint(ApiEndPoint):
    def __init__(self) -> None:
        super().__init__()
    
class RestApi(ApiEndPoint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["system"] = SystemApiEndPoint()
        self.Calls["favicon.ico"]=self.favicon
        self.Calls[""] = self.root

    def root(self, server):
        self.send(server, 200, [self.ContentTypeTextHtml], ["<html><head><title>https://pythonbasics.org</title></head>","<body>","<p>Request: %s</p>" % server.path,"</body></html>"] )
    
    def favicon(self, server):
        server.send_response(200)
        server.send_header("Content-type", "text/html")
        server.end_headers()

class LogApiEndpoint(PostApiEndpint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["debug"] = self.debug
        self.Calls["error"] = self.error
        self.Calls["warn"] = self.warn
        self.Calls["info"] = self.info
        self.Calls["critical"] = self.critical
        self.angularLog = logging.getLogger('angular')

    def debug(self, server, data):
        self.angularLog.debug(data)
        self.sendOk(server)

    def error(self, server, data):
        self.angularLog.error(data)
        self.sendOk(server)
    
    def warn(self, server, data):
        self.angularLog.warn(data)
        self.sendOk(server)

    def info(self, server, data):
        self.angularLog.info(data)
        self.sendOk(server)
    
    def critical(self ,server, data):
        self.angularLog.critical(data)
        self.sendOk(server)

class PostApi(PostApiEndpint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["console"] = LogApiEndpoint()