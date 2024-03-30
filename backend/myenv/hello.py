import serial
import keyboard
import requests
import time
# Open the serial port
# try:
#     ser = serial.Serial('COM5', 115200)  # Replace 'COM1' with the appropriate port and baud rate
# except:
#     print("serial port not connected")
# Continuously read serial data

ser = serial.Serial('COM5', 115200)  # Replace 'COM1' with the appropriate port and baud rate
while True:
    try:
        if keyboard.is_pressed('p'):
            ser.close()
            break
        if ser.in_waiting > 0:
            data = ser.readline().decode().strip()
            data = data.split(",")
            print(data[0])
            print(data[1])
            print(data[2])
            print(data[3])
            print(data[4])
            print(data[5])
            print(data[6])
            print(data[7])
            print(data[8])
            print(data[9])
            print(data[10])
            print(data[11])
            
            url = "http://localhost:3000/receive"
            data = {
                "humidity": data[1],
                "temperature": data[3],
                "flowrate": data[5],
                "waterosumption": data[7],
                "LDR": data[9],
                "SoilMoisture": data[11]
            }

            response = requests.post(url, json=data)

            if response.status_code == 200:
                print("POST request successful!")
            else:
                print("POST request failed.")
            
            time.sleep(0.3)

        
    except Exception as e:
        print(e.args)
        ser.close()
        time.sleep(1) 
        

# Close the serial port
ser.close()