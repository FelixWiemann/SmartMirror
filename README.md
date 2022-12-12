# smart mirror project


## general overview; my hardware setup 
bananapi connected to old laptop screen
bananapi connected via wifi

## bananapi setup:
- setup pi with latest armbian
- install apache2 and configure it
- build this project and put it on the server directory
- create new user with auto logon
- autostart firefox with localhost as target (Exec=/snap/bin/firefox -kiosk localhost)

## build and deploy to machine
- set variable $target
- run build.sh