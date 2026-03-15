/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.2.0-BOOTSTRAP                 ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Deploy Workers (Copy & Execute)                  ║
 * ║  File:   /core/deploy-workers.js                          ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /core/deploy-workers.js
 * @version     0.2.0-BOOTSTRAP
 * @author      Claude (Godlike AI Operator)
 * @description Copy workers + exec avec max threads
 * 
 * USAGE:
 *   import { deployWorkers } from "/core/deploy-workers.js";
 *   const result = await deployWorkers(ns, servers, "n00dles", "hack");
 * 
 * EXPORTS:
 *   deployWorkers(ns, servers, target, workerType) - Deploy + exec workers
 * 
 * FEATURES:
 *   - Copy workers sur tous serveurs
 *   - Calcul threads max disponibles
 *   - Exec avec max threads
 *   - Kill anciens process si besoin
 * 
 * CHANGELOG:
 *   v0.2.0-BOOTSTRAP (2026-03-15)
 *     - Création module deploy-workers
 *     - Séparation deploy vs nuke
 */

const WORKER_SCRIPTS = {
    hack: "/workers/hack.js",
    grow: "/workers/grow.js",
    weaken: "/workers/weaken.js"
};

const WORKER_RAM = {
    hack: 1.70,
    grow: 1.75,
    weaken: 1.75
};

/**
 * Calculer threads disponibles pour un serveur
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} workerType
 * @returns {number} Threads disponibles
 */
function calculateAvailableThreads(ns, hostname, workerType) {
    const maxRam = ns.getServerMaxRam(hostname);
    const usedRam = ns.getServerUsedRam(hostname);
    const freeRam = maxRam - usedRam;
    
    const workerRam = WORKER_RAM[workerType];
    const threads = Math.floor(freeRam / workerRam);
    
    return Math.max(0, threads);
}

/**
 * Kill tous les process d'un script sur un serveur
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} scriptName
 */
function killScript(ns, hostname, scriptName) {
    const processes = ns.ps(hostname);
    for (const proc of processes) {
        if (proc.filename === scriptName) {
            ns.kill(proc.pid);
        }
    }
}

/**
 * Deploy workers sur un ensemble de serveurs
 * @param {NS} ns
 * @param {Array<string>} servers - Liste des serveurs rootés
 * @param {string} target - Cible à attaquer
 * @param {string} workerType - Type de worker (hack/grow/weaken)
 * @param {boolean} killExisting - Kill anciens process? (default: false)
 * @returns {Promise<Object>} Stats de déploiement
 */
export async function deployWorkers(ns, servers, target, workerType = "hack", killExisting = false) {
    const workerScript = WORKER_SCRIPTS[workerType];
    
    if (!workerScript) {
        throw new Error(`Invalid worker type: ${workerType}`);
    }
    
    let totalThreads = 0;
    let serversDeployed = 0;
    let serversFailed = 0;
    
    for (const server of servers) {
        try {
            // Skip serveurs sans RAM
            const maxRam = ns.getServerMaxRam(server);
            if (maxRam === 0) continue;
            
            // Kill anciens process si demandé
            if (killExisting) {
                const scriptName = workerScript.split("/").pop();
                killScript(ns, server, scriptName);
            }
            
            // Copy worker
            const copied = await ns.scp(workerScript, server, "home");
            if (!copied) {
                serversFailed++;
                continue;
            }
            
            // Calculer threads disponibles
            const threads = calculateAvailableThreads(ns, server, workerType);
            
            if (threads === 0) {
                continue;
            }
            
            // Exec worker
            const pid = ns.exec(workerScript, server, threads, target);
            
            if (pid === 0) {
                serversFailed++;
            } else {
                totalThreads += threads;
                serversDeployed++;
            }
            
        } catch (e) {
            serversFailed++;
        }
    }
    
    return {
        workerType: workerType,
        target: target,
        serversDeployed: serversDeployed,
        serversFailed: serversFailed,
        totalThreads: totalThreads
    };
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE (Test du module)
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tail();
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🐍 H.Y.D.R.A. DEPLOY WORKERS TEST                       ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    
    // Importer auto-nuke pour obtenir serveurs rootés
    const { autoNuke } = await ns.run("/core/auto-nuke.js");
    const nukeResult = await autoNuke(ns);
    
    ns.print(`📊 Servers available: ${nukeResult.rooted.length}`);
    ns.print("");
    
    // Deploy hack workers sur n00dles
    const target = ns.args[0] || "n00dles";
    const workerType = ns.args[1] || "hack";
    
    ns.print(`🎯 Deploying ${workerType} workers on target: ${target}`);
    
    const result = await deployWorkers(ns, nukeResult.rooted, target, workerType, true);
    
    ns.print(`✅ Deployed: ${result.serversDeployed} servers`);
    ns.print(`❌ Failed: ${result.serversFailed} servers`);
    ns.print(`⚡ Total threads: ${result.totalThreads}`);
    ns.print("═".repeat(65));
    
    ns.toast(`⚡ Deployed: ${result.totalThreads} ${workerType} threads!`, "success", 3000);
}
