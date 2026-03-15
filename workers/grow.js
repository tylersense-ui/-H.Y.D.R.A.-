/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.2.0-BOOTSTRAP                 ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Grow Worker (Minimaliste)                        ║
 * ║  File:   /workers/grow.js                                 ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /workers/grow.js
 * @version     0.2.0-BOOTSTRAP
 * @author      Claude (Godlike AI Operator)
 * @description Worker minimaliste pour grow
 * 
 * USAGE:
 *   ns.exec("grow.js", server, threads, target)
 * 
 * ARGS:
 *   target - Serveur à grow
 * 
 * RAM COST: 1.75GB
 * 
 * FEATURES:
 *   - Grow simple
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
    await ns.grow(target);
}
