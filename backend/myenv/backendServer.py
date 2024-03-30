import serial

# import requests
# import requests
# Open the serial port
ser = serial.Serial('COM5', 115200)  # Replace 'COM1' with the appropriate port and baud rate

while True:
    # Read the serial data
    
    serial_data = ser.readline().decode().strip()
    # print(serial_data)
    serial_data = serial_data.split(",")
    print(serial_data[1])

    # Process the serial data here
    # ...

# Close the serial port
ser.close()

# # Send the serial data as a POST request
# url = "http://localhost:3000/receive"
# data = {
#     "serial_data": serial_data
# }

# response = requests.post(url, data=data)

# if response.status_code == 200:
#     print("POST request successful!")
# else:
#     print("POST request failed.")