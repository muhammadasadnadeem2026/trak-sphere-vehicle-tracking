# Firmware

`prototype/` holds the first firmware for the STM32F429 tracker (September 2024): display, ADC battery monitoring
for the primary and backup battery, and the serial link used by the GPS and GSM modules.

The finished firmware runs as a state machine: initialise → read sensors → parse GPS → upload over GSM → update the
display, with a watchdog. Its flow is shown in [`docs/images/firmware-flowchart.png`](../docs/images/firmware-flowchart.png).

**Build:** IAR Embedded Workbench for ARM, STM32F4 Standard Peripheral Library and the open-source
STM32F4 libraries by Tilen Majerle (`tm_stm32f4_*`). The vendor libraries are not included here; add them to the project to build.
