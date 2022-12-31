import logging
from gpio.motionsensor import MotionSensor
from pyGPIO2.gpio import port

class Screen():

    def __init__(self) -> None:
        self.logger = logging.getLogger("gpio.screen")
        self.sensor = MotionSensor(10,self.motionChanged, port.GPIO2)
        self.sensor.start()

    def motionChanged(self, newValue):
        self.logger.debug("detected change: %d", newValue)