
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging

from ApiEndpoints import PostApi, RestApi
from utils.BackgroundObject import BackgroundObject

apiEndpoint=RestApi()
postEndpoint=PostApi()

class CoreServer(BaseHTTPRequestHandler):
    
    def do_GET(self):
        if not hasattr(self, "logger"):
            self.logger = logging.getLogger("Server")
        try:
            apiEndpoint.resolve(self.path[1:])(self)
        except Exception as ex:
            self.send_response(400)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(str(ex), "utf-8"))
            self.logger.error("error resolving GET %s", str(ex))
            raise ex

    def do_POST(self):
        if not hasattr(self, "logger"):
            self.logger = logging.getLogger("Server")
        try:
            content_len = int(self.headers.get('Content-Length'))
            post_body = str(self.rfile.read(content_len),"utf-8")
            postEndpoint.resolve(self.path[1:])(self, post_body)
        except Exception as ex:
            self.send_response(400)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(str(ex), "utf-8"))
            self.logger.error("error resolving POST %s", str(ex))
            raise ex

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "content-type,")  
        self.send_header("Access-Control-Allow-Method", "GET,POST,OPTIONS")  
        self.end_headers()


class Server(BackgroundObject):
    def __init__(self, hostName, serverPort) -> None:
        super().__init__(0, "server") #cycle time = 0
        self.webServer = HTTPServer((hostName, serverPort), CoreServer)
        self.logger.info("starting server on http://%s:%s" % (hostName, serverPort))

    def work(self):
        try:
            self.webServer.serve_forever()
        except KeyboardInterrupt:
            pass
        self.logger.info("stopping server.")

        self.webServer.server_close()
        self.logger.info("Server stopped.")
        
    def stop(self):
        self.webServer.shutdown()
        return super().stop()
