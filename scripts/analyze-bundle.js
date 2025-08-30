#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Simple bundle size analyzer
function analyzeBundle() {
  const chunksDir = path.join(process.cwd(), ".next", "static", "chunks");

  if (!fs.existsSync(chunksDir)) {
    console.log('❌ No build found. Run "npm run build" first.');
    return;
  }

  console.log("📊 Bundle Analysis Report");
  console.log("========================\n");

  const files = fs.readdirSync(chunksDir);
  let totalSize = 0;
  const fileSizes = [];

  files.forEach((file) => {
    if (file.endsWith(".js")) {
      const filePath = path.join(chunksDir, file);
      const stats = fs.statSync(filePath);
      const sizeInKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      fileSizes.push({ name: file, size: stats.size, sizeKB: sizeInKB });
    }
  });

  // Sort by size (largest first)
  fileSizes.sort((a, b) => b.size - a.size);

  console.log("📁 JavaScript Chunks:");
  fileSizes.forEach((file) => {
    console.log(`  ${file.name}: ${file.sizeKB} KB`);
  });

  console.log(`\n📈 Total Bundle Size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(
    `📈 Total Bundle Size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`
  );

  // Analyze vendor vs app code
  const vendorFiles = fileSizes.filter((f) => f.name.includes("vendors"));
  const appFiles = fileSizes.filter((f) => !f.name.includes("vendors"));

  const vendorSize = vendorFiles.reduce((sum, f) => sum + f.size, 0);
  const appSize = appFiles.reduce((sum, f) => sum + f.size, 0);

  console.log("\n🔍 Bundle Breakdown:");
  console.log(
    `  Vendor Code: ${(vendorSize / 1024).toFixed(2)} KB (${(
      (vendorSize / totalSize) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `  App Code: ${(appSize / 1024).toFixed(2)} KB (${(
      (appSize / totalSize) *
      100
    ).toFixed(1)}%)`
  );

  // Recommendations
  console.log("\n💡 Recommendations:");
  if (vendorSize > totalSize * 0.8) {
    console.log(
      "  ⚠️  Vendor bundle is large. Consider code splitting or tree shaking."
    );
  }
  if (totalSize > 500 * 1024) {
    // 500KB
    console.log(
      "  ⚠️  Total bundle size is large. Consider lazy loading components."
    );
  }
  if (appSize > 200 * 1024) {
    // 200KB
    console.log(
      "  ⚠️  App code is large. Consider splitting into smaller chunks."
    );
  }

  console.log("\n✅ Bundle analysis complete!");
}

// Run analysis
analyzeBundle();
