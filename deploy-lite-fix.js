/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.1-HOTFIX                    ║
 * ║              Quick Deploy - Telemetry Lite                ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        deploy-lite-fix.js
 * @version     0.1.1-HOTFIX
 * @description Deploy telemetry-daemon-lite.js uniquement
 * 
 * USAGE:
 *   run deploy-lite-fix.js
 */

const REPO_BASE = "https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main";

/** @param {NS} ns */
export async function main(ns) {
    ns.tprint("═".repeat(65));
    ns.tprint("🐍 H.Y.D.R.A. HOTFIX v0.1.1 - Deploying Lite Daemon");
    ns.tprint("═".repeat(65));
    
    const url = `${REPO_BASE}/tools/telemetry-daemon-lite.js`;
    const filepath = "/tools/telemetry-daemon-lite.js";
    
    ns.tprint(`Downloading ${filepath}...`);
    
    const success = await ns.wget(url, filepath);
    
    if (success) {
        ns.tprint("✅ SUCCESS!");
        ns.tprint("");
        ns.tprint("Next step:");
        ns.tprint("  run /tools/telemetry-daemon-lite.js");
        ns.tprint("═".repeat(65));
    } else {
        ns.tprint("❌ FAILED!");
        ns.tprint("");
        ns.tprint("Manual alternative:");
        ns.tprint("  1. Copy telemetry-daemon-lite.js content");
        ns.tprint("  2. In-game: nano /tools/telemetry-daemon-lite.js");
        ns.tprint("  3. Paste and save");
        ns.tprint("═".repeat(65));
    }
}
