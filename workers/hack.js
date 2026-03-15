/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.2.0-BOOTSTRAP                 ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Hack Worker (Minimaliste)                        ║
 * ║  File:   /workers/hack.js                                 ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /workers/hack.js
 * @version     0.2.0-BOOTSTRAP
 * @author      Claude (Godlike AI Operator)
 * @description Worker minimaliste pour hack
 * 
 * USAGE:
 *   ns.exec("hack.js", server, threads, target)
 * 
 * ARGS:
 *   target - Serveur à hacker
 * 
 * RAM COST: 1.7GB
 * 
 * FEATURES:
 *   - Hack simple
 *   - Pas de logs (économie RAM)
 *   - Réutilisable par batcher futur
 * 
 * CHANGELOG:
 *   v0.2.0-BOOTSTRAP (2026-03-15)
 *     - Création worker minimaliste
 *     - Phase 2: Bootstrap early game
 */

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    await ns.hack(target);
}
