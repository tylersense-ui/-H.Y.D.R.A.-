/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Network Scanner & Manager                        ║
 * ║  File:   /lib/network.js                                  ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/network.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Scanner réseau avec tri par profit/seconde
 * 
 * USAGE:
 *   import { Network } from '/lib/network.js';
 *   
 *   const network = new Network(ns, capabilities);
 *   network.refresh();
 *   const targets = network.getTopTargets(3);
 * 
 * FEATURES:
 *   - Scan BFS complet du réseau
 *   - Auto-crack avec outils disponibles
 *   - Tri par profit/seconde (EV/s)
 *   - Métriques détaillées par cible
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.10.0
 *     - Rebrand H.Y.D.R.A.
 *     - Tri par profit/s conservé
 */

import { CONFIG } from '/lib/constants.js';
import { Logger } from '/lib/logger.js';

export class Network {
    /**
     * @param {NS} ns - NetScript API
     * @param {Capabilities} capabilities - Capacités du joueur
     */
    constructor(ns, capabilities) {
        this.ns = ns;
        this.caps = capabilities;
        this.log = new Logger(ns, "NETWORK");
        this.servers = [];
    }
    
    /**
     * Scanner le réseau (BFS)
     * @param {boolean} force - Forcer le rescan
     * @returns {Array<string>} Liste des serveurs
     */
    refresh(force = false) {
        if (this.servers.length > 0 && !force) {
            return this.servers;
        }
        
        const visited = new Set();
        const queue = ["home"];
        const servers = [];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (visited.has(current)) continue;
            visited.add(current);
            
            try {
                const neighbors = this.ns.scan(current);
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
                
                servers.push(current);
            } catch (e) {
                this.log.error(`Erreur scan ${current}: ${e}`);
            }
        }
        
        this.servers = servers;
        this.log.info(`${servers.length} serveurs scannés`);
        
        return servers;
    }
    
    /**
     * Tenter de crack un serveur
     * @param {string} hostname - Nom du serveur
     * @returns {boolean} Succès
     */
    crack(hostname) {
        if (this.ns.hasRootAccess(hostname)) {
            return true;
        }
        
        const reqPorts = this.ns.getServerNumPortsRequired(hostname);
        
        if (reqPorts > this.caps.portCount) {
            return false;
        }
        
        try {
            if (reqPorts >= 1 && this.caps.tools.brutessh) this.ns.brutessh(hostname);
            if (reqPorts >= 2 && this.caps.tools.ftpcrack) this.ns.ftpcrack(hostname);
            if (reqPorts >= 3 && this.caps.tools.relaysmtp) this.ns.relaysmtp(hostname);
            if (reqPorts >= 4 && this.caps.tools.httpworm) this.ns.httpworm(hostname);
            if (reqPorts >= 5 && this.caps.tools.sqlinject) this.ns.sqlinject(hostname);
            
            this.ns.nuke(hostname);
            return true;
        } catch (e) {
            this.log.error(`Erreur crack ${hostname}: ${e}`);
            return false;
        }
    }
    
    /**
     * Calculer profit/seconde pour une cible
     * @param {string} target - Nom du serveur
     * @param {number} hackPercent - Pourcentage à voler
     * @returns {number} Profit par seconde
     */
    calculateProfitPerSecond(target, hackPercent = 0.10) {
        try {
            const maxMoney = this.ns.getServerMaxMoney(target);
            const hackTime = this.ns.getHackTime(target);
            const hackChance = this.ns.hackAnalyzeChance(target);
            
            if (maxMoney === 0 || hackTime === 0) {
                return 0;
            }
            
            const moneyStolen = maxMoney * hackPercent;
            const expectedProfit = moneyStolen * hackChance;
            const profitPerSecond = expectedProfit / (hackTime / 1000);
            
            return profitPerSecond;
            
        } catch (e) {
            return 0;
        }
    }
    
    /**
     * Obtenir les meilleures cibles triées par profit/s
     * @param {number} count - Nombre de cibles
     * @returns {Array<string>} Liste des cibles
     */
    getTopTargets(count = 3) {
        const viable = this.servers.filter(s => {
            if (!this.ns.hasRootAccess(s)) return false;
            if (s === "home") return false;
            
            const reqLevel = this.ns.getServerRequiredHackingLevel(s);
            const maxMoney = this.ns.getServerMaxMoney(s);
            
            if (reqLevel > this.caps.hackingLevel) return false;
            if (maxMoney < CONFIG.HACKING.MIN_TARGET_MONEY) return false;
            
            return true;
        });
        
        const targetsWithProfit = viable.map(target => ({
            name: target,
            profitPerSecond: this.calculateProfitPerSecond(target),
            maxMoney: this.ns.getServerMaxMoney(target),
            hackTime: this.ns.getHackTime(target),
            hackChance: this.ns.hackAnalyzeChance(target)
        }));
        
        targetsWithProfit.sort((a, b) => b.profitPerSecond - a.profitPerSecond);
        
        return targetsWithProfit.slice(0, count).map(t => t.name);
    }
    
    /**
     * Obtenir métriques détaillées pour une cible
     * @param {string} target - Nom du serveur
     * @returns {Object} Métriques
     */
    getTargetMetrics(target) {
        try {
            const maxMoney = this.ns.getServerMaxMoney(target);
            const currentMoney = this.ns.getServerMoneyAvailable(target);
            const minSec = this.ns.getServerMinSecurityLevel(target);
            const currentSec = this.ns.getServerSecurityLevel(target);
            const hackTime = this.ns.getHackTime(target);
            const hackChance = this.ns.hackAnalyzeChance(target);
            const reqLevel = this.ns.getServerRequiredHackingLevel(target);
            
            const profitPerSecond = this.calculateProfitPerSecond(target);
            
            return {
                name: target,
                maxMoney,
                currentMoney,
                moneyPercent: maxMoney > 0 ? (currentMoney / maxMoney) : 0,
                minSec,
                currentSec,
                secDiff: currentSec - minSec,
                hackTime,
                hackChance,
                reqLevel,
                profitPerSecond,
                isReady: (currentMoney / maxMoney >= 0.95) && (currentSec - minSec <= 5)
            };
        } catch (e) {
            return null;
        }
    }
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    const { Capabilities } = await import("/lib/capabilities.js");
    const caps = new Capabilities(ns);
    const network = new Network(ns, caps);
    
    ns.tprint("═".repeat(65));
    ns.tprint("🐍 H.Y.D.R.A. NETWORK SCANNER");
    ns.tprint("═".repeat(65));
    
    network.refresh(true);
    const targets = network.getTopTargets(5);
    
    ns.tprint(`\n🎯 Top ${targets.length} Targets (by profit/s):`);
    for (let i = 0; i < targets.length; i++) {
        const metrics = network.getTargetMetrics(targets[i]);
        ns.tprint(`${i + 1}. ${metrics.name}`);
        ns.tprint(`   💰 $${ns.formatNumber(metrics.profitPerSecond)}/s`);
        ns.tprint(`   Max: $${ns.formatNumber(metrics.maxMoney)}`);
        ns.tprint(`   Ready: ${metrics.isReady ? "✅" : "❌"}`);
    }
    
    ns.tprint("═".repeat(65));
}
