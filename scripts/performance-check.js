#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function checkPerformance() {
  console.log("🚀 Performance Check Report");
  console.log("===========================\n");

  // Check if build exists
  const buildDir = path.join(process.cwd(), ".next");
  if (!fs.existsSync(buildDir)) {
    console.log('❌ No build found. Run "npm run build" first.');
    return;
  }

  // Check bundle sizes
  const chunksDir = path.join(buildDir, "static", "chunks");
  if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir);
    const jsFiles = files.filter((f) => f.endsWith(".js"));
    const totalSize = jsFiles.reduce((sum, file) => {
      const stats = fs.statSync(path.join(chunksDir, file));
      return sum + stats.size;
    }, 0);

    console.log("📦 Bundle Size Analysis:");
    console.log(`  Total JS Files: ${jsFiles.length}`);
    console.log(`  Total Size: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log(`  Total Size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);

    // Performance recommendations
    if (totalSize < 500 * 1024) {
      console.log("  ✅ Bundle size is good (< 500KB)");
    } else if (totalSize < 1000 * 1024) {
      console.log("  ⚠️  Bundle size is moderate (500KB - 1MB)");
    } else {
      console.log("  ❌ Bundle size is large (> 1MB)");
    }
  }

  // Check for optimized images
  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(publicDir)) {
    const imageFiles = [];
    function scanForImages(dir) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          scanForImages(filePath);
        } else if (/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)) {
          imageFiles.push({
            name: file,
            size: stats.size,
            path: filePath.replace(process.cwd(), ""),
          });
        }
      });
    }
    scanForImages(publicDir);

    if (imageFiles.length > 0) {
      console.log("\n🖼️  Image Analysis:");
      console.log(`  Total Images: ${imageFiles.length}`);
      const totalImageSize = imageFiles.reduce((sum, img) => sum + img.size, 0);
      console.log(
        `  Total Image Size: ${(totalImageSize / (1024 * 1024)).toFixed(2)} MB`
      );

      // Check for large images
      const largeImages = imageFiles.filter((img) => img.size > 500 * 1024); // > 500KB
      if (largeImages.length > 0) {
        console.log("  ⚠️  Large images found:");
        largeImages.forEach((img) => {
          console.log(`    ${img.path}: ${(img.size / 1024).toFixed(2)} KB`);
        });
      } else {
        console.log("  ✅ All images are reasonably sized");
      }
    }
  }

  // Check for performance optimizations
  console.log("\n🔧 Performance Optimizations:");

  // Check if React.memo is used
  const componentsDir = path.join(process.cwd(), "components");
  if (fs.existsSync(componentsDir)) {
    let memoCount = 0;
    let totalComponents = 0;

    function scanComponents(dir) {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          scanComponents(filePath);
        } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
          totalComponents++;
          const content = fs.readFileSync(filePath, "utf8");
          if (content.includes("React.memo") || content.includes("memo(")) {
            memoCount++;
          }
        }
      });
    }
    scanComponents(componentsDir);

    console.log(
      `  React.memo Usage: ${memoCount}/${totalComponents} components`
    );
    if (memoCount > totalComponents * 0.5) {
      console.log("  ✅ Good memoization coverage");
    } else {
      console.log("  ⚠️  Consider adding React.memo to more components");
    }
  }

  // Check Next.js config
  const nextConfigPath = path.join(process.cwd(), "next.config.js");
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, "utf8");
    const optimizations = [];

    if (configContent.includes("optimizeCss"))
      optimizations.push("CSS Optimization");
    if (configContent.includes("optimizePackageImports"))
      optimizations.push("Package Import Optimization");
    if (configContent.includes("compress")) optimizations.push("Compression");
    if (configContent.includes("swcMinify"))
      optimizations.push("SWC Minification");
    if (configContent.includes("splitChunks"))
      optimizations.push("Bundle Splitting");

    console.log(`  Next.js Optimizations: ${optimizations.length} enabled`);
    optimizations.forEach((opt) => console.log(`    ✅ ${opt}`));
  }

  console.log("\n✅ Performance check complete!");
}

// Run performance check
checkPerformance();
