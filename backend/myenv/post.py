import requests
import json

# Set up the URL
url = "http://localhost:3000/receive"

# Set up the headers
headers = {
    'Content-Type': 'application/json',
    
}

# Set up the request body
payload = {
    'name': 'John Doe',
    'email': 'johndoe@example.com',
    'age': 30
}
json_payload = json.dumps(payload)

# Make the POST request
response = requests.post(url, headers=headers, data=json_payload)

# Check the response
if response.status_code == 200:
    print('Request successful!')
    try:
        print(response.json())
    except json.decoder.JSONDecodeError:
        print('Invalid JSON response!')
else:
    print('Request failed!')
    print(response.text)