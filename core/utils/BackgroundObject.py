import threading
import time

class BackgroundObject():
    def __init__(self, cycleTime) -> None:
        self.cycleTime=cycleTime
        self.run = False
        pass

    def start(self):
        # if already running, return
        if self.run:
            return
        self.run=True
        t = threading.Thread(target=self._worker)
        t.start()

    def stop(self):
        self.run = False

    def _worker(self):
        while (self.run):
            self.work()
            time.sleep(self.cycleTime)
            # detect if parent still active
            if not threading.main_thread().is_alive():
                print ("parent is dead")
                self.run=False
        print ("done working")
    
    def work(self):
        pass