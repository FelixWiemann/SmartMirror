from RestApi import ApiEndPoint
from utils.BackgroundObject import BackgroundObject
import os
from main import isPi


class HeartBeat(ApiEndPoint, BackgroundObject):
    def __init__(self):
        ApiEndPoint.__init__(self)
        BackgroundObject.__init__(self, 20, "server.HeartBeat")
        self.Calls["ping"] = self.ping
        self.beatsSinceLastCycle = 1

    def work(self):
        if self.beatsSinceLastCycle == 0:
            self.logger.error("heartbeat failed!")
            self.stop()
            # reboot on linux
            if isPi: 
                self.logger.warn("rebooting...")
                os.system('sudo shutdown -r now')
        self.beatsSinceLastCycle = 0

    def ping(self, server):
        self.beatsSinceLastCycle = self.beatsSinceLastCycle + 1
        self.send(server, 200, [self.ContentTypeTextHtml, self.AccessControlAllowOrigin, self.AccessControlAllowHeaders, self.AccessControlAllowMethod],[""])
        # only start after first connection
        if not self.run:
            self.start()
    