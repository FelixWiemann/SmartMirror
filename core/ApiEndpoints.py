
from RestApi import ApiEndPoint
from SystemApiEndpoint import SystemApiEndPoint
from RestApi import PostApiEndpint


class HttpEndPoint(ApiEndPoint):
    def __init__(self) -> None:
        super().__init__()
    
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

class LogApiEndpoint(PostApiEndpint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["log"] = self.log

    def log(self,server, data):
        print(data)

class PostApi(PostApiEndpint):
    def __init__(self) -> None:
        super().__init__()
        self.Calls["console"] = LogApiEndpoint()