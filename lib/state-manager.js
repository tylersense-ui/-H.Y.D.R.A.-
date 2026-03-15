/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║            🐍 H.Y.D.R.A. v0.1.0-GENESIS                   ║
 * ║              Multi-Headed Adaptive Framework              ║
 * ╠═══════════════════════════════════════════════════════════╣
 * ║  Module: State Persistence Manager                        ║
 * ║  File:   /lib/state-manager.js                            ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/state-manager.js
 * @version     0.1.0-GENESIS
 * @author      Claude (Godlike AI Operator)
 * @description API unifiée pour lire/écrire état persistant
 * 
 * USAGE:
 *   import { StateManager } from "/lib/state-manager.js";
 *   
 *   const state = new StateManager(ns);
 *   await state.save("mydata.json", { key: "value" });
 *   const data = state.load("mydata.json");
 * 
 * FEATURES:
 *   - Lecture/écriture JSON automatique
 *   - Vérification existence fichiers
 *   - Nettoyage fichiers anciens
 *   - Append pour logs
 * 
 * CHANGELOG:
 *   v0.1.0-GENESIS (2026-03-15)
 *     - Migration depuis NEXUS v0.11.1
 *     - Rebrand H.Y.D.R.A.
 *     - API inchangée (stable et éprouvée)
 */

export class StateManager {
    /**
     * @param {NS} ns - NetScript API
     */
    constructor(ns) {
        this.ns = ns;
        this.stateDir = "/state";
    }
    
    /**
     * Sauvegarder données dans /state/
     * @param {string} filename - Nom du fichier (ex: "telemetry-realtime.json")
     * @param {any} data - Données à sauvegarder (sera JSON.stringify si object)
     * @returns {Promise<boolean>} Succès
     */
    async save(filename, data) {
        try {
            const filepath = `${this.stateDir}/${filename}`;
            
            // Convertir en string si nécessaire
            let content;
            if (typeof data === 'string') {
                content = data;
            } else {
                content = JSON.stringify(data, null, 2);
            }
            
            // Écrire le fichier
            await this.ns.write(filepath, content, "w");
            
            return true;
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.save(${filename}): ${error}`);
            return false;
        }
    }
    
    /**
     * Charger données depuis /state/
     * @param {string} filename - Nom du fichier
     * @param {boolean} parseJSON - Parser en JSON ? (default: true)
     * @returns {any|null} Données ou null si erreur
     */
    load(filename, parseJSON = true) {
        try {
            const filepath = `${this.stateDir}/${filename}`;
            
            // Vérifier existence
            if (!this.ns.fileExists(filepath)) {
                return null;
            }
            
            // Lire le fichier
            const content = this.ns.read(filepath);
            
            if (!content || content === "") {
                return null;
            }
            
            // Parser JSON si demandé
            if (parseJSON) {
                try {
                    return JSON.parse(content);
                } catch (e) {
                    this.ns.print(`⚠️  WARN StateManager.load(${filename}): JSON parse failed`);
                    return content; // Retourner string brute
                }
            }
            
            return content;
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.load(${filename}): ${error}`);
            return null;
        }
    }
    
    /**
     * Vérifier existence fichier
     * @param {string} filename - Nom du fichier
     * @returns {boolean}
     */
    exists(filename) {
        const filepath = `${this.stateDir}/${filename}`;
        return this.ns.fileExists(filepath);
    }
    
    /**
     * Supprimer fichier
     * @param {string} filename - Nom du fichier
     * @returns {boolean}
     */
    delete(filename) {
        try {
            const filepath = `${this.stateDir}/${filename}`;
            return this.ns.rm(filepath);
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.delete(${filename}): ${error}`);
            return false;
        }
    }
    
    /**
     * Lister tous les fichiers /state/
     * @returns {Array<string>} Liste des fichiers
     */
    list() {
        try {
            return this.ns.ls("home", this.stateDir);
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.list(): ${error}`);
            return [];
        }
    }
    
    /**
     * Nettoyer vieux fichiers (age > maxAge ms)
     * @param {number} maxAge - Age maximum en ms (défaut: 24h)
     * @returns {number} Nombre de fichiers supprimés
     */
    cleanup(maxAge = 86400000) {
        try {
            const files = this.list();
            let deleted = 0;
            const now = Date.now();
            
            for (const file of files) {
                // Charger pour vérifier timestamp
                const data = this.load(file);
                
                if (data && data.timestamp) {
                    const fileTime = new Date(data.timestamp).getTime();
                    const age = now - fileTime;
                    
                    if (age > maxAge) {
                        if (this.delete(file)) {
                            deleted++;
                        }
                    }
                }
            }
            
            return deleted;
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.cleanup(): ${error}`);
            return 0;
        }
    }
    
    /**
     * Append à un fichier log (.txt)
     * @param {string} filename - Nom du fichier log
     * @param {string} message - Message à ajouter
     * @returns {Promise<boolean>}
     */
    async append(filename, message) {
        try {
            const filepath = `${this.stateDir}/${filename}`;
            const timestamp = new Date().toISOString();
            const line = `[${timestamp}] ${message}\n`;
            
            await this.ns.write(filepath, line, "a");
            return true;
        } catch (error) {
            this.ns.print(`❌ ERROR StateManager.append(${filename}): ${error}`);
            return false;
        }
    }
}

// ════════════════════════════════════════════════════════════
// STANDALONE USAGE (Test du State Manager)
// ════════════════════════════════════════════════════════════

/** @param {NS} ns */
export async function main(ns) {
    const state = new StateManager(ns);
    
    ns.tprint("═".repeat(65));
    ns.tprint("🐍 H.Y.D.R.A. STATE MANAGER TEST");
    ns.tprint("═".repeat(65));
    
    // Test save
    const testData = {
        framework: "H.Y.D.R.A.",
        version: "0.1.0-GENESIS",
        timestamp: new Date().toISOString()
    };
    
    ns.tprint("📝 Saving test data...");
    await state.save("test-state.json", testData);
    
    // Test load
    ns.tprint("📖 Loading test data...");
    const loaded = state.load("test-state.json");
    
    if (loaded) {
        ns.tprint(`✅ Loaded: ${loaded.framework} ${loaded.version}`);
    } else {
        ns.tprint("❌ Load failed!");
    }
    
    // Test list
    ns.tprint("\n📂 State files:");
    const files = state.list();
    for (const file of files) {
        ns.tprint(`   - ${file}`);
    }
    
    ns.tprint("═".repeat(65));
}
