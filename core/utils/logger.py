import logging
from logging.handlers import RotatingFileHandler

def initLogger():
    path='server.log'
    handler = RotatingFileHandler(path, maxBytes=250000, backupCount=5)
    logging.basicConfig(format='%(asctime)s  %(levelname)-6s %(name)-20s %(message)s', level=logging.DEBUG, handlers=[handler])
    
    logging.info("initialized logger...")
    pass

    