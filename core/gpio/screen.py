from utils.BackgroundObject import BackgroundObject
from gpio.motionsensor import MotionSensor
from pyGPIO2.gpio import port, gpio
import time 
from main import isPi

class Screen(BackgroundObject):

    def __init__(self) -> None:
        super().__init__(60, "gpio.screen")
        self.screen_on = True
        self.pin = port.GPIO27
        gpio.setcfg(self.pin, gpio.OUTPUT)
        gpio.pullup(self.pin, gpio.PULLDOWN)
        self.sensor = MotionSensor(5,self.motionChanged, port.GPIO17)
        self.onCount = 2
        self.start()
        self.logger.debug("initialized screen")
        self.currentState = ""
        self.On = "screen_on"
        self.Off = "screen_off"
        
    def work(self):
        self.onCount = self.onCount - 1
        if self.onCount < 0:
            self.sensor.start()
            self.logger.debug("starting to monitor motion sensor")
            self.stop()

    def motionChanged(self, newValue):
        state = self.getStateFromFile()

        if state==self.On and newValue==0:
            self.turnScreenOff()
        elif state==self.Off and newValue==1:
            self.turnScreenOn()
        else:

            self.logger.debug("change screen state after startup")

    def getStateFromFile(self):
        if isPi:
            return open("/var/mirror/state","rt").readline().strip()
        else:
             return "unknown"

    def writeNewState(self, newState):
        if isPi:
            open("/var/mirror/state","wt").write(newState)

    def turnScreenOn(self):
        self.logger.debug("turned screen on")
        self.writeNewState(self.On)
        self.pulseOut()

    def turnScreenOff(self):
        self.logger.debug("turned screen off")
        self.writeNewState(self.Off)
        self.pulseOut()

    def pulseOut(self):
        gpio.output(self.pin, 1)
        time.sleep(0.1)
        gpio.output(self.pin, 0)