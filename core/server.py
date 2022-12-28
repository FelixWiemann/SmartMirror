
from http.server import BaseHTTPRequestHandler, HTTPServer
import logging

from ApiEndpoints import PostApi, RestApi

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

class Server():
    def __init__(self, hostName, serverPort) -> None:
        self.webServer = HTTPServer((hostName, serverPort), CoreServer)
        self.logger = logging.getLogger("Server")
        self.logger.info("Server started http://%s:%s" % (hostName, serverPort))

    def run(self):
        try:
            self.webServer.serve_forever()
        except KeyboardInterrupt:
            pass
        self.logger.info("stopping server.")

        self.webServer.server_close()
        self.logger.info("Server stopped.")
