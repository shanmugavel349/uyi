# UYIR (உயிர்) — Voice-First Epizootic Livestock Health Surveillance & Early-Warning Platform

> **"Voice-First Clinical AI for Rural Livestock Health, Epizootic Outbreak Detection & Proactive Community Defense."**

![UYIR Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=vite)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20REST%20API-blue?style=for-the-badge&logo=nodedotjs)
![Offline First](https://img.shields.io/badge/Storage-IndexedDB%20%2F%20Dexie.js-blue?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-Tamil%20%7C%20Hindi%20%7C%20Malayalam%20%7C%20Kannada%20%7C%20English-amber?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Workbox%20Offline-green?style=for-the-badge)

---

## 🌟 Executive Summary

In rural India and Tamil Nadu, smallholder dairy farmers face critical literacy and language barriers when reporting acute livestock sickness. Delayed reporting of contagious epizootic diseases—such as **Foot and Mouth Disease (FMD)** and **Lumpy Skin Disease (LSD)**—causes catastrophic herd mortality, milk yield collapse, and rapid cross-village transmission before district veterinary hospitals can intervene.

**UYIR (உயிர்)** bridges this last-mile gap through an **offline-first, voice-first AI surveillance platform backed by a central epidemiological REST API server**:
1. **Low-Literacy Voice Input:** Farmers simply tap a single microphone button and describe distress symptoms in colloquial Tamil, Hindi, Malayalam, Kannada, or English.
2. **Edge NLP Entity Extraction:** Canonical symptoms, affected species, and severity factors are extracted locally.
3. **3-Tier Clinical Risk Engine:** Classifies cases into **LOW (Green)**, **MODERATE (Yellow)**, or **HIGH (Red)** risk with immediate vernacular Text-to-Speech (TTS) first-aid guidance.
4. **Geospatial Outbreak Clustering:** Automatically calculates Haversine proximity clusters ($\le 5\text{km}$ within 72 hours) and projects red containment perimeters while **fuzzing farmer coordinates (~1.1km grid snapping) to protect farmer privacy**.
5. **Central REST API & Two-Way Batch Sync:** Real-time multi-device cloud synchronization between rural field farmers, Block Veterinary Surgeons, and State Admin HQ.
6. **Interactive Voice Response (IVR 1800-UYIR-VET):** Toll-free telephone dialer simulation for non-smartphone / feature-phone owners.

---

## 🚀 System Architecture & Modules

```
┌────────────────────────────────────────────────────────────────────────┐
│                        UYIR CLIENT APPLICATIONS                        │
│                                                                        │
│   👨‍🌾 Farmer Portal          🏥 Vet Clinical Desk      🛡️ State Admin   │
│   • Tap-to-Speak Voice AI   • Priority Triage Queue   • Heuristic Rules │
│   • 21-Day Heat Cycle       • GIS Containment Map     • Outbreak Radius │
│   • Animal Health Diary     • Digital Rx Prescriptions• 1800-IVR Webhook│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    OFFLINE-FIRST DEXIE.JS STORAGE                      │
│   • Client-side IndexedDB with reactive live queries                   │
│   • Full zero-connectivity operation in rural blackspots               │
│   • Automatic background sync queue when network is restored           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Two-Way Sync /api/sync
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              CENTRAL DISTRICT EPIDEMIOLOGY REST API (Node/Express)     │
│                                                                        │
│   [GET/POST /api/reports]        [GET/POST /api/clusters]              │
│   • Health triage submissions    • Haversine 5km spatial grouping      │
│   • Clinical review & Rx updates • Privacy coordinate grid snapping    │
│                                                                        │
│   [GET/POST /api/alerts]         [POST /api/ivr/call]                  │
│   • Community radar broadcasts   • 1800 Toll-Free telephone triage     │
│   • Simulated SMS notifications  • DTMF state machine logging          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health check & live database telemetry counters |
| `GET` | `/api/reports` | Retrieve triaged reports with filters (`?risk=HIGH&status=NEW`) |
| `POST` | `/api/reports` | Ingest new health report & auto-trigger 5km spatial cluster scan |
| `PUT` | `/api/reports/:id` | Update case status, clinical notes, and digital prescription (Rx) |
| `GET` | `/api/clusters` | List active 5km epizootic containment clusters |
| `POST` | `/api/clusters/scan` | Force trigger Haversine distance matrix recalculation |
| `GET` | `/api/alerts` | List community radar alerts |
| `POST` | `/api/alerts` | Broadcast community alert with simulated SMS push notification |
| `GET` | `/api/animals` | Get registered livestock census with RFID/ear-tag tracking |
| `POST` | `/api/animals` | Register / update animal in central registry |
| `GET` | `/api/risk-rules` | Get active 12-disease heuristic triage rules |
| `PUT` | `/api/risk-rules` | Batch update triage rules from State Admin Console |
| `POST` | `/api/sync` | Batch 2-way sync endpoint for reconnecting offline nodes |
| `POST` | `/api/ivr/call` | 1800-UYIR-VET interactive voice response telephone triage webhook |

---

## 🔒 Privacy-Preserving Geospatial Clustering

To prevent predatory middlemen or unauthorized parties from identifying vulnerable rural farms during disease outbreaks:
1. **Exact GPS Coordinates:** Used strictly on the device and server for distance calculations.
2. **Public Surveillance Layer:** Snapped to a $\sim 1.1\text{km}$ grid using centroid jitter:
   $$\text{Lat}_{\text{public}} = \text{round}(\text{Lat}_{\text{raw}} \times 100) / 100$$
   $$\text{Lng}_{\text{public}} = \text{round}(\text{Lng}_{\text{raw}} \times 100) / 100$$
3. **5km Red Containment Circles:** Rendered with dashed radius boundaries centered on village clusters.

---

## 💻 Installation & Quickstart

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Running Full-Stack (Frontend + Backend Server)
```bash
# 1. Navigate to UYIR workspace
cd /home/shanmugavel/projects/uyir

# 2. Install all dependencies
npm install

# 3. Start Frontend & Backend concurrently
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### Running Individual Services
```bash
# Run only Backend REST API Server
npm run dev:server

# Run only Frontend Vite Client
npm run dev:client

# Production TypeScript Build
npm run build
```

---

## 🩺 Clinical Safety & Regulatory Compliance

> **DISCLAIMER:** UYIR is an **AI-assisted early-warning triage and disease surveillance decision support tool**. It does not constitute a certified veterinary diagnosis or replace direct clinical examination by a qualified veterinarian. In case of severe illness, users are instructed to contact the nearest Government Veterinary Dispensary or dial the toll-free **1962 Animal Husbandry Helpline**.

---

## 📜 License & Acknowledgments

Developed with ❤️ for **Tamil Nadu Animal Husbandry & Veterinary Services** to safeguard rural livestock livelihoods.
Licensed under the **MIT License**.
