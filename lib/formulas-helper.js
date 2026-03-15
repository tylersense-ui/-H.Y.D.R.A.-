/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Formulas.exe Helper                              ║
 * ║  File:   /lib/formulas-helper.js                          ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/formulas-helper.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Helper pour calculs précis avec Formulas.exe
 * 
 * USAGE:
 *   import { FormulasHelper } from "/lib/formulas-helper.js";
 *   
 *   const formulas = new FormulasHelper(ns);
 *   const hackThreads = formulas.calculateHackThreads("n00dles", 0.10);
 *   const timings = formulas.calculateTimings("n00dles");
 * 
 * REQUIRES:
 *   Formulas.exe ($5B)
 *   Si non disponible, utilise approximations via API standard
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.8.1
 *     - Rebrand H.Y.D.R.A.
 *     - Logique inchangée (éprouvée)
 */

export class FormulasHelper {
    /**
     * @param {NS} ns - NetScript API
     */
    constructor(ns) {
        this.ns = ns;
        this.hasFormulas = ns.fileExists("Formulas.exe");
    }
    
    /**
     * Calculer threads HACK avec Formulas
     * @param {string} target - Nom du serveur cible
     * @param {number} hackPercent - Pourcentage à voler (0.0 - 1.0)
     * @returns {number} Nombre de threads nécessaires
     */
    calculateHackThreads(target, hackPercent) {
        if (!this.hasFormulas) {
            const maxMoney = this.ns.getServerMaxMoney(target);
            return Math.max(1, Math.floor(
                this.ns.hackAnalyzeThreads(target, maxMoney * hackPercent)
            ));
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        server.moneyAvailable = server.moneyMax;
        
        const hackPercentPerThread = this.ns.formulas.hacking.hackPercent(server, player);
        
        if (hackPercentPerThread === 0) {
            return 0;
        }
        
        return Math.max(1, Math.floor(hackPercent / hackPercentPerThread));
    }
    
    /**
     * Calculer threads GROW avec Formulas
     * @param {string} target - Nom du serveur cible
     * @param {number} hackPercent - Pourcentage volé à récupérer
     * @returns {number} Nombre de threads nécessaires
     */
    calculateGrowThreads(target, hackPercent) {
        const maxMoney = this.ns.getServerMaxMoney(target);
        const moneyAfterHack = maxMoney * (1 - hackPercent);
        const growMultiplier = maxMoney / Math.max(1, moneyAfterHack);
        
        return Math.max(1, Math.ceil(
            this.ns.growthAnalyze(target, growMultiplier)
        ));
    }
    
    /**
     * Calculer timings précis avec Formulas
     * @param {string} target - Nom du serveur cible
     * @param {number} buffer - Buffer entre opérations (ms)
     * @returns {Object} Timings {hackTime, growTime, weakenTime, delays...}
     */
    calculateTimings(target, buffer = 20) {
        if (!this.hasFormulas) {
            return {
                hackTime: this.ns.getHackTime(target),
                growTime: this.ns.getGrowTime(target),
                weakenTime: this.ns.getWeakenTime(target),
                hackDelay: 0,
                weaken1Delay: 50,
                growDelay: 100,
                weaken2Delay: 150
            };
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        server.moneyAvailable = server.moneyMax;
        
        const hackTime = this.ns.formulas.hacking.hackTime(server, player);
        const growTime = this.ns.formulas.hacking.growTime(server, player);
        const weakenTime = this.ns.formulas.hacking.weakenTime(server, player);
        
        const now = Date.now();
        const endTime = now + weakenTime + (buffer * 4);
        
        const hackDelay = Math.max(0, endTime - now - hackTime - (buffer * 3));
        const weaken1Delay = Math.max(0, endTime - now - weakenTime - (buffer * 2));
        const growDelay = Math.max(0, endTime - now - growTime - buffer);
        const weaken2Delay = 0;
        
        return {
            hackTime,
            growTime,
            weakenTime,
            hackDelay,
            weaken1Delay,
            growDelay,
            weaken2Delay
        };
    }
    
    /**
     * Calculer chance de hack avec Formulas
     * @param {string} target - Nom du serveur cible
     * @returns {number} Chance de succès (0.0 - 1.0)
     */
    getHackChance(target) {
        if (!this.hasFormulas) {
            return this.ns.hackAnalyzeChance(target);
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        
        return this.ns.formulas.hacking.hackChance(server, player);
    }
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0] || "n00dles";
    const formulas = new FormulasHelper(ns);
    
    ns.tprint("═".repeat(65));
    ns.tprint(`🐍 H.Y.D.R.A. FORMULAS HELPER TEST`);
    ns.tprint(`Target: ${target}`);
    ns.tprint("═".repeat(65));
    ns.tprint(`Has Formulas.exe: ${formulas.hasFormulas ? "✅" : "❌"}`);
    ns.tprint("");
    
    const hackThreads = formulas.calculateHackThreads(target, 0.10);
    const growThreads = formulas.calculateGrowThreads(target, 0.10);
    const hackChance = formulas.getHackChance(target);
    const timings = formulas.calculateTimings(target);
    
    ns.tprint(`Hack Threads (10%): ${hackThreads}`);
    ns.tprint(`Grow Threads: ${growThreads}`);
    ns.tprint(`Hack Chance: ${(hackChance * 100).toFixed(2)}%`);
    ns.tprint("");
    ns.tprint(`Hack Time: ${ns.tFormat(timings.hackTime)}`);
    ns.tprint(`Grow Time: ${ns.tFormat(timings.growTime)}`);
    ns.tprint(`Weaken Time: ${ns.tFormat(timings.weakenTime)}`);
    ns.tprint("═".repeat(65));
}
