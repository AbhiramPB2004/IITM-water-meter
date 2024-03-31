from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socket
import threading
from pydantic import BaseModel

class RelayModeSchema(BaseModel):
    switch: str

app = FastAPI()

RelayMode = 0

# Create a socket server
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(('localhost', 9000))
server_socket.listen(1)

def run_server():
    while True:
        # Accept a client connection
        client_socket, address = server_socket.accept()
        # print('Connected to:', address)
        
        # Send the RelayMode variable to the client
        client_socket.send(str(RelayMode).encode())
        # print("sending")

def run_api():
    @app.post("/")
    def read_root(relay_mode: RelayModeSchema):
        global RelayMode
        print(relay_mode.switch)
        if relay_mode.switch == "on":
            RelayMode = 1
            print("RelayMode is now 1")
        else:
            RelayMode = 0
            print("RelayMode is now 0")
        return {"Hello": "World"}

    @app.get("/relaymode")
    def get_relay_mode():
        return {"RelayMode": RelayMode}

    if __name__ == "__main__":
        uvicorn.run(app, host="0.0.0.0", port=8000)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start the server and API in separate threads
server_thread = threading.Thread(target=run_server)
api_thread = threading.Thread(target=run_api)

# Set the threads as daemon threads to run continuously
server_thread.daemon = True
api_thread.daemon = True

# Start the threads
server_thread.start()
api_thread.start()

try:
    # Keep the main thread alive
    while True:
        pass
except KeyboardInterrupt:
    # Close the server socket
    server_socket.close()
