
import logging

class ApiEndPoint:
    
    def __init__(self) -> None:
        self.Calls={}
        self.ContentTypeTextHtml=("Content-type", "text/html")
        self.ContentTypeTextJson=("Content-type", "application/json")
        self.AccessControlAllowOrigin=("Access-Control-Allow-Origin", "*")  
        self.AccessControlAllowHeaders=("Access-Control-Request-Headers", "*")  
        self.AccessControlAllowMethod=("Access-Control-Request-Method", "*")  
        self.logger = logging.getLogger('server.REST_API')
        pass
    
    def resolve(self, path):
        try:
            paths = path.split("/")
            if len(paths)>1:
                return self.Calls[paths[0]].resolve("/".join(paths[1:]))
            return self.Calls[paths[0].lower()]
        except KeyError as ex:
            return self.notFound

    def sendOk(self, server):
        self.send(server, 200, [self.ContentTypeTextHtml, self.AccessControlAllowOrigin, self.AccessControlAllowHeaders, self.AccessControlAllowMethod], [""] )
    
    def notFound(self, server):
        self.logger.error("error resolving %s call to %s", str(server.command),str(server.path))
        self.send(server, 404, [self.ContentTypeTextHtml, self.AccessControlAllowOrigin, self.AccessControlAllowHeaders, self.AccessControlAllowMethod], ["<html><head><title>NOT FOUND</title></head>","<body>","<p>404 NOT FOUND","<p>Request: %s</p>" % server.path,"</body></html>"] )
    
    def send(self, server, code, headers, data):
        server.send_response(code)
        for head, type in headers:
            server.send_header(head, type)
        server.end_headers()
        for dat in data:
            server.wfile.write(bytes(dat, "utf-8"))

class PostApiEndpint(ApiEndPoint):
    def notFound(self, server, data):
        super().notFound(server)
    
