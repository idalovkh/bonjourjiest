import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LOG = join(dirname(fileURLToPath(import.meta.url)), "..", ".cursor", "debug-4dcb26.log");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function log(hypothesisId, location, message, data = {}) {
  const entry = JSON.stringify({
    sessionId: "4dcb26",
    runId: "vercel-diagnose",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  });
  appendFileSync(LOG, `${entry}\n`);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, ...opts.env },
    timeout: opts.timeout ?? 180000,
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: (result.stdout || "").slice(-4000),
    stderr: (result.stderr || "").slice(-4000),
  };
}

// H1: package-lock out of sync with package.json
try {
  const ci = run("npm", ["ci", "--ignore-scripts"], { timeout: 300000 });
  log("H1", "debug-vercel-deploy.mjs:ci", "npm ci result", {
    ok: ci.ok,
    status: ci.status,
    stderr: ci.stderr,
    stdoutTail: ci.stdout.slice(-500),
  });
} catch (e) {
  log("H1", "debug-vercel-deploy.mjs:ci", "npm ci threw", { error: String(e) });
}

// H2: playwright postinstall breaks install on Vercel
try {
  const ciScripts = run("npm", ["ci"], { timeout: 300000 });
  log("H2", "debug-vercel-deploy.mjs:ci-scripts", "npm ci with scripts result", {
    ok: ciScripts.ok,
    status: ciScripts.status,
    stderr: ciScripts.stderr,
    stdoutTail: ciScripts.stdout.slice(-500),
  });
} catch (e) {
  log("H2", "debug-vercel-deploy.mjs:ci-scripts", "npm ci with scripts threw", { error: String(e) });
}

// H3: vite build fails
try {
  const build = run("npm", ["run", "build"], { timeout: 120000 });
  log("H3", "debug-vercel-deploy.mjs:build", "vite build result", {
    ok: build.ok,
    status: build.status,
    stderr: build.stderr,
    stdoutTail: build.stdout.slice(-500),
  });
} catch (e) {
  log("H3", "debug-vercel-deploy.mjs:build", "build threw", { error: String(e) });
}

// H4: Node engine >=22 vs current
log("H4", "debug-vercel-deploy.mjs:node", "node version check", {
  nodeVersion: process.version,
  packageEngines: JSON.parse(readFileSync(join(root, "package.json"), "utf8")).engines,
});

// H5: api/lead.ts conflicts with api/lead/ directory + express in devDeps
const apiLeadFile = existsSync(join(root, "api", "lead.ts"));
const apiLeadDir = existsSync(join(root, "api", "lead"));
const handlerPath = join(root, "api", "_lib", "lead-handler.ts");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const leadSource = existsSync(handlerPath) ? readFileSync(handlerPath, "utf8") : "";
log("H5", "debug-vercel-deploy.mjs:api-structure", "api route structure", {
  hasApiLeadFile: apiLeadFile,
  hasApiLeadDir: apiLeadDir,
  conflict: apiLeadFile && apiLeadDir,
  hasSharedHandler: existsSync(handlerPath),
  expressInDeps: Boolean(pkg.dependencies?.express),
  expressInDevDeps: Boolean(pkg.devDependencies?.express),
  usesExpressTypes: leadSource.includes('from "express"'),
  fixApplied: !apiLeadFile && apiLeadDir && existsSync(handlerPath),
});

// H6: vercel build CLI
try {
  const vercelBuild = run("npx", ["--yes", "vercel@latest", "build", "--yes"], { timeout: 300000 });
  log("H6", "debug-vercel-deploy.mjs:vercel-build", "vercel build result", {
    ok: vercelBuild.ok,
    status: vercelBuild.status,
    stderr: vercelBuild.stderr,
    stdoutTail: vercelBuild.stdout.slice(-2000),
  });
} catch (e) {
  log("H6", "debug-vercel-deploy.mjs:vercel-build", "vercel build threw", { error: String(e) });
}

console.log("Diagnosis complete. Log written to .cursor/debug-4dcb26.log");
