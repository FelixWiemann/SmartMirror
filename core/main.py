from sys import platform

hostName = "0.0.0.0"
serverPort = 12345

isPi = platform == "linux" or platform == "linux2"

def main():
    
    from server import Server
    import utils.logger
    import logging
    from pyGPIO2.gpio import gpio
    from gpio.screen import Screen
    import time
    import datetime

    try:
        utils.logger.initLogger()
        gpio.init()
        if isPi:
            open("/var/mirror/lastreboot","wt").write(datetime.datetime.now().strftime("%Y-%m-%d, %H:%M:%S"))
        server = Server(hostName, serverPort)
        server.start()
        screen = Screen()
    except Exception as ex:
        logging.getLogger().error("error: ",exc_info=ex)

    try:
        while (True):
            time.sleep(10)
    finally:
        server.stop()
        logging.getLogger().info("shutting down")
    
    
if __name__=="__main__":
    
    main()