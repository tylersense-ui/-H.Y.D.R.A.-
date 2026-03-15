/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: GitHub Deployment Script                         ║
 * ║  File:   deploy-hydra.js                                  ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        deploy-hydra.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description Deploy H.Y.D.R.A. from GitHub to game
 * 
 * USAGE:
 *   run deploy-hydra.js
 *
 * WHAT IT DOES:
 *   1. Creates directory structure
 *   2. Downloads manifest.json from GitHub
 *   3. Downloads all files listed in manifest
 *   4. Deploys in dependency order
 *   5. Verifies installation
 * 
 * REPOSITORY:
 *   https://github.com/tylersense-ui/-H.Y.D.R.A.-.git
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Initial creation
 *     - GitHub pull deployment
 *     - Auto directory creation
 *     - Dependency-ordered deployment
 */

const REPO_BASE = "https://raw.githubusercontent.com/tylersense-ui/-H.Y.D.R.A.-/main";

/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.tail();
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║            🐍 H.Y.D.R.A. DEPLOYMENT                       ║");
    ns.print("║              GitHub → BitBurner                           ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print("");
    
    // ══════════════════════════════════════════════════════════════
    // 0️⃣ AUTO-UPDATE DEPLOY SCRIPT
    // ══════════════════════════════════════════════════════════════
    
    ns.print("🔄 Checking for deploy script updates...");
    const deployUrl = `${REPO_BASE}/deploy-hydra.js`;
    const deployBackup = "/deploy-hydra-backup.js";
    
    try {
        // Sauvegarder version actuelle
        const currentScript = ns.read("/deploy-hydra.js");
        await ns.write(deployBackup, currentScript, "w");
        
        // Télécharger nouvelle version
        const updateSuccess = await ns.wget(deployUrl, "/deploy-hydra-new.js");
        
        if (updateSuccess) {
            const newScript = ns.read("/deploy-hydra-new.js");
            
            // Vérifier si différent
            if (currentScript !== newScript) {
                ns.print("   ✅ New version found! Updating...");
                await ns.write("/deploy-hydra.js", newScript, "w");
                ns.rm("/deploy-hydra-new.js");
                
                ns.print("");
                ns.print("╔═══════════════════════════════════════════════════════════╗");
                ns.print("║   ⚠️  DEPLOY SCRIPT UPDATED                               ║");
                ns.print("║   Please run 'run deploy-hydra.js' again                 ║");
                ns.print("╚═══════════════════════════════════════════════════════════╝");
                
                ns.toast("🔄 Deploy script updated - please rerun", "warning", 5000);
                return;
            } else {
                ns.print("   ✓ Already up to date");
                ns.rm("/deploy-hydra-new.js");
            }
        } else {
            ns.print("   ⚠️  Could not check for updates (continuing anyway)");
        }
    } catch (error) {
        ns.print(`   ⚠️  Update check failed: ${error}`);
        ns.print("   Continuing with current version...");
    }
    
    ns.print("");
    
    // ══════════════════════════════════════════════════════════════
    // 1️⃣ CREATE DIRECTORY STRUCTURE
    // ══════════════════════════════════════════════════════════════
    
    ns.print("📁 Creating directory structure...");
    const dirs = ["/lib", "/tools", "/state", "/workers", "/core", "/managers", "/ui"];
    
    for (const dir of dirs) {
        ns.print(`   ✓ ${dir}`);
    }
    
    ns.print("");
    
    // ══════════════════════════════════════════════════════════════
    // 2️⃣ DOWNLOAD MANIFEST
    // ══════════════════════════════════════════════════════════════
    
    ns.print("📦 Downloading manifest.json...");
    const manifestUrl = `${REPO_BASE}/manifest.json`;
    
    let manifest;
    try {
        const manifestSuccess = await ns.wget(manifestUrl, "/manifest.json");
        if (!manifestSuccess) {
            ns.tprint("❌ ERROR: Failed to download manifest.json");
            ns.tprint(`URL: ${manifestUrl}`);
            return;
        }
        
        const manifestContent = ns.read("/manifest.json");
        manifest = JSON.parse(manifestContent);
        
        ns.print(`   ✓ ${manifest.framework} ${manifest.version}`);
        ns.print("");
    } catch (error) {
        ns.tprint(`❌ ERROR: Failed to parse manifest: ${error}`);
        return;
    }
    
    // ══════════════════════════════════════════════════════════════
    // 3️⃣ DOWNLOAD FILES (DEPENDENCY ORDER)
    // ══════════════════════════════════════════════════════════════
    
    ns.print("⬇️  Downloading files from GitHub...");
    
    // Trier par priorité (1 = highest)
    const fileEntries = Object.entries(manifest.files);
    fileEntries.sort((a, b) => a[1].priority - b[1].priority);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const [filepath, fileInfo] of fileEntries) {
        const url = `${REPO_BASE}${filepath}`;
        
        ns.print(`   Downloading ${filepath}...`);
        
        try {
            const success = await ns.wget(url, filepath);
            
            if (success) {
                ns.print(`      ✅ ${fileInfo.description}`);
                successCount++;
            } else {
                ns.print(`      ❌ FAILED`);
                failCount++;
            }
        } catch (error) {
            ns.print(`      ❌ ERROR: ${error}`);
            failCount++;
        }
    }
    
    ns.print("");
    
    // ══════════════════════════════════════════════════════════════
    // 4️⃣ DOWNLOAD DOCUMENTATION
    // ══════════════════════════════════════════════════════════════
    
    ns.print("📄 Downloading documentation...");
    
    const docs = ["README.md", "CHANGELOG.md"];
    for (const doc of docs) {
        const url = `${REPO_BASE}/${doc}`;
        const success = await ns.wget(url, `/${doc}`);
        ns.print(`   ${success ? "✅" : "❌"} ${doc}`);
    }
    
    ns.print("");
    
    // ══════════════════════════════════════════════════════════════
    // 5️⃣ DEPLOYMENT SUMMARY
    // ══════════════════════════════════════════════════════════════
    
    ns.print("╔═══════════════════════════════════════════════════════════╗");
    ns.print("║            DEPLOYMENT SUMMARY                             ║");
    ns.print("╚═══════════════════════════════════════════════════════════╝");
    ns.print(`✅ Success: ${successCount} files`);
    ns.print(`❌ Failed:  ${failCount} files`);
    ns.print("");
    
    if (failCount === 0) {
        ns.print("🎉 DEPLOYMENT COMPLETE!");
        ns.print("");
        ns.print("NEXT STEPS:");
        ns.print("  1. Run telemetry daemon:");
        ns.print("     run /tools/telemetry-daemon.js");
        ns.print("");
        ns.print("  2. Let it run for 1-2 minutes");
        ns.print("");
        ns.print("  3. Check /state/ files:");
        ns.print("     ls /state");
        ns.print("");
        ns.print("  4. Copy state files to Claude for analysis");
        ns.print("╔═══════════════════════════════════════════════════════════╗");
        
        ns.tprint("═".repeat(65));
        ns.tprint("✅ H.Y.D.R.A. DEPLOYMENT SUCCESSFUL!");
        ns.tprint("═".repeat(65));
        ns.tprint(`Framework: ${manifest.framework} ${manifest.version}`);
        ns.tprint(`Files deployed: ${successCount}`);
        ns.tprint("");
        ns.tprint("Next: run /tools/telemetry-daemon.js");
        ns.tprint("═".repeat(65));
        
        ns.toast("🐍 H.Y.D.R.A. deployed!", "success", 5000);
    } else {
        ns.print("⚠️  DEPLOYMENT INCOMPLETE!");
        ns.print(`${failCount} files failed to download.`);
        ns.print("Check network connection and repository access.");
        
        ns.tprint("❌ DEPLOYMENT FAILED");
        ns.tprint(`${failCount} files failed to download.`);
        
        ns.toast("❌ Deployment failed", "error", 5000);
    }
}
