const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();
app.use(cors());

const K8S_API_URL = "https://kubernetes.default.svc";
const K8S_NAMESPACE = "default"; 
const CRD_NAME = "processors";  
const API_GROUP = "example.com";  
const API_VERSION = "v1";

// Check if running inside Kubernetes
const IS_KUBERNETES = fs.existsSync("/var/run/secrets/kubernetes.io/serviceaccount/token");
let K8S_TOKEN = "";

// Read the ServiceAccount token if inside Kubernetes
if (IS_KUBERNETES) {
    K8S_TOKEN = fs.readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/token", "utf8");
} else {
    console.warn("⚠️ Running outside Kubernetes. Using dummy token.");
    K8S_TOKEN = "DUMMY_TOKEN"; // Placeholder token for local testing
}

// Ignore SSL certificate verification for self-signed Kubernetes API certificates
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

// API Route: Fetch Processor CRD Data
app.get("/api/crd", async (req, res) => {
    try {
        if (!IS_KUBERNETES) {
            return res.json({ message: "Running outside Kubernetes, CRD data unavailable" });
        }

        const response = await axios.get(
            `${K8S_API_URL}/apis/${API_GROUP}/${API_VERSION}/namespaces/${K8S_NAMESPACE}/${CRD_NAME}`,
            {
                headers: {
                    Authorization: `Bearer ${K8S_TOKEN}`,
                    Accept: "application/json",
                },
                httpsAgent,
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching CRD:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch CRD" });
    }
});

// Health Check Route
app.get("/", (req, res) => {
    res.send("✅ Processor Backend API is running!");
});

// Start Express Server
const PORT = 5050;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
