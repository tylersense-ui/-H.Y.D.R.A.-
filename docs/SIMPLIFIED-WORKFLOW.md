# 🐍 H.Y.D.R.A. v0.1.1-LITE - Workflow Simplifié

**Date**: 2026-03-15  
**Hotfix**: Telemetry Lite pour BN1.1 early game

---

## ✅ CE QUI A CHANGÉ

### Nouveaux Fichiers
- **telemetry-daemon-lite.js** - Version <2GB RAM pour early game
- **manifest.json** - Mis à jour (10 fichiers au lieu de 9)
- **deploy-hydra.js** - Auto-update intégré

### Fichiers Supprimés
- ~~deploy-lite-fix.js~~ - Inutile, le système modulaire gère tout

---

## 🚀 WORKFLOW UNIQUE

**Un seul script pour tout: `deploy-hydra.js`**

### Première Installation

```bash
# Une seule fois
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/deploy-hydra.js deploy-hydra.js
```

### Déploiement / Mise à Jour

```bash
# À chaque fois (déploiement OU mise à jour)
run deploy-hydra.js
```

**Le script fait automatiquement**:
1. ✅ Vérifie si deploy-hydra.js a une nouvelle version
2. ✅ Se met à jour si nécessaire
3. ✅ Télécharge manifest.json
4. ✅ Télécharge TOUS les fichiers listés dans le manifest
5. ✅ Crée la structure de dossiers
6. ✅ Vérifie l'installation

---

## 📋 WORKFLOW COMPLET

### 1️⃣ Push sur GitHub

```bash
cd HYDRA/
git add .
git commit -m "hotfix: telemetry-lite + auto-update deploy script"
git push origin main
```

### 2️⃣ Déployer In-Game

```bash
# Si première fois
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/deploy-hydra.js deploy-hydra.js

# Déployer (marche pour install ET updates)
run deploy-hydra.js
```

**Si le script se met à jour**:
```
⚠️  DEPLOY SCRIPT UPDATED
Please run 'run deploy-hydra.js' again
```

→ Relancer simplement: `run deploy-hydra.js`

### 3️⃣ Lancer Telemetry Lite

```bash
run /tools/telemetry-daemon-lite.js
```

**Attendu**: <2GB RAM, tourne sans problème sur home 8GB

### 4️⃣ Collecter Logs (après 2 min)

```bash
cat /state/network-status.json
cat /state/performance-metrics.json
cat /state/player-stats.json
cat /state/daemon-heartbeat.json
```

### 5️⃣ Fournir à Claude

Copier les 4 JSON et les envoyer.

---

## 🎯 AVANTAGES DU SYSTÈME

### Un Seul Point d'Entrée
- ✅ Pas besoin de wget à chaque fois
- ✅ Juste `run deploy-hydra.js`
- ✅ Auto-update du script lui-même
- ✅ Auto-deploy de tous les fichiers du manifest

### Toujours à Jour
- Le deploy-hydra.js vérifie sa propre version
- Télécharge manifest.json à chaque run
- Deploy tous les fichiers listés dans le manifest
- Si nouveau fichier ajouté au manifest → auto-téléchargé

### Modulaire
- Ajouter un fichier? → Ajouter au manifest.json
- Push sur GitHub
- `run deploy-hydra.js` → Tout se met à jour

---

## 📦 MANIFEST.JSON - Le Cerveau

**Tous les fichiers du framework sont listés ici**:
```json
{
  "files": {
    "/lib/debug.js": {...},
    "/lib/constants.js": {...},
    "/tools/telemetry-daemon-lite.js": {...},
    ...
  }
}
```

**Le deploy-hydra.js lit le manifest et télécharge tout.**

---

## ⚠️ IMPORTANT

### Toujours Utiliser deploy-hydra.js

❌ **JAMAIS faire**:
```bash
wget https://.../.../telemetry-daemon-lite.js /tools/telemetry-daemon-lite.js
```

✅ **TOUJOURS faire**:
```bash
run deploy-hydra.js
```

### Pourquoi?

- Un seul système de déploiement
- Gère les dépendances
- Suit les versions
- Auto-update
- Vérifie l'intégrité

---

## 🔄 WORKFLOW FUTUR

### Ajouter un Nouveau Fichier

**Claude**:
1. Code le nouveau fichier
2. L'ajoute au manifest.json
3. Push sur GitHub

**Vous**:
1. `run deploy-hydra.js`
2. C'est tout ✅

### Mettre à Jour un Fichier

**Claude**:
1. Modifie le fichier
2. Met à jour version dans manifest.json
3. Push sur GitHub

**Vous**:
1. `run deploy-hydra.js`
2. C'est tout ✅

---

## 🎯 RÉSUMÉ ULTRA-COURT

**Un seul script, une seule commande**:

```bash
run deploy-hydra.js
```

**Il fait tout:**
- Se met à jour lui-même
- Télécharge le manifest
- Deploy tous les fichiers
- Vérifie l'installation

**C'est le seul script à utiliser. Toujours.**

---

**H.Y.D.R.A. v0.1.1-LITE - Système modulaire unifié** 🐍
