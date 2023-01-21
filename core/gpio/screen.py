from utils.BackgroundObject import BackgroundObject
from gpio.motionsensor import MotionSensor
from pyGPIO2.gpio import port, gpio
import time 

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
        
    def work(self):
        self.onCount = self.onCount - 1
        if self.onCount < 0:
            self.sensor.start()
            self.logger.debug("starting to monitor motion sensor")
            self.stop()

    def motionChanged(self, newValue):
        if self.screen_on:
            self.turnScreenOff()
        else:
            self.turnScreenOn()
        if self.screen_on != newValue==1:
            self.logger.error("new screen state does not match motion sensor value")

    def turnScreenOn(self):
        self.logger.debug("turned screen on")
        self.screen_on=True
        self.pulseOut()
        pass

    def turnScreenOff(self):
        self.logger.debug("turned screen off")
        self.screen_on=False
        self.pulseOut()
        pass
    
    def pulseOut(self):
        gpio.output(self.pin, 1)
        time.sleep(0.1)
        gpio.output(self.pin, 0)