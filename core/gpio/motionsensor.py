from utils.BackgroundObject import BackgroundObject
from pyGPIO2.gpio import gpio

## HC-SR501 PIR motion sensor
class MotionSensor(BackgroundObject):

    MOTION_DETECTED = 1
    NO_MOTION_DETECTED = 0
    UNDEFINED=-1

    def __init__(self, cycleTime, callback, pin) -> None:
        super().__init__(cycleTime, "gpio.mirror")
        self.callback = callback
        self.currenState = MotionSensor.UNDEFINED
        self.pin = pin
        # set pin to pulldown and input
        gpio.pullup(self.pin, 0)
        gpio.pullup(self.pin, gpio.PULLDOWN)
        gpio.setcfg(self.pin, gpio.INPUT)
        
    def work(self):
        self.detectMotion()

    def detectMotion(self):
        newState = self.readSensor()
        if (self.currenState == newState):
            return
        self.callback(newState)
        self.currenState = newState

    def readSensor(self):
        val = gpio.input(self.pin)
        print (val)
        return MotionSensor.MOTION_DETECTED if val>0.5 else MotionSensor.NO_MOTION_DETECTED