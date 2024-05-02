import serial
import keyboard
import requests
import time
import socket


# Open the serial port
# try:
#     ser = serial.Serial('COM5', 115200)  # Replace 'COM1' with the appropriate port and baud rate
# except:
#     print("serial port not connected")
# Continuously read serial data

previous_relay_mode = 0
RelayMode = 0

ser = serial.Serial('COM5', 115200)  
while True:
    try:
        if keyboard.is_pressed('p'):
            ser.close()
            break
        if RelayMode == 1 and RelayMode != previous_relay_mode:
            RelayMode = 1
            previous_relay_mode = 1
            print("HIGH")
            ser.write(b'H')
        elif RelayMode == 0 and RelayMode != previous_relay_mode:
            RelayMode = 0
            previous_relay_mode = 0
            print("LOW")
            ser.write(b'L')
        if ser.in_waiting > 0:
            data = ser.readline().decode().strip()
            data = data.split(",")
            
            # Rest of the code...
            # print(data)
            # print(data[0])
            # print(data[1])
            # print(data[2])
            # print(data[3])
            # print(data[4])
            # print(data[5])
            # print(data[6])
            # print(data[7])
            # print(data[8])
            # print(data[9])
            # print(data[10])
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
            # print(data)
            
            # Create a socket object
            
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

            # Define the server address and port
            server_address = ('127.0.0.1', 9000)

            # Connect to the server
            sock.connect(server_address)

            # Receive data from the server
            received_data = sock.recv(1024).decode().strip()
            RelayMode = int(received_data)
            # Process the received data as needed
            # ...

            # Close the socket connection
            sock.close()
            
            
            

            # response = requests.get('http://localhost:8000/relaymode')
            # data = response.json()
            # # Process the data as needed
            # RelayMode = data["RelayMode"]   
            

            response = requests.post(url, json=data)
            
            # if response.status_code == 200:
            #     # print("POST request successful!")
            # else:
            #     # print("POST request failed.")
            
            time.sleep(0.5)

        
    except Exception as e:
        print(e.args)
        ser.close()
        time.sleep(1) 
        


# Close the serial port
ser.close()

