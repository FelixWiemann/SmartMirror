
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

class PostApiEndpint(ApiEndPoint):
    def notFound(self, server, data):
        super().notFound(self, server)
    
