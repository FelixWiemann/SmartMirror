import logging

def initLogger():
    logging.basicConfig(filename='server.log',format='%(asctime)s:%(levelname)s:%(name)s:%(message)s', level=logging.DEBUG)
    logging.info("initialized logger...")
    pass

    