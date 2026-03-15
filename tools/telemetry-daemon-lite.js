/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.1-LITE                      ║
 * ║              Telemetry Daemon - LITE Version              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Telemetry Daemon LITE (Early Game BN1.1)        ║
 * ║  File:   /tools/telemetry-daemon-lite.js                 ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /tools/telemetry-daemon-lite.js
 * @version     0.1.1-LITE
 * @author      Claude (Godlike AI Operator)
 * @description Version ultra-légère pour early game (<2GB RAM)
 * 
 * USAGE:
 *   run /tools/telemetry-daemon-lite.js
 * 
 * DIFFÉRENCES vs VERSION NORMALE:
 *   - Pas d'imports (tout inline)
 *   - RAM cost: <2GB (vs 84GB)
 *   - Fonctionnalités core seulement
 *   - Update 60s (vs 30s)
 * 
 * POUR:
 *   - BN1.1 sans SF
 *   - Home RAM 8-32GB
 *   - Early game
 * 
 * CHANGELOG:
 *   v0.1.1-LITE (2026-03-15)
 *     - Version ultra-légère
 *     - Pas d'imports
 *     - RAM optimisé pour early game
 */

const UPDATE_INTERVAL = 60000; // 60s (économie RAM)

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tail();
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   👁️  H.Y.D.R.A. TELEMETRY LITE v0.1.1                    ║");
    ns.print("║   Early Game Edition (BN1.1)                              ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`⏱️  Update interval: ${UPDATE_INTERVAL/1000}s`);
    ns.print(`💾 RAM: ${ns.getScriptRam(ns.getScriptName())}GB`);
    ns.print("");
    
    let cycle = 0;
    
    while (true) {
        cycle++;
        const timestamp = new Date().toISOString();
        
        ns.clearLog();
        ns.print("╔═══════════════════════════════════════════════════════════╗");
        ns.print("║   👁️  TELEMETRY LITE                                      ║");
        ns.print("╚═══════════════════════════════════════════════════════════╝");
        ns.print(`📊 Cycle: ${cycle}`);
        ns.print(`⏰ ${timestamp}`);
        ns.print("");
        
        // ══════════════════════════════════════════════════════════════
        // NETWORK STATUS
        // ══════════════════════════════════════════════════════════════
        
        const networkData = scanNetwork(ns);
        saveJSON(ns, "/state/network-status.json", {
            timestamp: timestamp,
            ...networkData
        });
        
        ns.print(`🌐 Servers: ${networkData.totalServersScanned}`);
        ns.print(`   Rooted: ${networkData.totalServersRooted}`);
        ns.print(`   With scripts: ${networkData.totalServersWithScripts}`);
        ns.print(`   Empty: ${networkData.totalServersEmpty}`);
        ns.print("");
        
        // ══════════════════════════════════════════════════════════════
        // PERFORMANCE
        // ══════════════════════════════════════════════════════════════
        
        const perfData = getPerformance(ns);
        saveJSON(ns, "/state/performance-metrics.json", {
            timestamp: timestamp,
            ...perfData
        });
        
        ns.print(`💰 Money: $${ns.formatNumber(perfData.currentMoney)}`);
        ns.print(`⚡ Threads: ${perfData.totalThreads}`);
        ns.print(`📈 Revenue: $${ns.formatNumber(perfData.revenuePerSecond)}/s`);
        ns.print("");
        
        // ══════════════════════════════════════════════════════════════
        // PLAYER STATS
        // ══════════════════════════════════════════════════════════════
        
        const playerData = {
            timestamp: timestamp,
            hackingLevel: ns.getHackingLevel(),
            currentBitNode: "BN1.1",
            homeRamMax: ns.getServerMaxRam("home"),
            homeRamUsed: ns.getServerUsedRam("home"),
            purchasedServers: ns.getPurchasedServers().length
        };
        
        saveJSON(ns, "/state/player-stats.json", playerData);
        
        ns.print(`🎯 Hacking: ${playerData.hackingLevel}`);
        ns.print(`📡 BitNode: ${playerData.currentBitNode}`);
        ns.print(`💾 Home: ${playerData.homeRamUsed}/${playerData.homeRamMax}GB`);
        ns.print("");
        
        // ══════════════════════════════════════════════════════════════
        // HEARTBEAT
        // ══════════════════════════════════════════════════════════════
        
        saveJSON(ns, "/state/daemon-heartbeat.json", {
            timestamp: timestamp,
            cycle: cycle,
            pid: ns.pid,
            version: "0.1.1-LITE"
        });
        
        ns.print(`💓 Heartbeat saved (cycle ${cycle})`);
        ns.print(`⏳ Next update in ${UPDATE_INTERVAL/1000}s...`);
        
        await ns.sleep(UPDATE_INTERVAL);
    }
}

// ══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS (INLINE - NO IMPORTS)
// ══════════════════════════════════════════════════════════════════════

function scanNetwork(ns) {
    const visited = new Set();
    const queue = ["home"];
    const servers = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        
        const neighbors = ns.scan(current);
        for (const n of neighbors) {
            if (!visited.has(n)) queue.push(n);
        }
        servers.push(current);
    }
    
    let rooted = 0;
    let withScripts = 0;
    let empty = 0;
    let totalRam = 0;
    let usedRam = 0;
    
    const details = [];
    
    for (const srv of servers) {
        const hasRoot = ns.hasRootAccess(srv);
        const maxRam = ns.getServerMaxRam(srv);
        const used = ns.getServerUsedRam(srv);
        const procs = ns.ps(srv);
        
        if (hasRoot) rooted++;
        if (procs.length > 0) withScripts++;
        if (procs.length === 0 && maxRam > 0) empty++;
        
        totalRam += maxRam;
        usedRam += used;
        
        details.push({
            hostname: srv,
            hasRoot: hasRoot,
            maxRam: maxRam,
            usedRam: used,
            processCount: procs.length
        });
    }
    
    return {
        totalServersScanned: servers.length,
        totalServersRooted: rooted,
        totalServersWithScripts: withScripts,
        totalServersEmpty: empty,
        totalRamNetwork: totalRam,
        totalRamUsed: usedRam,
        ramUsagePercent: totalRam > 0 ? (usedRam / totalRam) * 100 : 0,
        serversDetail: details
    };
}

function getPerformance(ns) {
    const servers = scanAllServers(ns);
    let threads = 0;
    
    for (const srv of servers) {
        const procs = ns.ps(srv);
        for (const p of procs) {
            threads += p.threads;
        }
    }
    
    let revenue = 0;
    try {
        const income = ns.getScriptIncome();
        if (income && income[0]) revenue = income[0];
    } catch (e) {}
    
    return {
        currentMoney: ns.getServerMoneyAvailable("home"),
        revenuePerSecond: revenue,
        totalThreads: threads,
        hackingLevel: ns.getHackingLevel()
    };
}

function scanAllServers(ns) {
    const visited = new Set();
    const queue = ["home"];
    const servers = [];
    
    while (queue.length > 0) {
        const current = queue.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        
        const neighbors = ns.scan(current);
        for (const n of neighbors) {
            if (!visited.has(n)) queue.push(n);
        }
        servers.push(current);
    }
    
    return servers;
}

function saveJSON(ns, filepath, data) {
    try {
        const content = JSON.stringify(data, null, 2);
        ns.write(filepath, content, "w");
        return true;
    } catch (e) {
        ns.print(`❌ ERROR saving ${filepath}: ${e}`);
        return false;
    }
}
