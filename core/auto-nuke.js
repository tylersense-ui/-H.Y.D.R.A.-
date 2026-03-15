/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.2.1-HOTFIX                    ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Auto-Nuke (Scan & Crack)                         ║
 * ║  File:   /core/auto-nuke.js                               ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /core/auto-nuke.js
 * @version     0.2.1-HOTFIX
 * @author      Claude (Godlike AI Operator)
 * @description Scan réseau BFS + crack avec outils disponibles
 * 
 * USAGE:
 *   import { autoNuke } from "/core/auto-nuke.js";
 *   const rooted = await autoNuke(ns);
 * 
 * EXPORTS:
 *   autoNuke(ns) - Scan + crack, retourne serveurs rootés
 * 
 * FEATURES:
 *   - Scan BFS complet
 *   - Détection auto des outils de port
 *   - Crack intelligent (skip si déjà root)
 *   - Retourne liste serveurs rootés
 *   - Checklist visuelle des outils disponibles
 * 
 * CHANGELOG:
 *   v0.2.1-HOTFIX (2026-03-15)
 *     - Retirer ns.tail() (spam fenêtres quand appelé par bootstrap)
 *     - Ajouter portTools dans return autoNuke
 *   v0.2.0-BOOTSTRAP (2026-03-15)
 *     - Création module auto-nuke
 *     - Séparation scan/crack vs deploy
 */

/**
 * Détecter les outils de port disponibles
 * @param {NS} ns
 * @returns {Object} Outils disponibles + count
 */
function detectPortTools(ns) {
    const tools = {
        brutessh: ns.fileExists("BruteSSH.exe"),
        ftpcrack: ns.fileExists("FTPCrack.exe"),
        relaysmtp: ns.fileExists("relaySMTP.exe"),
        httpworm: ns.fileExists("HTTPWorm.exe"),
        sqlinject: ns.fileExists("SQLInject.exe")
    };
    
    const count = Object.values(tools).filter(x => x).length;
    
    return { tools, count };
}

/**
 * Scanner le réseau complet (BFS)
 * @param {NS} ns
 * @returns {Array<string>} Liste de tous les serveurs
 */
function scanNetwork(ns) {
    const visited = new Set();
    const queue = ["home"];
    const servers = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (visited.has(current)) continue;
        visited.add(current);
        
        const neighbors = ns.scan(current);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
            }
        }
        
        servers.push(current);
    }
    
    return servers;
}

/**
 * Tenter de crack un serveur
 * @param {NS} ns
 * @param {string} hostname
 * @param {Object} portTools
 * @returns {boolean} Succès du crack
 */
function crackServer(ns, hostname, portTools) {
    // Déjà root?
    if (ns.hasRootAccess(hostname)) {
        return true;
    }
    
    // Vérifier niveau requis
    const reqLevel = ns.getServerRequiredHackingLevel(hostname);
    const myLevel = ns.getHackingLevel();
    
    if (reqLevel > myLevel) {
        return false;
    }
    
    // Vérifier ports requis
    const reqPorts = ns.getServerNumPortsRequired(hostname);
    
    if (reqPorts > portTools.count) {
        return false;
    }
    
    try {
        // Ouvrir ports
        if (reqPorts >= 1 && portTools.tools.brutessh) ns.brutessh(hostname);
        if (reqPorts >= 2 && portTools.tools.ftpcrack) ns.ftpcrack(hostname);
        if (reqPorts >= 3 && portTools.tools.relaysmtp) ns.relaysmtp(hostname);
        if (reqPorts >= 4 && portTools.tools.httpworm) ns.httpworm(hostname);
        if (reqPorts >= 5 && portTools.tools.sqlinject) ns.sqlinject(hostname);
        
        // Nuke
        ns.nuke(hostname);
        
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Auto-nuke: Scan + crack complet du réseau
 * @param {NS} ns
 * @returns {Promise<Object>} { rooted: string[], cracked: string[], failed: string[] }
 */
export async function autoNuke(ns) {
    const portTools = detectPortTools(ns);
    const allServers = scanNetwork(ns);
    
    const rooted = [];
    const cracked = [];
    const failed = [];
    
    for (const server of allServers) {
        const wasRooted = ns.hasRootAccess(server);
        const success = crackServer(ns, server, portTools);
        
        if (success) {
            rooted.push(server);
            if (!wasRooted) {
                cracked.push(server);
            }
        } else {
            failed.push(server);
        }
    }
    
    return {
        totalScanned: allServers.length,
        rooted: rooted,
        cracked: cracked,
        failed: failed,
        portToolsCount: portTools.count,
        portTools: portTools.tools
    };
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE (Test du module)
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    // PAS de tail - appelé périodiquement par bootstrap-controller
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🐍 H.Y.D.R.A. AUTO-NUKE                                 ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    
    const result = await autoNuke(ns);
    
    ns.print(`📊 Total scanned: ${result.totalScanned}`);
    ns.print(`✅ Rooted: ${result.rooted.length}`);
    ns.print(`🔓 Newly cracked: ${result.cracked.length}`);
    ns.print(`❌ Failed: ${result.failed.length}`);
    ns.print(`🔧 Port tools: ${result.portToolsCount}/5`);
    
    // Checklist détaillée des port tools
    ns.print("");
    ns.print("🔐 Port Tools Checklist:");
    ns.print(`   ${ns.fileExists("BruteSSH.exe") ? "✅" : "❌"} BruteSSH.exe`);
    ns.print(`   ${ns.fileExists("FTPCrack.exe") ? "✅" : "❌"} FTPCrack.exe`);
    ns.print(`   ${ns.fileExists("relaySMTP.exe") ? "✅" : "❌"} relaySMTP.exe`);
    ns.print(`   ${ns.fileExists("HTTPWorm.exe") ? "✅" : "❌"} HTTPWorm.exe`);
    ns.print(`   ${ns.fileExists("SQLInject.exe") ? "✅" : "❌"} SQLInject.exe`);
    ns.print("");
    
    if (result.cracked.length > 0) {
        ns.print("🎯 Newly cracked servers:");
        for (const server of result.cracked) {
            ns.print(`   - ${server}`);
        }
    }
    
    ns.print("═".repeat(65));
    
    ns.toast(`🔓 Auto-nuke: ${result.cracked.length} new servers rooted!`, "success", 3000);
}
