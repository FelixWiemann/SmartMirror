import logging
from gpio.motionsensor import MotionSensor
from pyGPIO2.gpio import port, gpio
import time 

class Screen():

    def __init__(self) -> None:
        self.logger = logging.getLogger("gpio.screen")
        self.screen_on = True
        self.pin = port.GPIO27
        gpio.setcfg(self.pin, gpio.OUTPUT)
        self.sensor = MotionSensor(10,self.motionChanged, port.GPIO17)
        self.sensor.start()

    def motionChanged(self, newValue):
        if self.screen_on:
            self.turnScreenOff()
        else:
            self.turnScreenOn()

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