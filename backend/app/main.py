from fastapi import FastAPI, HTTPException
from kubernetes import client, config

app = FastAPI()

config.load_kube_config()

@app.get("/processors")
def list_processors():
    api = client.CustomObjectsApi()
    try:
        processors = api.list_namespaced_custom_object(
            group="example.com",
            version="v1",
            namespace="default",
            plural="processors"
        )
        return processors['items']
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/processors/{service_name}")
def get_processor(service_name: str):
    api = client.CustomObjectsApi()
    try:
        processor = api.get_namespaced_custom_object(
            group="example.com",
            version="v1",
            namespace="default",
            plural="processors",
            name=service_name
        )
        return processor
    except client.ApiException as e:
        if e.status == 404:
            raise HTTPException(status_code=404, detail="Processor not found")
        else:
            raise HTTPException(status_code=500, detail=str(e))
