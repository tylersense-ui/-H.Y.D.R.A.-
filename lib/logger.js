/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Centralized Logger                               ║
 * ║  File:   /lib/logger.js                                   ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/logger.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Système de logs centralisé avec niveaux
 * 
 * USAGE:
 *   import { Logger } from '/lib/logger.js';
 *   
 *   const log = new Logger(ns, "MODULE_NAME");
 *   log.info("Message info");
 *   log.warn("Message warning");
 *   log.error("Message erreur");
 *   log.success("Message succès");
 * 
 * NOTE:
 *   Ce logger est complémentaire au système Debug.
 *   - Logger: Pour logs de production simples
 *   - Debug: Pour debug avancé avec toasts, timers, metrics
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.5
 *     - Rebrand H.Y.D.R.A.
 *     - Logique inchangée (simple et efficace)
 */

import { CONFIG } from '/lib/constants.js';

export class Logger {
    /**
     * @param {NS} ns - NetScript API
     * @param {string} module - Nom du module
     */
    constructor(ns, module) {
        this.ns = ns;
        this.module = module;
        this.logLevel = CONFIG.SYSTEM.LOG_LEVEL || "INFO";
        this.debugEnabled = this.logLevel === "DEBUG";
        
        this.levels = {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3
        };
    }
    
    /**
     * Log générique
     */
    log(level, message) {
        if (this.levels[level] >= this.levels[this.logLevel]) {
            const timestamp = new Date().toLocaleTimeString();
            const prefix = `[${timestamp}] [${this.module}] [${level}]`;
            this.ns.print(`${prefix} ${message}`);
        }
    }
    
    /**
     * Log debug (niveau DEBUG)
     */
    debug(message) {
        this.log("DEBUG", `🔍 ${message}`);
    }
    
    /**
     * Log info (niveau INFO)
     */
    info(message) {
        this.log("INFO", `ℹ️  ${message}`);
    }
    
    /**
     * Log warning (niveau WARN)
     */
    warn(message) {
        this.log("WARN", `⚠️  ${message}`);
    }
    
    /**
     * Log erreur (niveau ERROR)
     */
    error(message) {
        this.log("ERROR", `❌ ${message}`);
    }
    
    /**
     * Log succès (niveau INFO)
     */
    success(message) {
        this.log("INFO", `✅ ${message}`);
    }
}
