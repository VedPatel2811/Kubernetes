from flask import Flask, jsonify
from kubernetes import client, config

app = Flask(__name__)

# Load Kubernetes configuration
config.load_kube_config()

@app.route('/api/processors', methods=['GET'])
def get_processors():
    """
    Fetch all Processor resources from the Kubernetes cluster.
    """
    custom_api = client.CustomObjectsApi()
    group = "example.com"       # Replace with your API group
    version = "v1"              # Replace with your API version
    plural = "processors"       # Plural name of your CRD
    namespace = "default"       # Namespace where the resources are deployed

    processors = custom_api.list_namespaced_custom_object(
        group=group,
        version=version,
        namespace=namespace,
        plural=plural,
    )
    return jsonify(processors)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
