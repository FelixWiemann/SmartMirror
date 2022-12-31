from http.server import BaseHTTPRequestHandler, HTTPServer
from server import Server
import utils.logger
import time
import logging

hostName = "localhost"
serverPort = 12345

def main():
    utils.logger.initLogger()
    server = Server(hostName, serverPort)
    server.start()
    try:
        while (True):
            time.sleep(10)
    finally:
        server.stop()
        logging.getLogger().info("shutting down")
    
    
if __name__=="__main__":
    main()