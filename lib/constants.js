/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Configuration Constants                          ║
 * ║  File:   /lib/constants.js                                ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/constants.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Configuration centrale du framework H.Y.D.R.A.
 * 
 * USAGE:
 *   import { CONFIG } from '/lib/constants.js';
 *   const version = CONFIG.VERSION.FULL;
 *   const reservedRam = CONFIG.RAM.RESERVED_HOME_RAM;
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.11.1
 *     - Rebrand H.Y.D.R.A.
 *     - Configuration initiale pour Phase 1 (Telemetry)
 *     - Reserved RAM fixe à 64GB (sécurité post-reset)
 */

export const CONFIG = {
    // ════════════════════════════════════════════════════════
    // VERSION
    // ════════════════════════════════════════════════════════
    
    VERSION: {
        MAJOR: 0,
        MINOR: 1,
        PATCH: 0,
        TAG: "GENESIS",
        FULL: "v0.1.0-GENESIS",
        DATE: "2026-03-15",
        FRAMEWORK: "H.Y.D.R.A.",
        DESCRIPTION: "Multi-Headed Adaptive Framework"
    },
    
    // ════════════════════════════════════════════════════════
    // SYSTEM
    // ════════════════════════════════════════════════════════
    
    SYSTEM: {
        DEBUG_MODE: false,
        LOG_LEVEL: "INFO",  // DEBUG, INFO, WARN, ERROR
        DEFAULT_DEBUG_LEVEL: 1  // 0=SILENT, 1=NORMAL, 2=VERBOSE, 3=ULTRA
    },
    
    // ════════════════════════════════════════════════════════
    // RAM MANAGEMENT
    // ════════════════════════════════════════════════════════
    
    RAM: {
        // RAM réservée sur home (fixe pour éviter crash post-reset)
        RESERVED_HOME_RAM: 64,  // GB
        
        // RAM minimale libre pour déploiement
        MIN_FREE_RAM_FOR_DEPLOY: 8,  // GB
        
        // Coût RAM des workers
        WORKER_SCRIPT_RAM: {
            HACK: 1.7,
            GROW: 1.75,
            WEAKEN: 1.75
        }
    },
    
    // ════════════════════════════════════════════════════════
    // HACKING
    // ════════════════════════════════════════════════════════
    
    HACKING: {
        // Argent minimum pour considérer une cible
        MIN_TARGET_MONEY: 50000000,  // $50M
        
        // Seuils de préparation
        PREP_MONEY_THRESHOLD: 0.95,  // 95% du max
        PREP_SECURITY_MARGIN: 5,     // +5 de la min
        
        // Outils de port
        TOOL_FILES: {
            BRUTESSH: 'BruteSSH.exe',
            FTPCRACK: 'FTPCrack.exe',
            RELAYSMTP: 'relaySMTP.exe',
            HTTPWORM: 'HTTPWorm.exe',
            SQLINJECT: 'SQLInject.exe'
        }
    },
    
    // ════════════════════════════════════════════════════════
    // SERVERS
    // ════════════════════════════════════════════════════════
    
    SERVERS: {
        MAX_PURCHASED: 25,
        BASE_PREFIX: 'hydra-',  // Préfixe pour serveurs achetés
        MAX_RAM_PER_SERVER: 1048576,  // 1PB
        UPGRADE_INTERVAL_MS: 30000,
        MIN_MONEY_FOR_PURCHASE: 100000000  // $100M
    },
    
    // ════════════════════════════════════════════════════════
    // PORTS (Pour communication inter-scripts)
    // ════════════════════════════════════════════════════════
    
    PORTS: {
        COMMANDS: 1,
        RESULTS: 2,
        TELEMETRY: 3
    },
    
    // ════════════════════════════════════════════════════════
    // CONTROLLER (À venir - Phase 2)
    // ════════════════════════════════════════════════════════
    
    CONTROLLER: {
        POLL_INTERVAL_MS: 50,
        MAX_RETRIES: 3
    },
    
    // ════════════════════════════════════════════════════════
    // WORKERS (À venir - Phase 2)
    // ════════════════════════════════════════════════════════
    
    WORKERS: {
        HACK: '/workers/hack.js',
        GROW: '/workers/grow.js',
        WEAKEN: '/workers/weaken.js'
    },
    
    // ════════════════════════════════════════════════════════
    // ORCHESTRATOR (À venir - Phase 2)
    // ════════════════════════════════════════════════════════
    
    ORCHESTRATOR: {
        REFRESH_INTERVAL_MS: 60000,
        MIN_TARGETS: 1,
        AUTO_SCALE_TARGETS: true,
        CYCLE_DELAY_MS: 200
    },
    
    // ════════════════════════════════════════════════════════
    // BATCHER (À venir - Phase 2)
    // ════════════════════════════════════════════════════════
    
    BATCHER: {
        DEFAULT_HACK_PERCENT: 0.10,  // 10% par défaut
        MAX_THREADS_PER_JOB: 50000,
        USE_FORMULAS: true,
        ESTIMATED_RAM_PER_BATCH_GB: 30,
        BATCH_SPACING_MS: 200,  // Espacement entre fins de batches
        SAFETY_MARGIN_MS: 50    // Marge de sécurité timing
    },
    
    // ════════════════════════════════════════════════════════
    // TELEMETRY (Phase 1 - Actuelle)
    // ════════════════════════════════════════════════════════
    
    TELEMETRY: {
        UPDATE_INTERVAL_MS: 30000,  // 30 secondes
        STATE_DIR: "/state",
        MAX_HISTORY_ENTRIES: 100,
        
        // Fichiers de state
        FILES: {
            NETWORK_STATUS: "network-status.json",
            PERFORMANCE_METRICS: "performance-metrics.json",
            PLAYER_STATS: "player-stats.json",
            DAEMON_HEARTBEAT: "daemon-heartbeat.json",
            OPERATOR_ACTIONS: "operator-actions.json",
            VERSION_TRACKING: "version-tracking.json"
        }
    },
    
    // ════════════════════════════════════════════════════════
    // STOCK MARKET (À venir - Phase 3+)
    // ════════════════════════════════════════════════════════
    
    STOCK: {
        FORECAST_BUY_THRESHOLD: 0.55,
        FORECAST_SELL_THRESHOLD: 0.48,
        VOLATILITY_MAX: 0.05,
        POSITION_SIZE_MIN: 0.05,
        POSITION_SIZE_MAX: 0.15,
        STOP_LOSS_PERCENT: -0.15,
        TAKE_PROFIT_PERCENT: 0.40,
        MAX_POSITIONS: 15,
        CHECK_INTERVAL_MS: 6000
    }
};

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE (Afficher config)
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    ns.tprint("═".repeat(65));
    ns.tprint(`🐍 ${CONFIG.VERSION.FRAMEWORK} ${CONFIG.VERSION.FULL}`);
    ns.tprint(CONFIG.VERSION.DESCRIPTION);
    ns.tprint("═".repeat(65));
    ns.tprint(`Date: ${CONFIG.VERSION.DATE}`);
    ns.tprint(`Debug Level: ${CONFIG.SYSTEM.DEFAULT_DEBUG_LEVEL}`);
    ns.tprint(`Reserved Home RAM: ${CONFIG.RAM.RESERVED_HOME_RAM}GB`);
    ns.tprint(`Telemetry Interval: ${CONFIG.TELEMETRY.UPDATE_INTERVAL_MS}ms`);
    ns.tprint("═".repeat(65));
}
