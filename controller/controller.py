import kopf

@kopf.on.create('example.com', 'v1', 'processors')
def create_fn(spec, name, namespace, **kwargs):
    print(f"Processor {name} created with spec: {spec}")

@kopf.on.delete('example.com', 'v1', 'processors')
def delete_fn(name, namespace, **kwargs):
    print(f"Processor {name} deleted.")
