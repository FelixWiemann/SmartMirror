
## bananapi setup:
- setup pi with latest armbian
- install apache2 and configure it with defaults
- create new user with auto logon & xserver command to hide cursor (new file \etc\lightdm\lightdm.conf.d\12-mirror.conf with content
```  
    [SeatDefaults]
    autologin-user=<user>
    autologin-user-timeout=0
    xserver-command=X -bs -core -nocursor
```
)
- install and autostart python with web.py as target:
    ```python3 /var/mirror/web.py```

- install the following packages
    - sudo apt-get install python3-lxml
    - sudo apt-get install python3-pyside2.qtcore python3-pyside2.qtwidgets
    sudo apt-get install libgtk-3-dev
    sudo apt-get install python-webkit python-webkit-dev

    sudo apt install python3-gi python3-gi-cairo gir1.2-gtk-3.0 gir1.2-webkit2-4.0 pywebview

- install pip as root
```
 echo "getting pip" ;
 sudo curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
 echo "installing pip" ;
 sudo python3 get-pip.py
```

 sudo python3 -m pip install pyqt5

- add crontab to start /var/mirror/startup.sh on system boot