import logging
from logging.handlers import RotatingFileHandler
import os

def initLogger():
    if os.name == "nt":
        path='server.log'
    else:
        path='/var/log/mirror/server.log'
    handler = RotatingFileHandler(path, maxBytes=250000, backupCount=5)
    logging.basicConfig(format='%(asctime)s  %(levelname)-8s %(name)-20s %(message)s', level=logging.DEBUG, handlers=[handler])
    logging.info("starting server...")
    logging.info("initialized logger...")
    pass

    