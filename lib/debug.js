/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Debug System                                     ║
 * ║  File:   /lib/debug.js                                    ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/debug.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Système DEBUG multi-niveaux réutilisable
 * 
 * USAGE:
 *   import { Debug } from "/lib/debug.js";
 *   
 *   const debug = new Debug(ns, "MODULE_NAME");
 *   debug.normal("Message normal");
 *   debug.verbose("Message détaillé");
 *   debug.ultra("Message ultra verbeux");
 *   debug.toastSuccess("Opération réussie!");
 * 
 * DEBUG LEVELS:
 *   0 = SILENT  : Toasts succès uniquement
 *   1 = NORMAL  : Infos importantes (défaut)
 *   2 = VERBOSE : Détails + metrics + timing
 *   3 = ULTRA   : Debug complet
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Initial creation
 *     - 4 niveaux de verbosité (SILENT, NORMAL, VERBOSE, ULTRA)
 *     - Helpers pour toasts, timing, métriques
 *     - Icônes colorées pour lisibilité
 *     - Auto-tail intégré
 */

// ════════════════════════════════════════════════════════════
// DEBUG LEVELS
// ════════════════════════════════════════════════════════════

export const DEBUG_SILENT = 0;
export const DEBUG_NORMAL = 1;
export const DEBUG_VERBOSE = 2;
export const DEBUG_ULTRA = 3;

// ════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════

export const ICONS = {
    SUCCESS: "✅",
    ERROR: "❌",
    WARNING: "⚠️",
    INFO: "ℹ️",
    MONEY: "💰",
    NETWORK: "🌐",
    PERFORMANCE: "⚡",
    SECURITY: "🔒",
    TARGET: "🎯",
    ROCKET: "🚀",
    TIMER: "⏱️",
    BRAIN: "🧠",
    EYE: "👁️",
    HEART: "💓",
    CHART: "📊",
    PACKAGE: "📦"
};

// ════════════════════════════════════════════════════════════
// DEBUG CLASS
// ════════════════════════════════════════════════════════════

export class Debug {
    /**
     * @param {NS} ns - NetScript API
     * @param {string} moduleName - Nom du module (pour préfixe logs)
     * @param {number} level - Niveau de debug (0-3)
     * @param {boolean} autoTail - Ouvrir tail automatiquement
     */
    constructor(ns, moduleName = "HYDRA", level = DEBUG_NORMAL, autoTail = true) {
        this.ns = ns;
        this.moduleName = moduleName;
        this.level = level;
        this.timers = new Map();
        
        // Auto-tail si demandé
        if (autoTail) {
            this.ns.disableLog("ALL");
            this.ns.tail();
        }
    }
    
    // ════════════════════════════════════════════════════════════
    // CORE LOGGING METHODS
    // ════════════════════════════════════════════════════════════
    
    /**
     * Log si niveau >= SILENT (toujours)
     */
    always(message, icon = ICONS.INFO) {
        this.ns.print(`${icon} [${this.moduleName}] ${message}`);
    }
    
    /**
     * Log si niveau >= NORMAL
     */
    normal(message, icon = ICONS.INFO) {
        if (this.level >= DEBUG_NORMAL) {
            this.ns.print(`${icon} [${this.moduleName}] ${message}`);
        }
    }
    
    /**
     * Log si niveau >= VERBOSE
     */
    verbose(message, icon = ICONS.INFO) {
        if (this.level >= DEBUG_VERBOSE) {
            this.ns.print(`${icon} [${this.moduleName}] ${message}`);
        }
    }
    
    /**
     * Log si niveau >= ULTRA
     */
    ultra(message, icon = ICONS.INFO) {
        if (this.level >= DEBUG_ULTRA) {
            this.ns.print(`${icon} [${this.moduleName}] ${message}`);
        }
    }
    
    // ════════════════════════════════════════════════════════════
    // TOAST NOTIFICATIONS
    // ════════════════════════════════════════════════════════════
    
    /**
     * Toast de succès (toujours affiché, même en SILENT)
     */
    toastSuccess(message) {
        this.ns.toast(`${ICONS.SUCCESS} ${message}`, "success", 3000);
        this.always(message, ICONS.SUCCESS);
    }
    
    /**
     * Toast d'erreur (toujours affiché)
     */
    toastError(message) {
        this.ns.toast(`${ICONS.ERROR} ${message}`, "error", 5000);
        this.always(message, ICONS.ERROR);
    }
    
    /**
     * Toast d'avertissement (toujours affiché)
     */
    toastWarning(message) {
        this.ns.toast(`${ICONS.WARNING} ${message}`, "warning", 4000);
        this.always(message, ICONS.WARNING);
    }
    
    /**
     * Toast d'information (affiché si niveau >= NORMAL)
     */
    toastInfo(message) {
        if (this.level >= DEBUG_NORMAL) {
            this.ns.toast(`${ICONS.INFO} ${message}`, "info", 2000);
        }
        this.normal(message, ICONS.INFO);
    }
    
    // ════════════════════════════════════════════════════════════
    // TIMING UTILITIES
    // ════════════════════════════════════════════════════════════
    
    /**
     * Démarrer un timer
     */
    startTimer(name) {
        this.timers.set(name, Date.now());
        this.ultra(`Timer started: ${name}`, ICONS.TIMER);
    }
    
    /**
     * Terminer un timer et afficher la durée
     */
    endTimer(name) {
        if (!this.timers.has(name)) {
            this.verbose(`Timer '${name}' not found`, ICONS.WARNING);
            return 0;
        }
        
        const startTime = this.timers.get(name);
        const duration = Date.now() - startTime;
        this.timers.delete(name);
        
        this.verbose(`${ICONS.TIMER} ${name}: ${duration}ms`);
        return duration;
    }
    
    // ════════════════════════════════════════════════════════════
    // METRICS DISPLAY
    // ════════════════════════════════════════════════════════════
    
    /**
     * Afficher montant d'argent formaté
     */
    money(label, amount) {
        const formatted = this.ns.formatNumber(amount);
        this.normal(`${ICONS.MONEY} ${label}: $${formatted}`);
    }
    
    /**
     * Afficher métrique générique
     */
    metric(label, value, icon = ICONS.CHART) {
        this.verbose(`${icon} ${label}: ${this.ns.formatNumber(value)}`);
    }
    
    /**
     * Afficher pourcentage
     */
    percent(label, value, icon = ICONS.CHART) {
        this.verbose(`${icon} ${label}: ${(value * 100).toFixed(2)}%`);
    }
    
    // ════════════════════════════════════════════════════════════
    // DISPLAY UTILITIES
    // ════════════════════════════════════════════════════════════
    
    /**
     * Afficher header ASCII art
     */
    header(title) {
        const border = "═".repeat(63);
        this.ns.print(`╔${border}╗`);
        this.ns.print(`║ ${title.padEnd(61)} ║`);
        this.ns.print(`╚${border}╝`);
    }
    
    /**
     * Afficher séparateur
     */
    separator() {
        this.ns.print("─".repeat(65));
    }
    
    /**
     * Clear log
     */
    clear() {
        this.ns.clearLog();
    }
    
    // ════════════════════════════════════════════════════════════
    // LEVEL CONTROL
    // ════════════════════════════════════════════════════════════
    
    /**
     * Changer le niveau de debug
     */
    setLevel(level) {
        this.level = level;
        this.normal(`Debug level set to: ${level}`);
    }
    
    /**
     * Obtenir le niveau actuel
     */
    getLevel() {
        return this.level;
    }
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    const debugLevel = ns.args[0] !== undefined ? parseInt(ns.args[0]) : DEBUG_NORMAL;
    const debug = new Debug(ns, "DEBUG_TEST", debugLevel);
    
    debug.header("H.Y.D.R.A. DEBUG SYSTEM TEST");
    debug.separator();
    
    debug.normal("Testing NORMAL level messages...");
    debug.verbose("Testing VERBOSE level messages...");
    debug.ultra("Testing ULTRA level messages...");
    debug.separator();
    
    debug.toastSuccess("Success toast test!");
    await ns.sleep(500);
    debug.toastInfo("Info toast test!");
    await ns.sleep(500);
    debug.toastWarning("Warning toast test!");
    await ns.sleep(500);
    
    debug.separator();
    debug.startTimer("test_timer");
    await ns.sleep(1000);
    debug.endTimer("test_timer");
    
    debug.separator();
    debug.money("Test Money", 1234567890);
    debug.metric("Test Metric", 999999);
    debug.percent("Test Percent", 0.856);
    
    debug.separator();
    debug.toastSuccess("Debug system test complete!");
}
