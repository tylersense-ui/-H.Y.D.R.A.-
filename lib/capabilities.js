/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: Player Capabilities Detector                     ║
 * ║  File:   /lib/capabilities.js                             ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/capabilities.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Détection automatique des capacités du joueur
 * 
 * USAGE:
 *   import { Capabilities } from "/lib/capabilities.js";
 *   
 *   const caps = new Capabilities(ns);
 *   if (caps.hasFormulas) {
 *     // Utiliser formulas
 *   }
 *   caps.printReport(true); // Afficher dans terminal
 * 
 * DÉTECTE:
 *   - Formulas.exe
 *   - Outils de port (BruteSSH, FTPCrack, etc.)
 *   - Stats joueur (niveau, argent, RAM home)
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.5
 *     - Rebrand H.Y.D.R.A.
 *     - Singularity check désactivé (RAM intensive)
 */

export class Capabilities {
    /**
     * @param {NS} ns - NetScript API
     */
    constructor(ns) {
        this.ns = ns;
        this.scan();
    }
    
    /**
     * Scanner les capacités actuelles
     */
    scan() {
        // Formulas.exe ($5B, critical pour optimisations)
        this.hasFormulas = this.ns.fileExists("Formulas.exe");
        
        // Singularity API (80GB RAM, désactivé pour early game)
        this.hasSingularity = false;
        
        // Outils de port
        this.tools = {
            brutessh: this.ns.fileExists("BruteSSH.exe"),
            ftpcrack: this.ns.fileExists("FTPCrack.exe"),
            relaysmtp: this.ns.fileExists("relaySMTP.exe"),
            httpworm: this.ns.fileExists("HTTPWorm.exe"),
            sqlinject: this.ns.fileExists("SQLInject.exe")
        };
        
        // Compter nombre de ports ouverts
        this.portCount = Object.values(this.tools).filter(x => x).length;
        
        // Stats joueur
        this.hackingLevel = this.ns.getHackingLevel();
        this.money = this.ns.getServerMoneyAvailable("home");
        this.homeRam = this.ns.getServerMaxRam("home");
    }
    
    /**
     * Afficher rapport des capacités
     * @param {boolean} toTerminal - Afficher dans terminal (true) ou log (false)
     */
    printReport(toTerminal = false) {
        const print = toTerminal ? this.ns.tprint.bind(this.ns) : this.ns.print.bind(this.ns);
        
        print("═".repeat(65));
        print("🐍 H.Y.D.R.A. CAPABILITIES REPORT");
        print("═".repeat(65));
        print(`Formulas.exe: ${this.hasFormulas ? "✅" : "❌"}`);
        print(`Outils de port: ${this.portCount}/5`);
        if (this.tools.brutessh) print("  ✅ BruteSSH.exe");
        if (this.tools.ftpcrack) print("  ✅ FTPCrack.exe");
        if (this.tools.relaysmtp) print("  ✅ relaySMTP.exe");
        if (this.tools.httpworm) print("  ✅ HTTPWorm.exe");
        if (this.tools.sqlinject) print("  ✅ SQLInject.exe");
        print("");
        print(`Hacking Level: ${this.hackingLevel}`);
        print(`Money: $${this.ns.formatNumber(this.money)}`);
        print(`Home RAM: ${this.ns.formatRam(this.homeRam)}`);
        print("═".repeat(65));
    }
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    const caps = new Capabilities(ns);
    caps.printReport(true);
}
