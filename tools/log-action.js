/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Operator Action Logger                           ║
 * ║  File:   /tools/log-action.js                             ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /tools/log-action.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Logger des actions manuelles de l'opérateur
 * 
 * USAGE:
 *   run /tools/log-action.js "Achat NeuroFlux x5 pour $500m"
 *   run /tools/log-action.js "Rejoint faction Daedalus"
 *   run /tools/log-action.js "Reset avec 30 augs"
 * 
 * PURPOSE:
 *   Permet à l'opérateur de logger les actions manuelles
 *   importantes pour que Claude puisse les voir dans les logs
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.11.1
 *     - Rebrand H.Y.D.R.A.
 *     - Logique inchangée
 */

import { StateManager } from "/lib/state-manager.js";
import { CONFIG } from "/lib/constants.js";

/** @param {NS} ns */
export async function main(ns) {
    const stateMgr = new StateManager(ns);
    
    if (ns.args.length === 0) {
        ns.tprint("═".repeat(65));
        ns.tprint("❌ ERROR: Action description required");
        ns.tprint("");
        ns.tprint("USAGE:");
        ns.tprint("  run /tools/log-action.js \"Action description\"");
        ns.tprint("");
        ns.tprint("EXAMPLES:");
        ns.tprint("  run /tools/log-action.js \"Achat Formulas.exe pour $5B\"");
        ns.tprint("  run /tools/log-action.js \"Rejoint faction Daedalus\"");
        ns.tprint("  run /tools/log-action.js \"Reset BN1 avec 30 augs\"");
        ns.tprint("═".repeat(65));
        return;
    }
    
    const action = ns.args.join(" ");
    
    // Charger historique existant
    let history = stateMgr.load(CONFIG.TELEMETRY.FILES.OPERATOR_ACTIONS);
    if (!history || !Array.isArray(history.actions)) {
        history = {
            framework: CONFIG.VERSION.FRAMEWORK,
            version: CONFIG.VERSION.FULL,
            actions: []
        };
    }
    
    // Ajouter nouvelle action
    const entry = {
        timestamp: new Date().toISOString(),
        action: action,
        money: ns.getServerMoneyAvailable("home"),
        hackingLevel: ns.getHackingLevel()
    };
    
    history.actions.push(entry);
    
    // Garder seulement les 100 dernières
    if (history.actions.length > CONFIG.TELEMETRY.MAX_HISTORY_ENTRIES) {
        history.actions = history.actions.slice(-CONFIG.TELEMETRY.MAX_HISTORY_ENTRIES);
    }
    
    // Sauvegarder
    await stateMgr.save(CONFIG.TELEMETRY.FILES.OPERATOR_ACTIONS, history);
    
    ns.tprint("═".repeat(65));
    ns.tprint("✅ Action logged successfully!");
    ns.tprint("");
    ns.tprint(`Action: ${action}`);
    ns.tprint(`Money: $${ns.formatNumber(entry.money)}`);
    ns.tprint(`Hacking: ${entry.hackingLevel}`);
    ns.tprint(`Time: ${entry.timestamp}`);
    ns.tprint("═".repeat(65));
    
    ns.toast("✅ Action logged!", "success", 2000);
}
