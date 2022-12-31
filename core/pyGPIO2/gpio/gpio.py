HIGH=1
INPUT=0
LOW=0
OUTPUT=1
PULLDOWN=2
PULLUP=1
__doc__=""

## init
# 
def init():
    pass
## get cfg of pin
def getcfg(pin):
    return 0

## read value of pin
def input(pin):
    return 0

## write value to pin
def output(pin, value):
    pass

## Set pull-up/pull-down.
def pullup(pin, cfg):
    pass

## configure pin as cfg
def setcfg(pin, cfg):
    pass
