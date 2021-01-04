#include <FastLED.h>

#define NUM_STRIPS 5
#define NUM_LEDS_PER_STRIP 36
#define NUM_LEDS NUM_LEDS_PER_STRIP * NUM_STRIPS
#define BRIGHTNESS  30

CRGB leds[NUM_STRIPS * NUM_LEDS_PER_STRIP];

int whiteNum = 2;

int midi[]={1,0,0,1,0,0,0,0,
            0,1,0,1,0,1,0,1,
            1,0,1,0,0,0,1,0,
            0,0,0,0,1,0,1,0,
            1,0,0,0,1,1,0,0};

int white[]={2,0,0,0,0,0,0,0,
             2,0,0,0,0,0,0,0,
             2,0,0,0,0,0,0,0,
             2,0,0,0,0,0,0,0,
             2,0,0,0,0,0,0,0};
int white1[]={2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0};
int white2[]={0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0};
int white3[]={0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0};
int white4[]={0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0};
int white5[]={0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0};
int white6[]={0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0};
int white7[]={0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0};
int white8[]={0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2};
             
int dog[]={0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0};

void setup() {
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, 3>(leds, 0, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<NEOPIXEL, 5>(leds, NUM_LEDS_PER_STRIP, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<NEOPIXEL, 6>(leds, 2 * NUM_LEDS_PER_STRIP, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<NEOPIXEL, 9>(leds, 3 * NUM_LEDS_PER_STRIP, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<NEOPIXEL, 10>(leds, 4 * NUM_LEDS_PER_STRIP, NUM_LEDS_PER_STRIP);

  FastLED.setBrightness(BRIGHTNESS);
//  for(int i=0;i<39;i++){
//      dog[i]=midi[i]+white[i];
//      Serial.println(dog[i]);
//    }

}
void chooseWhite(){
    switch(whiteNum) {
      case 1:
        for(int i=0;i<39;i++){
      white[i]=white1[i];
    }
        break;
      case 2:
        for(int i=0;i<39;i++){
      white[i]=white2[i];
    }
        break;
      case 3:
        for(int i=0;i<39;i++){
      white[i]=white3[i];
    }
        break;
      case 4:
        for(int i=0;i<39;i++){
      white[i]=white4[i];
    }
        break;
      case 5:
        for(int i=0;i<39;i++){
      white[i]=white5[i];
    }
        break;
      case 6:
        for(int i=0;i<39;i++){
      white[i]=white6[i];
    }
        break;
      case 7:
        for(int i=0;i<39;i++){
      white[i]=white7[i];
    }
        break;
      case 8:
        for(int i=0;i<39;i++){
      white[i]=white8[i];
    }
        break;
      default:
        Serial.println("error");
    }

}
void loop() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.print("You sent me: ");
    Serial.println(data);
  }
  chooseWhite();
  for(int i=0;i<39;i++){
      dog[i]=midi[i]+white[i];
    }
  
  //FastLED.brightness();
  for(int i=0;i<39;i++){
        if(dog[i]==1){
          for(int j=0;j<9;j++){
            int k=i*9+j;
            if(k>=0 && k<=71){
              leds[k] = CRGB::Red;
              FastLED.show();
           }else if(k>=72 && k<=143){
              leds[k] = CRGB::Yellow;
              FastLED.show();  
           }else if(k>=144 && k<=215){
              leds[k] = CRGB::Green;
              FastLED.show();  
           }else if(k>=216 && k<=287){
              leds[k] = CRGB::Blue;
              FastLED.show();  
           }else if(k>=288 && k<=359){
              leds[k] = CRGB::Purple;
              FastLED.show();  
           }
          }
        }else if(dog[i]==0){
          for(int j=0;j<9;j++){
            leds[i*9+j] = CRGB::Black;
            FastLED.show();
          }
        }else if(dog[i]==2||dog[i]==3){
          for(int j=0;j<9;j++){
            leds[i*9+j] = CRGB::White;
            FastLED.show();
          }
        }
      } 
}

void whiteLoop(){
for(int x=0;x<72;x+=9){                //loop
  for(int j=0;j<9;j++){                  //一次亮9顆燈
    for(int i=0;i<216;i+=72){            //三條同時亮
      leds[x+i+j] = CRGB::White;
      FastLED.show();
      }
    }
    for(int j=0;j<9;j++){
      for(int i=0;i<216;i+=72){
        leds[x+i+j] = CRGB::Black;
      }
    }
    delay(187.5);
  }
}

void colormidi(){
  for(int i=0;i<39;i++){
        if(midi[i]==1){
          for(int j=0;j<9;j++){
            leds[i*9+j] = CRGB::Purple;
            FastLED.show();
          }
        }else{
          for(int j=0;j<9;j++){
            leds[i*9+j] = CRGB::Black;
          }
        }
      } 
}
