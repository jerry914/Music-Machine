#!/usr/bin/env python3
# rpi_ws281x library strandtest example
# Author: Tony DiCola (tony@tonydicola.com)
#
# Direct port of the Arduino NeoPixel library strandtest example.  Showcases
# various animations on a strip of NeoPixels.
 
import time
from rpi_ws281x import *
import argparse
 
# LED strip configuration:
LED_PER_COUNT  = 64
LED_STRIP      = 5
LED_COUNT      = LED_PER_COUNT*LED_STRIP     # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53
step_length = 8

COLOR_MAP   =  {
    '0': [Color(35,122,250),Color(35,122,250),Color(35,122,250),Color(35,122,250),Color(35,122,250),Color(35,122,250),Color(35,122,250),Color(35,122,250)],
    '1': [Color(10,60,35),Color(10,60,35),Color(10,60,35),Color(10,60,35),Color(10,60,35),Color(10,60,35),Color(10,60,35),Color(10,60,35)],
    '2': [Color(35,5,0),Color(35,5,0),Color(35,5,0),Color(35,5,0),Color(35,5,0),Color(35,5,0),Color(35,5,0),Color(35,5,0)],
    '3': [Color(50,5,10),Color(50,5,10),Color(50,5,10),Color(50,5,10),Color(50,5,10),Color(50,5,10),Color(50,5,10),Color(50,5,10)],
    '4': [Color(185,0,145),Color(185,0,145),Color(185,0,145),Color(185,0,145),Color(185,0,145),Color(185,0,145),Color(185,0,145),Color(185,0,145)]
}

def init():
    # Process arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
    args = parser.parse_args()

    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)

    strip.begin()
    return strip


# Define functions which animate LEDs in various ways.
def colorWipe(strip, color, wait_ms=5):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
        strip.show()
        time.sleep(wait_ms/1000.0)
 
def beat_on(strip,idx,midi, wait_ms=5):
    
    pre_idx=int(idx)-1
    if pre_idx == -1:
        pre_idx=7
    # reset pre beat back to normal state
    for i in range(5):
        lead_pixel = step_length*pre_idx+LED_PER_COUNT*i
        for j in range(step_length):
            if(midi[i][int(pre_idx)]==1):
                strip.setPixelColor(lead_pixel+j, COLOR_MAP[str(i)][int(pre_idx)])
            else:
                strip.setPixelColor(lead_pixel+j, Color(0,0,0))
    # On beat
    for i in range(5):
        lead_pixel = step_length*int(idx)+LED_PER_COUNT*i
        for j in range(step_length):
            strip.setPixelColor(lead_pixel+j, Color(230,120,105))
    strip.show()

def clear_beats(strip,idx):
    lead_pixel = LED_PER_COUNT*idx
    for j in range(step_length):
        strip.setPixelColor(lead_pixel+j, Color(0,0,0))
    strip.show()
    

def midi_light(strip,user,idx,state):
    lead_pixel = user*LED_PER_COUNT+step_length*int(idx)
    for j in range(step_length):
        if state == 1:
            strip.setPixelColor(lead_pixel+j, COLOR_MAP[str(user)][int(idx)])
        else:
            strip.setPixelColor(lead_pixel+j, Color(0,0,0)) 
        strip.show()

if __name__ == '__main__':
    # Process arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
    args = parser.parse_args()
 
    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    
    strip.begin()

    if not args.clear:
        print('Use "-c" argument to clear LEDs on exit')
 
    try:
        while True:
            colorWipe(strip, Color(0,0,0), 10)
            colorWipe(strip,Color(200,100,100),10)
 
    except KeyboardInterrupt:
        if args.clear:
            colorWipe(strip, Color(0,0,0), 10)