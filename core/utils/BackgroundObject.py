import threading
import time
import logging

class BackgroundObject():
    def __init__(self, cycleTime, name) -> None:
        self.cycleTime=cycleTime
        self.run = False
        self.name = name
        self.logger = logging.getLogger(self.name)
        pass

    def start(self):
        # if already running, return
        if self.run:
            self.logger.warn("process already running")
            return
        self.logger.debug("starting process")
        self.run=True
        t = threading.Thread(target=self._worker)
        t.name=self.name
        t.start()

    def stop(self):
        self.run = False
        self.logger.debug("stopping process")

    def _worker(self):
        while (self.run):
            try:
                self.work()
            except Exception as ex:
                self.logger.error("failed to run worker: %s - terminating", str(ex))
                self.run=False
            time.sleep(self.cycleTime)
            # detect if parent still active
            if not threading.main_thread().is_alive():
                self.logger.error("parent is dead, terminating")
                self.run=False
        self.logger.debug("process stopped")
    
    def work(self):
        self.logger.warn("no work defined for process")
        pass