import lightgbm as lgb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from joblib import load
from sklearn.ensemble import RandomForestClassifier


from joblib import load
import openai


openai.api_key = ""

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://localhost:8080",
    "http://localhost:5173
]



app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WaterMeterData(BaseModel):
    N: float
    P: float
    K: float
    Temp: float
    Humidity: float
    Ph: float
    Rainfall: float
    
class ChatPrompt(BaseModel):
    prompt: str

@app.post("/predict")
def predict_water_meter(data: WaterMeterData):
    model = lgb.Booster(model_file='mode (1).txt')
    newdata = model.predict([[data.N, data.P, data.K, data.Temp, data.Humidity, data.Ph, data.Rainfall]])
    
    array1 = ["apple","banana","blackgram","chickpea","coconut","coffee","cotton","grapes","jute","kidneybeans","lentil","maize","mango","mothbeans","mungbean","muskmelon","orange","papaya","pigeonpeas","pomegranate","rice","watermelon"]
    index = 0
    listConvert = newdata.squeeze().tolist()
    m = listConvert.sort()
    print(m)
    
    print(sorted(listConvert))
    a = newdata.max()
    index1 = 0
    index2 = 0
    index3 = 0
    for i in range(0, 21):
        if newdata[0][i] == listConvert[21]:
            index1 = i
        elif newdata[0][i] == listConvert[20]:
            index2 = i
        elif newdata[0][i] == listConvert[19]:
            index3 = i
    
    element1 = array1[index1]
    element2 = array1[index2]
    element3 = array1[index3]

    return {"element1": element1, "element2": element2, "element3": element3}

@app.post("/chatcompletions")
def chat_completions(prompt:ChatPrompt):

    messages = [
    {"role":"system","content":"you are agriculture consultent and only answer to questions related to agriculture an methods to conserve water in agriculture."}
    ]

    messages.append(
            {"role":"user","content":prompt.prompt}
        )
    chat= openai.ChatCompletion.create(
        model="gpt-3.5-turbo",messages=messages
    )
    reply=chat.choices[0].message.content
    print(f"chatGPT, {reply} ")

    return reply

@app.get("/waterpredict")
def get_root():
    loadedModel = load('updated.joblib')
  
    
    return {"message": "Welcome to the water meter API!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5500)
