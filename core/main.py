from http.server import BaseHTTPRequestHandler, HTTPServer
from server import Server
import utils.logger

hostName = "localhost"
serverPort = 12345

def main():
    utils.logger.initLogger()
    server = Server(hostName, serverPort)
    server.run()

if __name__=="__main__":
    main()