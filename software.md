
## build and deploy to machine
- pull latest changes / do your local changes
- set variable $target
- run build.sh
  the script will build latest application (ng build), zip the build and copy it to the target
  also python will be copied and pushed

- log files can be found under /var/logs/mirror/server.log
  
## Software architecture
```mermaid
graph TD;
    display[angular website]
    python[py server]
    weather[openweather api]
    log[logging]

    apache2--host-->display
    hardware--pyGPIO.v2-->python
    system <--get sys info-->python
    python<--control system-->display
    display<--retrieve weather-->weather
    python -->log
```

### screen power

Screen is turned off if no motion is detected.
This is to reduce the power consumption

for this the pi has an output directly wired to the power button of the screen controller
see [schematics](electric.md#wiring)

```mermaid
graph TD;
    motionsens[Motion Sensor]
    screen[Screen]
    python[py server]

    motionsens--detects motion-->python
    python--turns on/off screen-->screen

```

## remote access
the mirror can be connected to via it's public IP with a webbrowser
this allows remote control of the mirror.
be aware that the python server is open to every remote; you should not put it into the open net

