# smart mirror project

## components
- typescript + browser for display
- python core for system data + interaction with periphery

## general overview; my hardware setup 
- bananapi connected to old laptop screen
- bananapi connected via wifi to internet

## bananapi setup:
- setup pi with latest armbian
- install apache2 and configure it
- create new user with auto logon (new file \etc\lightdm\lightdm.conf.d\12-mirror.conf with content 
```  
    [SeatDefaults]
    autologin-user=<user>
    autologin-user-timeout=0
```
- install and autostart firefox with localhost as target (Exec=/snap/bin/firefox -kiosk localhost)
- install pip as root
```
 echo "getting pip" ;
 sudo curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
 echo "installing pip" ;
 sudo python3 get-pip.py
```
- add chrontab to start /var/mirror/startup.sh on system boot

## build and deploy to machine
- set variable $target
- run build.sh


## gpio
- wiringpi for bananapi: https://github.com/BPI-SINOVOIP/BPI-WiringPi2
- to interact with IO: https://github.com/rlatn1234/pyGPIO2