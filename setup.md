
## bananapi setup:
- setup pi with latest armbian
- install apache2 and configure it with defaults
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