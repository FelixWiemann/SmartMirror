from http.server import BaseHTTPRequestHandler, HTTPServer
from server import Server

hostName = "localhost"
serverPort = 12345

def main():
    server = Server(hostName, serverPort)
    server.run()

if __name__=="__main__":
    main()