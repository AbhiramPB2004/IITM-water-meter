
#include "DHT.h"

//display
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#define SCREEN_WIDTH 128 
#define SCREEN_HEIGHT 64 
#define OLED_RESET  -1 
#define SCREEN_ADDRESS 0x3C
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN,DHTTYPE);
#define relaypin 33


#define SENSOR  2
int soilmoisture = 13;
#define Button 15 //changed from 15 to 18
#define LDR 4
int LDRval;
long currentMillis = 0;
long previousMillis = 0;
int interval = 1000;
boolean ledState = LOW;
float calibrationFactor = 4.5;
volatile byte pulseCount;
byte pulse1Sec = 0;
float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;
String relayMode;
int displayMode = 0;
int soilmoisturevalue;

void IRAM_ATTR pulseCounter()
{
  pulseCount++;
}


float temperature;
float humidity;

void setup() {
  // put your setup code here, to run once:

  pinMode(soilmoisture, INPUT);
  pinMode(SENSOR, INPUT_PULLUP);
  pinMode(Button, INPUT);
  pinMode(LDR, INPUT);
  pinMode(relaypin,OUTPUT);
  digitalWrite(relaypin, LOW);
  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;

  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);


// display 
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

    // Clear the buffer.
  display.clearDisplay();

  // Display Text
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(15,5);
  display.println("AquaGuardian");
  display.display();
  delay(5000);
  display.clearDisplay();
  display.println("");


  Serial.begin(115200);
  dht.begin();
}

void loop() {

if(digitalRead(Button) == HIGH){

  if(displayMode>1){

    displayMode = 0;

  }else{

    displayMode += 1;

  }

}

if(Serial.available()>0){
 relayMode = Serial.readString();
 
//  Serial.print(relayMode);
 if(relayMode.startsWith("H") || soilmoisturevalue>1000){
  digitalWrite(relaypin, HIGH);
  // Serial.println("HIGH");
 }else{
  digitalWrite(relaypin, LOW);
  // Serial.println("LOW");
 }
}

// Serial.print("alive");
valueFinder(displayMode);
messagePrinter(humidity,temperature,flowRate,totalMilliLitres,LDRval,soilmoisturevalue);
// digitalWrite(relaypin, HIGH);

}

void valueFinder(int displayMode){


currentMillis = millis();
  if (currentMillis - previousMillis > interval) {
    
    pulse1Sec = pulseCount;
    pulseCount = 0;

    flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor;
    previousMillis = millis();


    flowMilliLitres = (flowRate / 60) * 1000;

    
    totalMilliLitres += flowMilliLitres;
    
   
  }
  

  humidity = dht.readHumidity(); 
  temperature = dht.readTemperature();
  soilmoisturevalue = analogRead(soilmoisture);
  LDRval = analogRead(LDR);
  String LDRstr = "LDR values :"+String(LDRval);
  String soilmoisturestr = "Soil moisture :"+String(soilmoisturevalue);
  String humiditystr =  "humidity :"+String(humidity);
  String Tempstr = "temperature :"+String(temperature);
  String waterflowstr = "waterflow :"+String(flowRate);
  float waterconsumLitre = totalMilliLitres/1000;
  String TotalConsumption = "water-consumtion :"+String(waterconsumLitre);
  if (displayMode == 1) {
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(15,5);
  display.println(humiditystr);
  display.println(Tempstr);
  display.println(waterflowstr);
  display.println(TotalConsumption);
  display.display();
  }else{

  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(15,5);
  display.println(LDRstr);
  display.println(soilmoisturestr);
  display.display();

  }
  display.clearDisplay();
}

void messagePrinter(int humidity,int temperature,int flowRate,int totalMilliLitres,int LDRval,int soilmoisturevalue){
  String s1 = "humidity,"+String(humidity)+","+"temperature"+","+String(temperature)+","+"flowRate"+","+String(flowRate)+","+"total water consumption"+","+String(totalMilliLitres/1000)+","+"LDR"+","+String(LDRval)+","+"soil moisture"+","+String(soilmoisturevalue);
  Serial.println(s1);
  // Serial.println(LDRval);
  delay(500);
}
