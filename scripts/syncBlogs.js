import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const blogIndexPath = path.join(root, 'src', 'blogIndex.json');
const publicBlogDir = path.join(root, 'public', 'blog');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

async function copyFile(src, dest) {
  try {
    await fs.copyFile(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  } catch (e) {
    console.error(`Failed to copy ${src}: ${e.message}`);
  }
}

(async () => {
  try {
    const raw = await fs.readFile(blogIndexPath, 'utf8');
    const index = JSON.parse(raw);
    await ensureDir(publicBlogDir);

    for (const post of index) {
      if (!post.filePath || !post.slug) continue;
      // filePath in index appears to be workspace-relative like "/Daily Blogs for Website/2026-08-12/01-...html"
      // try to resolve relative to project root
      const relativePath = post.filePath.replace(/^\//, '');
      const candidate = path.join(root, relativePath);
      const altCandidate = path.join(root, 'Daily Blogs for Website', path.basename(post.filePath));

      let srcPath = candidate;
      try {
        await fs.access(srcPath);
      } catch (e) {
        // try alt
        try {
          await fs.access(altCandidate);
          srcPath = altCandidate;
        } catch (e2) {
          console.warn(`Source not found for post ${post.slug}: tried ${candidate} and ${altCandidate}`);
          continue;
        }
      }

      const destPath = path.join(publicBlogDir, `${post.slug}.html`);
      await copyFile(srcPath, destPath);
    }

    console.log('sync-blogs complete.');
  } catch (e) {
    console.error('Error running syncBlogs:', e.message);
    process.exitCode = 1;
  }
})();
