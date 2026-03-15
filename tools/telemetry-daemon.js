/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Telemetry Daemon (L'ŒIL DE CLAUDE)               ║
 * ║  File:   /tools/telemetry-daemon.js                       ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /tools/telemetry-daemon.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Daemon permanent de monitoring pour diagnostic
 * 
 * USAGE:
 *   run /tools/telemetry-daemon.js
 *   run /tools/telemetry-daemon.js --debug 2
 * 
 * FEATURES:
 *   - Monitoring réseau (CRITIQUE: serveurs avec/sans scripts)
 *   - Performance metrics (threads, revenue/s)
 *   - Player stats (niveau, money, BitNode)
 *   - Version tracking
 *   - Heartbeat daemon
 *   - Update toutes les 30s
 *   - Logs JSON persistants dans /state/
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.11.1
 *     - Rebrand H.Y.D.R.A.
 *     - Intégration système DEBUG
 *     - Icônes et toasts améliorés
 */

import { StateManager } from "/lib/state-manager.js";
import { CONFIG } from "/lib/constants.js";
import { Debug, DEBUG_NORMAL, DEBUG_VERBOSE, ICONS } from "/lib/debug.js";

const UPDATE_INTERVAL = CONFIG.TELEMETRY.UPDATE_INTERVAL_MS;

/** @param {NS} ns */
export async function main(ns) {
    // Parse debug level
    const debugArg = ns.args.indexOf("--debug");
    const debugLevel = debugArg !== -1 ? parseInt(ns.args[debugArg + 1]) : DEBUG_NORMAL;
    
    const debug = new Debug(ns, "TELEMETRY", debugLevel, true);
    const stateMgr = new StateManager(ns);
    
    debug.header("🐍 H.Y.D.R.A. TELEMETRY DAEMON v0.1.0-GENESIS");
    debug.normal("L'Œil de Claude sur sa partie", ICONS.EYE);
    debug.separator();
    debug.normal(`Update interval: ${UPDATE_INTERVAL/1000}s`, ICONS.TIMER);
    debug.toastSuccess("Telemetry daemon started!");
    debug.separator();
    
    let cycle = 0;
    
    while (true) {
        cycle++;
        const timestamp = new Date().toISOString();
        
        debug.clear();
        debug.header("👁️  TELEMETRY DAEMON");
        debug.normal(`Cycle: ${cycle}`, ICONS.CHART);
        debug.normal(`Time: ${timestamp}`, ICONS.TIMER);
        debug.separator();
        
        // ══════════════════════════════════════════════════════════════
        // 1️⃣ NETWORK STATUS (CRITIQUE)
        // ══════════════════════════════════════════════════════════════
        
        debug.verbose("Collecting network status...", ICONS.NETWORK);
        const networkStatus = collectNetworkStatus(ns, debug);
        await stateMgr.save(CONFIG.TELEMETRY.FILES.NETWORK_STATUS, networkStatus);
        
        debug.normal(`Network: ${networkStatus.totalServersScanned} scanned`, ICONS.NETWORK);
        debug.normal(`  Rooted: ${networkStatus.totalServersRooted}`, ICONS.SUCCESS);
        debug.verbose(`  With scripts: ${networkStatus.totalServersWithScripts}`, ICONS.ROCKET);
        debug.verbose(`  Empty: ${networkStatus.totalServersEmpty}`, ICONS.WARNING);
        debug.separator();
        
        // ══════════════════════════════════════════════════════════════
        // 2️⃣ PERFORMANCE METRICS
        // ══════════════════════════════════════════════════════════════
        
        debug.verbose("Collecting performance metrics...", ICONS.PERFORMANCE);
        const perfMetrics = collectPerformanceMetrics(ns, debug);
        await stateMgr.save(CONFIG.TELEMETRY.FILES.PERFORMANCE_METRICS, perfMetrics);
        
        debug.normal(`Threads: ${ns.formatNumber(perfMetrics.totalThreads || 0)}`, ICONS.PERFORMANCE);
        debug.money("Money", perfMetrics.currentMoney || 0);
        debug.money("Revenue/s", perfMetrics.revenuePerSecond || 0);
        debug.separator();
        
        // ══════════════════════════════════════════════════════════════
        // 3️⃣ PLAYER STATS
        // ══════════════════════════════════════════════════════════════
        
        debug.verbose("Collecting player stats...", ICONS.BRAIN);
        const playerStats = collectPlayerStats(ns, debug);
        await stateMgr.save(CONFIG.TELEMETRY.FILES.PLAYER_STATS, playerStats);
        
        debug.normal(`Hacking: ${playerStats.hackingLevel}`, ICONS.TARGET);
        debug.normal(`BitNode: ${playerStats.currentBitNode}`, ICONS.PACKAGE);
        debug.separator();
        
        // ══════════════════════════════════════════════════════════════
        // 4️⃣ VERSION TRACKING
        // ══════════════════════════════════════════════════════════════
        
        debug.verbose("Collecting version info...", ICONS.PACKAGE);
        const versionInfo = collectVersionInfo(ns, debug);
        await stateMgr.save(CONFIG.TELEMETRY.FILES.VERSION_TRACKING, versionInfo);
        
        debug.verbose("Versions tracked", ICONS.SUCCESS);
        debug.separator();
        
        // ══════════════════════════════════════════════════════════════
        // 5️⃣ HEARTBEAT
        // ══════════════════════════════════════════════════════════════
        
        await stateMgr.save(CONFIG.TELEMETRY.FILES.DAEMON_HEARTBEAT, {
            timestamp: timestamp,
            cycle: cycle,
            pid: ns.pid,
            uptime: ns.getTimeSinceLastAug(),
            version: CONFIG.VERSION.FULL
        });
        
        debug.normal(`Heartbeat saved (cycle ${cycle})`, ICONS.HEART);
        debug.verbose(`Next update in ${UPDATE_INTERVAL/1000}s...`, ICONS.TIMER);
        
        await ns.sleep(UPDATE_INTERVAL);
    }
}

// ══════════════════════════════════════════════════════════════════════
// COLLECTION FUNCTIONS
// ══════════════════════════════════════════════════════════════════════

function collectNetworkStatus(ns, debug) {
    debug.ultra("Scanning network (BFS)...");
    
    const visited = new Set();
    const queue = ["home"];
    const allServers = [];
    
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
        
        allServers.push(current);
    }
    
    debug.ultra(`Found ${allServers.length} servers`);
    
    const serversDetail = [];
    let totalRooted = 0;
    let totalWithScripts = 0;
    let totalEmpty = 0;
    let totalRamNetwork = 0;
    let totalRamUsed = 0;
    
    for (const hostname of allServers) {
        const hasRoot = ns.hasRootAccess(hostname);
        const maxRam = ns.getServerMaxRam(hostname);
        const usedRam = ns.getServerUsedRam(hostname);
        const processes = ns.ps(hostname);
        
        if (hasRoot) totalRooted++;
        if (processes.length > 0) totalWithScripts++;
        if (processes.length === 0 && maxRam > 0) totalEmpty++;
        
        totalRamNetwork += maxRam;
        totalRamUsed += usedRam;
        
        serversDetail.push({
            hostname: hostname,
            hasRoot: hasRoot,
            maxRam: maxRam,
            usedRam: usedRam,
            availableRam: maxRam - usedRam,
            processCount: processes.length,
            processes: processes.map(p => ({
                filename: p.filename,
                threads: p.threads,
                args: p.args
            }))
        });
    }
    
    return {
        timestamp: new Date().toISOString(),
        totalServersScanned: allServers.length,
        totalServersRooted: totalRooted,
        totalServersWithScripts: totalWithScripts,
        totalServersEmpty: totalEmpty,
        totalRamNetwork: totalRamNetwork,
        totalRamUsed: totalRamUsed,
        ramUsagePercent: totalRamNetwork > 0 ? (totalRamUsed / totalRamNetwork) * 100 : 0,
        serversDetail: serversDetail
    };
}

function collectPerformanceMetrics(ns, debug) {
    const allServers = scanAll(ns);
    let totalThreads = 0;
    
    for (const server of allServers) {
        const processes = ns.ps(server);
        for (const proc of processes) {
            totalThreads += proc.threads;
        }
    }
    
    let revenuePerSecond = 0;
    try {
        const income = ns.getScriptIncome();
        if (income && Array.isArray(income) && income.length > 0) {
            revenuePerSecond = income[0] || 0;
        }
    } catch (e) {
        revenuePerSecond = 0;
    }
    
    return {
        timestamp: new Date().toISOString(),
        currentMoney: ns.getServerMoneyAvailable("home"),
        revenuePerSecond: revenuePerSecond,
        totalThreads: totalThreads,
        hackingLevel: ns.getHackingLevel()
    };
}

function collectPlayerStats(ns, debug) {
    return {
        timestamp: new Date().toISOString(),
        hackingLevel: ns.getHackingLevel(),
        currentBitNode: getCurrentBitNode(ns),
        timeSinceLastAug: ns.getTimeSinceLastAug(),
        homeRamMax: ns.getServerMaxRam("home"),
        homeRamUsed: ns.getServerUsedRam("home"),
        purchasedServers: ns.getPurchasedServers().length
    };
}

function collectVersionInfo(ns, debug) {
    const files = [
        "/lib/debug.js",
        "/lib/constants.js",
        "/lib/state-manager.js",
        "/lib/capabilities.js",
        "/lib/network.js",
        "/tools/telemetry-daemon.js"
    ];
    
    const versions = {};
    
    for (const file of files) {
        if (ns.fileExists(file)) {
            const content = ns.read(file);
            const match = content.match(/v([\d.]+[-\w]*)/);
            versions[file] = match ? match[1] : "unknown";
        }
    }
    
    return {
        timestamp: new Date().toISOString(),
        framework: CONFIG.VERSION.FRAMEWORK,
        version: CONFIG.VERSION.FULL,
        versions: versions
    };
}

function getCurrentBitNode(ns) {
    try {
        if (ns.getOwnedSourceFiles) {
            return "BN-1"; // Placeholder
        }
    } catch (e) {
        // Pas Singularity
    }
    
    return "BN-1";
}

function scanAll(ns) {
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
