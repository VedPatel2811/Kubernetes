const express = require("express");
const k8s = require("@kubernetes/client-node");

const app = express();
const port = 3001;

// Load Kubernetes config
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

// Replace with your CRD group, version, namespace, and kind
const group = "example.com";
const version = "v1";
const namespace = "default";
const plural = "myresources";

app.get("/crd-data", async (req, res) => {
    try {
        const response = await k8sApi.listNamespacedCustomObject(group, version, namespace, plural);
        res.json(response.body);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
});
