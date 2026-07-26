import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

if (process.platform !== "linux" || process.arch !== "x64") {
  process.exit(0);
}

const nativePackages = [
  ["@tailwindcss/oxide-linux-x64-gnu", "4.2.4"],
  ["lightningcss-linux-x64-gnu", "1.32.0"],
  ["@rolldown/binding-linux-x64-gnu", "1.0.3"],
];

const missing = nativePackages.filter(([name]) => {
  try {
    require.resolve(name);
    return false;
  } catch {
    return true;
  }
});

if (missing.length === 0) {
  process.exit(0);
}

execFileSync(
  "npm",
  [
    "install",
    "--no-save",
    "--package-lock=false",
    "--ignore-scripts",
    ...missing.map(([name, version]) => `${name}@${version}`),
  ],
  { stdio: "inherit" },
);
