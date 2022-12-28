
## build and deploy to machine
- pull latest changes / do your local changes
- set variable $target
- run build.sh
  the script will build latest application (ng build), zip the build and copy it to the target
  also python will be copied and pushed
  
## Software architecture
```mermaid
graph TD;
    display[angular website]
    python[py server]
    weather[openweather api]

    apache2--host-->display
    hardware--pyGPIO.v2-->python
    system <--get sys info-->python
    python<--control system-->display
    display<--retrieve weather-->weather
```