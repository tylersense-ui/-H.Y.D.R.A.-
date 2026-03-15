# 🐍 H.Y.D.R.A. Framework

**Hybrid Yielding Dynamic Resource Allocator**  
*Multi-Headed Adaptive Framework for BitBurner 2.8.1*

Version: **0.1.0-GENESIS**  
Author: **Claude (Godlike AI Operator)**  
Date: **2026-03-15**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Philosophy](#philosophy)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Roadmap](#roadmap)
- [Development](#development)

---

## 🎯 Overview

H.Y.D.R.A. is a professional, modular BitBurner framework designed for autonomous gameplay optimization. Like the mythological serpent, it adapts and regenerates - each module (head) works independently yet coordinates with the whole.

**Current Phase**: Phase 1 - Telemetry & Monitoring  
**Status**: Deployment Ready  
**Purpose**: Establish visibility into game state before building automation

---

## 🧠 Philosophy

### Core Principles

1. **Measure Before Optimize** - Telemetry first, automation second
2. **Never Reinvent** - Build on proven patterns, iterate don't rebuild
3. **Adapt Dynamically** - Calculate optimal strategies, don't hardcode
4. **Professional Standards** - Complete headers, JSDoc, changelogs, versioning

### The H.Y.D.R.A. Way

- ✅ **Learn the math** - FFD packing, EV/s optimization, batch timing
- ✅ **Use formulas** - ns.formulas API for precise calculations
- ✅ **Monitor constantly** - Telemetry daemon as Claude's "eye on the game"
- ✅ **Iterate methodically** - Phase by phase, module by module
- ❌ **Never blind-code** - Always diagnose state before building solutions

---

## ✨ Features

### Phase 1 (Current) - Telemetry & Monitoring

- **🔍 State Persistence** - JSON-based persistent state in `/state/`
- **👁️ Telemetry Daemon** - Real-time monitoring (updates every 30s)
  - Network status (servers scanned/rooted/with scripts)
  - Performance metrics (threads, revenue/s)
  - Player stats (level, money, BitNode)
  - Version tracking
  - Daemon heartbeat
- **📝 Operator Logging** - Manual action tracking
- **🐛 Debug System** - Multi-level (SILENT/NORMAL/VERBOSE/ULTRA) debug output
- **📊 Capabilities Detection** - Auto-detect Formulas.exe, port tools, player stats

### Phase 2 (Planned) - Early Batcher

- **⚔️ HWGW Batcher** - Hack/Weaken/Grow/Weaken batching
- **🎯 Auto-Prep** - Automatic server preparation (min sec / max money)
- **👷 Worker Scripts** - Minimal hack/grow/weaken workers
- **💰 First Income** - Stable revenue generation

### Phase 3+ (Planned) - Optimization & Scale

- **📦 FFD RAM Packing** - First-Fit Decreasing bin packing
- **📈 Dynamic EV/s** - Expected Value per Second optimization
- **🎯 Multi-Target** - Simultaneous batching of multiple servers
- **🌐 Network Scaling** - Auto server purchase & upgrade

---

## 🚀 Installation

### Method 1: GitHub Deployment (Recommended)

```bash
# In BitBurner terminal:
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/deploy-hydra.js deploy-hydra.js
run deploy-hydra.js
```

The deploy script will:
1. Create directory structure
2. Download all files from GitHub
3. Deploy in dependency order
4. Verify installation

### Method 2: Manual Copy

1. Clone repository locally
2. Copy files to BitBurner via VS Code + Remote API
3. Maintain directory structure:
   ```
   /lib/
   /tools/
   /state/
   ```

---

## ⚡ Quick Start

### Step 1: Deploy Framework

```bash
run deploy-hydra.js
```

### Step 2: Start Telemetry Daemon

```bash
run /tools/telemetry-daemon.js
# Optional: with verbose debug
run /tools/telemetry-daemon.js --debug 2
```

### Step 3: Let It Run (1-2 minutes)

The daemon will collect:
- Network status
- Performance metrics
- Player stats
- System versions

### Step 4: Examine State Files

```bash
ls /state
cat /state/network-status.json
cat /state/performance-metrics.json
cat /state/player-stats.json
```

### Step 5: Log Manual Actions (Optional)

```bash
run /tools/log-action.js "Achat Formulas.exe pour $5B"
run /tools/log-action.js "Rejoint faction Daedalus"
```

---

## 🏗️ Architecture

### Directory Structure

```
/
├── manifest.json              # File tracking & versions
├── deploy-hydra.js            # GitHub deployment script
├── README.md                  # This file
├── CHANGELOG.md               # Version history
│
├── /lib/                      # Reusable libraries
│   ├── debug.js               # Multi-level DEBUG system
│   ├── constants.js           # Framework configuration
│   ├── state-manager.js       # State persistence API
│   ├── logger.js              # Centralized logging
│   ├── capabilities.js        # Player capabilities detector
│   ├── formulas-helper.js     # Formulas.exe helper
│   └── network.js             # Network scanner (profit/s sorting)
│
├── /tools/                    # Standalone utilities
│   ├── telemetry-daemon.js    # Real-time monitoring daemon
│   └── log-action.js          # Operator action logger
│
├── /state/                    # Persistent state (auto-generated)
│   ├── network-status.json
│   ├── performance-metrics.json
│   ├── player-stats.json
│   ├── daemon-heartbeat.json
│   ├── operator-actions.json
│   └── version-tracking.json
│
└── /workers/                  # (Phase 2)
    /core/                     # (Phase 2)
    /managers/                 # (Phase 3)
    /ui/                       # (Phase 3)
```

### Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `debug.js` | Multi-level debug output (SILENT/NORMAL/VERBOSE/ULTRA) |
| `constants.js` | Central configuration (versions, thresholds, paths) |
| `state-manager.js` | Persistent JSON storage in `/state/` |
| `logger.js` | Simple production logging |
| `capabilities.js` | Detect Formulas.exe, port tools, player stats |
| `formulas-helper.js` | Wrapper for ns.formulas API |
| `network.js` | BFS scan, auto-crack, profit/s sorting |
| `telemetry-daemon.js` | Real-time game state monitoring |
| `log-action.js` | Manual action logging by operator |

---

## 🗺️ Roadmap

### Phase 1: Telemetry & Monitoring ✅ COMPLETE

**Goal**: Establish visibility into game state

**Deliverables**:
- ✅ State persistence system
- ✅ Telemetry daemon (30s updates)
- ✅ Operator action logger
- ✅ Debug system (4 levels)
- ✅ Capabilities detection
- ✅ Network scanner

**Status**: Deployment Ready

---

### Phase 2: Early Batcher 🔜 NEXT

**Goal**: First stable income generation

**Deliverables**:
- [ ] Minimal worker scripts (hack/grow/weaken)
- [ ] HWGW batcher (basic timing)
- [ ] Auto-prep servers (min sec / max money)
- [ ] Single-target batching
- [ ] Revenue monitoring

**Prerequisites**:
- Telemetry running
- Network analysis complete
- Target selection based on profit/s

---

### Phase 3: Optimization & Scale 🔮 FUTURE

**Goal**: Maximize $/s through advanced techniques

**Deliverables**:
- [ ] FFD RAM packing
- [ ] Dynamic EV/s optimization
- [ ] Multi-target batching
- [ ] Auto server purchase & upgrade
- [ ] Dashboard UI

**Prerequisites**:
- Formulas.exe ($5B)
- Stable batch income
- Large RAM network

---

## 👨‍💻 Development

### Standards

Every file must have:
- ✅ ASCII art header with version
- ✅ Author: Claude (Godlike AI Operator)
- ✅ Complete JSDoc
- ✅ Usage examples
- ✅ Changelog section
- ✅ Icons for readability (✅ ❌ ⚠️ 💰 🌐 ⚡ 🎯 🚀)

### Debug Levels

```javascript
import { Debug, DEBUG_NORMAL } from "/lib/debug.js";

const debug = new Debug(ns, "MODULE_NAME", DEBUG_NORMAL);

debug.normal("Important info");       // Level 1+
debug.verbose("Detailed info");       // Level 2+
debug.ultra("Debug everything");      // Level 3

debug.toastSuccess("Operation done!"); // Always visible
```

### Git Workflow

```bash
# Local development
git add .
git commit -m "feat: add new module"
git push origin main

# In-game deployment
run deploy-hydra.js  # Auto-pulls from GitHub
```

---

## 📊 Telemetry Data Structure

### network-status.json

```json
{
  "timestamp": "2026-03-15T12:00:00.000Z",
  "totalServersScanned": 69,
  "totalServersRooted": 43,
  "totalServersWithScripts": 26,
  "totalServersEmpty": 17,
  "totalRamNetwork": 2048,
  "totalRamUsed": 512,
  "ramUsagePercent": 25,
  "serversDetail": [...]
}
```

### performance-metrics.json

```json
{
  "timestamp": "2026-03-15T12:00:00.000Z",
  "currentMoney": 500000000,
  "revenuePerSecond": 1250000,
  "totalThreads": 5000,
  "hackingLevel": 150
}
```

---

## 🐛 Troubleshooting

### Deployment fails

```bash
# Check repository access
wget https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main/manifest.json test.json

# Verify file downloaded
cat test.json
```

### Telemetry daemon not saving files

```bash
# Check if /state/ exists
ls /state

# Manually create if needed (shouldn't be necessary)
# BitBurner creates dirs on write

# Check daemon is running
ps
```

### Files not updating from GitHub

```bash
# Re-run deployment
run deploy-hydra.js

# It will overwrite existing files with latest from GitHub
```

---

## 📝 License

This framework is developed by Claude for BitBurner gameplay optimization.  
Feel free to use, modify, and share.

---

## 🤝 Credits

**Developed by**: Claude (Godlike AI Operator)  
**Inspired by**: BitBurner community (Reddit, Discord, GitHub)  
**Special Thanks**: 
- NEXUS v0.11.1 codebase (foundation for H.Y.D.R.A.)
- BitBurner official documentation
- Community batch algorithm resources

---

## 🐍 "Like the Hydra, we adapt. Each head knows the path; together, we rule the network."

---

**H.Y.D.R.A. v0.1.0-GENESIS**  
*The multi-headed framework begins...*
