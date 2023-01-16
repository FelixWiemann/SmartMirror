# overview

## Setup
shematic overview on the setup:

```mermaid
graph TD;
    Screen[LCD B173RW01 V.1]
    lcdcontroller((lcd controller\n m.nt68676.2))
    power[5V power via USB]
    OTG[USB OTG]
    debugperiphery[mouse/keyboard for debug]
    BPI((BananaPI\nM2 Zero))
    ctrlButtons[display control buttons:\npower, input, etc.]
    internet[internet]

    BPI--miniHDMI to HDMI-->lcdcontroller
    lcdcontroller-->Screen;
    lcdcontroller--integrated button cable-->ctrlButtons
    power-->BPI
    debugperiphery-->OTG
    OTG-->BPI
    BPI--switching output-->ctrlButtons
    12V-->lcdcontroller
    internet--wifi-->BPI
```

## Wiring
The banana pi m2 zero is the heart of the mirror.
Using the motion sensor HC-SR501 PIR the system detects motion to turn the screen on or off.
I wired a transistor in parallel to the power button of the lcd driver board. This allows switching the power button via an output of the banana pi.

here is the circuit diagram:
![Circuit diagram](./circuit.svg)

circuit diagram created with https://www.circuit-diagram.org/editor/, cddx to import can be found in the source code.


