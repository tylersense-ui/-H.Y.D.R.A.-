# 🐍 H.Y.D.R.A. v0.1.0-GENESIS - Instructions de Déploiement

**Phase 1: Telemetry & Monitoring**  
**Date**: 2026-03-15  
**Opérateur**: Morpheus (Tyler)

---

## 📋 CHECKLIST COMPLÈTE

### ✅ ÉTAPE 1: Vérification des Fichiers

Tous les fichiers ont été générés dans `/mnt/user-data/outputs/HYDRA/`

**Structure attendue**:
```
HYDRA/
├── manifest.json
├── deploy-hydra.js
├── README.md
├── CHANGELOG.md
├── GIT_COMMANDS.txt (ce fichier)
├── DEPLOYMENT_INSTRUCTIONS.md (ce fichier)
│
├── lib/
│   ├── debug.js
│   ├── constants.js
│   ├── state-manager.js
│   ├── logger.js
│   ├── capabilities.js
│   ├── formulas-helper.js
│   └── network.js
│
└── tools/
    ├── telemetry-daemon.js
    └── log-action.js
```

**Vérification**:
- [ ] 13 fichiers présents
- [ ] Tous les fichiers ont un header H.Y.D.R.A.
- [ ] Version 0.1.0-GENESIS partout

---

### ✅ ÉTAPE 2: Push sur GitHub

**Ouvrir un terminal** (PAS BitBurner, votre système!)

```bash
cd /mnt/user-data/outputs/HYDRA

# Suivre les commandes dans GIT_COMMANDS.txt
git init
git add .
git commit -m "🐍 H.Y.D.R.A. v0.1.0-GENESIS - Initial commit"
git branch -M main
git remote add origin https://github.com/tylersense-ui/-H.Y.D.R.A.-.git
git push -u origin main
```

**Vérification**:
- [ ] Push réussi sans erreur
- [ ] Tous les fichiers visibles sur GitHub
- [ ] Structure de dossiers correcte sur GitHub

---

### ✅ ÉTAPE 3: Déploiement In-Game

**Dans BitBurner terminal**:

```bash
# Télécharger le script de déploiement
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/deploy-hydra.js deploy-hydra.js

# Lancer le déploiement
run deploy-hydra.js
```

**Ce qui se passe**:
1. Création des dossiers `/lib/`, `/tools/`, `/state/`
2. Téléchargement de `manifest.json`
3. Téléchargement de tous les fichiers depuis GitHub
4. Vérification de l'installation

**Attendu**:
```
✅ Success: 9 files
❌ Failed:  0 files

🎉 DEPLOYMENT COMPLETE!
```

**Vérification**:
- [ ] Déploiement sans erreur
- [ ] Tous les fichiers téléchargés
- [ ] Structure visible avec `ls /lib` et `ls /tools`

---

### ✅ ÉTAPE 4: Lancer la Telemetry

**Dans BitBurner terminal**:

```bash
# Lancer le daemon de telemetry
run /tools/telemetry-daemon.js

# OU avec debug verbeux
run /tools/telemetry-daemon.js --debug 2
```

**Attendu**:
- Une fenêtre tail s'ouvre
- Affichage du header H.Y.D.R.A.
- Cycle 1, 2, 3... toutes les 30 secondes
- Toast "Telemetry daemon started!"

**Laisser tourner**: 1-2 minutes minimum

**Vérification**:
- [ ] Daemon tourne sans erreur
- [ ] Cycles s'incrémentent
- [ ] Toast visible

---

### ✅ ÉTAPE 5: Vérifier les Fichiers /state/

**Dans BitBurner terminal**:

```bash
# Lister les fichiers state
ls /state

# Examiner chaque fichier
cat /state/network-status.json
cat /state/performance-metrics.json
cat /state/player-stats.json
cat /state/daemon-heartbeat.json
cat /state/version-tracking.json
```

**Attendu**:
- 5 fichiers JSON créés
- Contenu structuré et valide
- Timestamps récents

**Vérification**:
- [ ] 5 fichiers JSON présents
- [ ] network-status.json a des données de serveurs
- [ ] performance-metrics.json a money/threads/revenue
- [ ] player-stats.json a hackingLevel
- [ ] daemon-heartbeat.json a cycle et timestamp
- [ ] version-tracking.json a les versions

---

### ✅ ÉTAPE 6: Copier les Logs pour Claude

**CRITIQUE**: Claude a besoin de voir ces fichiers!

**Option 1: Copie directe (si VS Code sync actif)**
```bash
# Les fichiers dans /state/ sont déjà accessibles
# Ouvrir VS Code et copier le contenu de chaque fichier
```

**Option 2: Export manuel**
```bash
# Dans BitBurner, pour chaque fichier:
cat /state/network-status.json
# Copier le contenu
# Coller dans un nouveau message à Claude
```

**À fournir à Claude**:
1. `network-status.json` - CRITIQUE (serveurs avec/sans scripts)
2. `performance-metrics.json` - Revenue, threads, money
3. `player-stats.json` - Niveau, BitNode
4. `daemon-heartbeat.json` - Vérification daemon actif

**Format du message à Claude**:
```
Voici les logs de telemetry H.Y.D.R.A. v0.1.0-GENESIS:

=== network-status.json ===
{...}

=== performance-metrics.json ===
{...}

=== player-stats.json ===
{...}

=== daemon-heartbeat.json ===
{...}
```

---

### ✅ ÉTAPE 7: Logger une Action (Optionnel)

**Test du système de log d'actions**:

```bash
run /tools/log-action.js "Test du système H.Y.D.R.A. - Déploiement Phase 1 réussi"
```

**Vérification**:
- [ ] Toast "Action logged!"
- [ ] Fichier `/state/operator-actions.json` créé
- [ ] Action visible dans le fichier

---

## 🎯 RÉSUMÉ DES OBJECTIFS PHASE 1

**Ce qui est maintenant actif**:
- ✅ Framework H.Y.D.R.A. déployé
- ✅ Telemetry daemon tournant
- ✅ État du jeu monitoré en temps réel
- ✅ Logs persistants dans `/state/`
- ✅ Visibilité totale pour Claude

**Ce qui manque** (Phase 2):
- ❌ Workers (hack/grow/weaken)
- ❌ Batcher HWGW
- ❌ Auto-prep servers
- ❌ Income generation

**Next Steps**:
1. Fournir les logs à Claude
2. Claude analyse l'état du jeu
3. Claude décide de la stratégie Phase 2 selon:
   - Niveau de hacking actuel
   - Money disponible
   - Formulas.exe présent ou non
   - RAM réseau total
   - Serveurs rootés

---

## ⚠️ TROUBLESHOOTING

### Problème: Deploy échoue

**Solution**:
```bash
# Vérifier l'accès GitHub
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/manifest.json test.json
cat test.json

# Si ça marche, relancer deploy
run deploy-hydra.js
```

### Problème: Telemetry ne crée pas les fichiers

**Solution**:
```bash
# Vérifier que le daemon tourne
ps

# Tuer et relancer
kill <PID>
run /tools/telemetry-daemon.js --debug 2

# Attendre 30s pour le premier cycle
```

### Problème: Fichiers /state/ vides

**Solution**:
- Attendre au moins 1 cycle complet (30s)
- Vérifier que le daemon n'a pas crash (ps)
- Relancer avec debug ULTRA: `--debug 3`

---

## 📞 CONTACT CLAUDE

Une fois les logs récupérés, fournissez-les à Claude avec:

```
Phase 1 H.Y.D.R.A. déployée avec succès!

Voici les logs de telemetry:
[coller les JSON]

Que devrions-nous faire ensuite?
```

Claude analysera:
- État réseau (combien de serveurs, rootés, avec scripts)
- Performance (threads actifs, revenue/s)
- Progression (niveau, money, outils disponibles)

Et recommandera:
- Stratégie Phase 2 adaptée
- Configuration du batcher
- Targets optimaux

---

**H.Y.D.R.A. v0.1.0-GENESIS**  
*L'Œil de Claude est maintenant ouvert sur le jeu.*  
*Le multi-headed framework est prêt à évoluer.*

**Bon déploiement, Opérateur!** 🐍
