/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.2.0-BOOTSTRAP                 ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Bootstrap Controller (Orchestrateur)             ║
 * ║  File:   /core/bootstrap-controller.js                    ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /core/bootstrap-controller.js
 * @version     0.2.0-BOOTSTRAP
 * @author      Claude (Godlike AI Operator)
 * @description Orchestrateur central pour early game bootstrap
 * 
 * USAGE:
 *   run /core/bootstrap-controller.js
 *   run /core/bootstrap-controller.js n00dles
 * 
 * ARGS:
 *   target - Cible à attaquer (default: n00dles)
 * 
 * FEATURES:
 *   - Auto-nuke périodique
 *   - Deploy workers automatique
 *   - Monitor progression (niveau, money)
 *   - Toasts milestones
 *   - Stats en temps réel
 * 
 * MILESTONES:
 *   - Niveau 10, 20, 30, 50, 100
 *   - Money $100k, $500k, $1M, $5M
 *   - Port tools achetables
 * 
 * CHANGELOG:
 *   v0.2.0-BOOTSTRAP (2026-03-15)
 *     - Création controller bootstrap
 *     - Orchestre auto-nuke + deploy-workers
 *     - Early game focus (niveau 1-50)
 */

import { autoNuke } from "/core/auto-nuke.js";
import { deployWorkers } from "/core/deploy-workers.js";

const UPDATE_INTERVAL = 60000; // 60s
const NUKE_INTERVAL = 300000; // 5min

// Milestones pour toasts
const LEVEL_MILESTONES = [10, 20, 30, 50, 100];
const MONEY_MILESTONES = [100000, 500000, 1000000, 5000000, 10000000];

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tail();
    
    const target = ns.args[0] || "n00dles";
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║   🐍 H.Y.D.R.A. BOOTSTRAP CONTROLLER                      ║");
    ns.print("║   Early Game Auto-Pilot                                  ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    ns.print(`🎯 Target: ${target}`);
    ns.print(`⏱️  Update: ${UPDATE_INTERVAL/1000}s`);
    ns.print(`🔓 Nuke: ${NUKE_INTERVAL/1000}s`);
    ns.print("═".repeat(65));
    
    ns.toast("🐍 Bootstrap controller started!", "success", 3000);
    
    // Stats tracking pour milestones
    let lastLevel = ns.getHackingLevel();
    let lastMoney = ns.getServerMoneyAvailable("home");
    let levelMilestoneIndex = 0;
    let moneyMilestoneIndex = 0;
    
    let cycle = 0;
    let lastNukeTime = 0;
    let nukeResult = null;
    let deployResult = null;
    
    while (true) {
        cycle++;
        const now = Date.now();
        
        // ══════════════════════════════════════════════════════════════
        // AUTO-NUKE (Périodique)
        // ══════════════════════════════════════════════════════════════
        
        if (now - lastNukeTime >= NUKE_INTERVAL || cycle === 1) {
            ns.print("");
            ns.print("🔓 Running auto-nuke...");
            
            nukeResult = await autoNuke(ns);
            lastNukeTime = now;
            
            ns.print(`   Scanned: ${nukeResult.totalScanned}`);
            ns.print(`   Rooted: ${nukeResult.rooted.length}`);
            ns.print(`   Newly cracked: ${nukeResult.cracked.length}`);
            
            if (nukeResult.cracked.length > 0) {
                ns.toast(`🔓 ${nukeResult.cracked.length} new servers rooted!`, "success", 3000);
            }
        }
        
        // ══════════════════════════════════════════════════════════════
        // DEPLOY WORKERS
        // ══════════════════════════════════════════════════════════════
        
        if (nukeResult && nukeResult.rooted.length > 0) {
            ns.print("");
            ns.print("⚡ Deploying hack workers...");
            
            deployResult = await deployWorkers(
                ns,
                nukeResult.rooted,
                target,
                "hack",
                true // Kill existing
            );
            
            ns.print(`   Deployed: ${deployResult.serversDeployed} servers`);
            ns.print(`   Threads: ${deployResult.totalThreads}`);
        }
        
        // ══════════════════════════════════════════════════════════════
        // STATS & MILESTONES
        // ══════════════════════════════════════════════════════════════
        
        const currentLevel = ns.getHackingLevel();
        const currentMoney = ns.getServerMoneyAvailable("home");
        const income = ns.getScriptIncome()[0] || 0;
        
        // Check level milestones
        while (levelMilestoneIndex < LEVEL_MILESTONES.length &&
               currentLevel >= LEVEL_MILESTONES[levelMilestoneIndex]) {
            const milestone = LEVEL_MILESTONES[levelMilestoneIndex];
            ns.toast(`🎯 Level ${milestone} reached!`, "success", 5000);
            levelMilestoneIndex++;
        }
        
        // Check money milestones
        while (moneyMilestoneIndex < MONEY_MILESTONES.length &&
               currentMoney >= MONEY_MILESTONES[moneyMilestoneIndex]) {
            const milestone = MONEY_MILESTONES[moneyMilestoneIndex];
            ns.toast(`💰 $${ns.formatNumber(milestone)} reached!`, "success", 5000);
            moneyMilestoneIndex++;
            
            // Toast pour acheter outils
            if (milestone === 500000 && nukeResult.portToolsCount === 0) {
                ns.toast("💡 Buy BruteSSH.exe to unlock more servers!", "info", 10000);
            }
        }
        
        // ══════════════════════════════════════════════════════════════
        // DISPLAY STATUS
        // ══════════════════════════════════════════════════════════════
        
        ns.clearLog();
        
        ns.print("╔═══════════════════════════════════════════════════════════╗");
        ns.print("║   🐍 H.Y.D.R.A. BOOTSTRAP CONTROLLER                      ║");
        ns.print("╚═══════════════════════════════════════════════════════════╝");
        ns.print("");
        ns.print(`📊 Cycle: ${cycle}`);
        ns.print(`🎯 Target: ${target}`);
        ns.print("");
        
        ns.print("━━━ NETWORK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        if (nukeResult) {
            ns.print(`🌐 Servers scanned: ${nukeResult.totalScanned}`);
            ns.print(`✅ Servers rooted: ${nukeResult.rooted.length}`);
            ns.print(`🔧 Port tools: ${nukeResult.portToolsCount}/5`);
        }
        
        if (deployResult) {
            ns.print(`⚡ Active threads: ${deployResult.totalThreads}`);
            ns.print(`📡 Active servers: ${deployResult.serversDeployed}`);
        }
        ns.print("");
        
        ns.print("━━━ PLAYER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        ns.print(`🎯 Hacking level: ${currentLevel}`);
        ns.print(`💰 Money: $${ns.formatNumber(currentMoney)}`);
        ns.print(`📈 Income: $${ns.formatNumber(income)}/s`);
        ns.print("");
        
        ns.print("━━━ MILESTONES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        const nextLevel = LEVEL_MILESTONES[levelMilestoneIndex];
        const nextMoney = MONEY_MILESTONES[moneyMilestoneIndex];
        
        if (nextLevel) {
            ns.print(`🎯 Next level: ${nextLevel} (${nextLevel - currentLevel} to go)`);
        }
        if (nextMoney) {
            ns.print(`💰 Next money: $${ns.formatNumber(nextMoney)} ($${ns.formatNumber(nextMoney - currentMoney)} to go)`);
        }
        
        ns.print("");
        ns.print(`⏳ Next update in ${UPDATE_INTERVAL/1000}s...`);
        ns.print("═".repeat(65));
        
        // Update tracking
        lastLevel = currentLevel;
        lastMoney = currentMoney;
        
        await ns.sleep(UPDATE_INTERVAL);
    }
}
