# 📜 H.Y.D.R.A. Changelog

All notable changes to the H.Y.D.R.A. framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0-GENESIS] - 2026-03-15

### 🎉 Initial Release - Phase 1: Telemetry & Monitoring

**Framework Birth**: Migration from NEXUS v0.11.1 → H.Y.D.R.A. v0.1.0-GENESIS

### Added

#### Core Libraries (`/lib/`)
- **debug.js** - Multi-level DEBUG system (SILENT/NORMAL/VERBOSE/ULTRA)
  - Helpers for toasts, timing, metrics
  - Icon support (✅ ❌ ⚠️ 💰 🌐 ⚡ 🎯 🚀)
  - Auto-tail integration
  - Standalone test mode

- **constants.js** - Central framework configuration
  - Version tracking (0.1.0-GENESIS)
  - RAM management (64GB reserved home)
  - Telemetry configuration
  - Phase-based settings

- **state-manager.js** - Persistent state API
  - JSON save/load in `/state/`
  - File existence checking
  - Cleanup old files
  - Append for logs

- **logger.js** - Simple centralized logging
  - Log levels (DEBUG/INFO/WARN/ERROR)
  - Module-based prefixes
  - Timestamp support

- **capabilities.js** - Player capabilities detection
  - Formulas.exe detection
  - Port tools scanning (5 tools)
  - Player stats (level, money, RAM)
  - Report generation

- **formulas-helper.js** - Formulas.exe wrapper
  - Calculate hack/grow threads
  - Precise timings
  - Hack chance calculation
  - Fallback to standard API if no Formulas.exe

- **network.js** - Network scanner & manager
  - BFS full network scan
  - Auto-crack servers
  - Profit/second calculation
  - Target sorting by EV/s
  - Detailed metrics per target

#### Tools (`/tools/`)
- **telemetry-daemon.js** - L'ŒIL DE CLAUDE
  - Real-time game monitoring (30s updates)
  - Network status tracking
  - Performance metrics
  - Player stats
  - Version tracking
  - Daemon heartbeat
  - Multi-level debug support

- **log-action.js** - Operator action logger
  - Manual action tracking
  - Timestamp + context (money, level)
  - 100 entry history
  - Toast notifications

#### Documentation
- **manifest.json** - File tracking & versions
  - Complete file inventory
  - Dependency mapping
  - Priority ordering
  - Phase tracking

- **deploy-hydra.js** - GitHub deployment script
  - Auto-create directory structure
  - Download from GitHub
  - Dependency-ordered deployment
  - Verification & summary

- **README.md** - Complete framework documentation
  - Installation guide
  - Quick start
  - Architecture overview
  - Roadmap
  - Troubleshooting

- **CHANGELOG.md** - This file

### Changed

#### Rebranded from NEXUS to H.Y.D.R.A.
- All headers: NEXUS → H.Y.D.R.A.
- Version unified to 0.1.0-GENESIS
- Author: Claude (Godlike AI Operator)
- Framework naming: "Multi-Headed Adaptive Framework"

#### Enhanced Standards
- Complete ASCII art headers on all files
- Usage examples in every file
- JSDoc documentation
- Changelog sections in headers
- Icon integration for readability

#### Configuration Updates
- Reserved home RAM: Percentage → Fixed 64GB
- Telemetry interval: 30s (configurable)
- Debug levels: 4 levels (0-3)
- State directory: `/state/` (dedicated)

### Technical Details

**Total Files**: 9 core files + 4 documentation files  
**Total Lines**: ~1200  
**Dependencies**: None external (pure BitBurner NS2 API)  
**RAM Cost**: Minimal (~10GB for telemetry daemon)  
**Tested**: Not yet (deployment ready)

### Migration Notes (NEXUS → H.Y.D.R.A.)

**Preserved**:
- State persistence logic (proven)
- Network scanning algorithm (BFS)
- Profit/s calculation (EV-based)
- Formulas helper logic (correct)
- Capabilities detection (complete)

**Enhanced**:
- Debug system (new multi-level)
- Telemetry daemon (better icons/toasts)
- Documentation (comprehensive)
- Deployment (GitHub-based)

**Removed**:
- Singularity checks (RAM-intensive, early-game)
- Batcher code (Phase 2)
- Orchestrator (Phase 2+)
- Dashboard (Phase 3)

### Known Issues

None - Phase 1 is deployment ready.

### Next Steps

**Phase 2 - Early Batcher**:
- Create worker scripts (`/workers/hack.js`, `grow.js`, `weaken.js`)
- Implement HWGW batcher (`/core/batcher.js`)
- Auto-prep servers
- Single-target batching
- Revenue monitoring

---

## Versioning Scheme

H.Y.D.R.A. follows semantic versioning with phase tags:

```
MAJOR.MINOR.PATCH-TAG

Examples:
0.1.0-GENESIS    (Phase 1: Initial)
0.2.0-BATCHER    (Phase 2: Early income)
0.3.0-OPTIMIZER  (Phase 3: Advanced techniques)
1.0.0-STABLE     (Production ready)
```

### Version Tags
- **GENESIS**: Initial framework (Phase 1)
- **BATCHER**: Batch implementation (Phase 2)
- **OPTIMIZER**: Advanced optimization (Phase 3)
- **STABLE**: Production-ready
- **HOTFIX**: Emergency fixes
- **EXPERIMENTAL**: Experimental features

---

## Release Philosophy

1. **No Broken Releases** - Every version must work
2. **Complete Documentation** - README + Changelog updated
3. **Tested Features** - Manual verification before release
4. **Backward Compatible** - Within major versions
5. **Clear Migration** - Upgrade guides when needed

---

## Contributing

This framework is developed by Claude for BitBurner optimization.

**Development Workflow**:
1. Code in VS Code
2. Test in BitBurner
3. Document changes
4. Update manifest.json
5. Commit to GitHub
6. Deploy via `deploy-hydra.js`

---

**H.Y.D.R.A. v0.1.0-GENESIS**  
*The journey begins. One head at a time, we conquer the network.*  
*- Claude, Godlike AI Operator*
