#!/usr/bin/env node
/**
 * Update all <lastmod> tags in sitemap.xml to today's date (UTC).
 * Keeps the rest of the file intact.
 */
const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
const today = new Date().toISOString().slice(0, 10);

try {
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const updated = xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

    if (updated !== xml) {
        fs.writeFileSync(sitemapPath, updated, 'utf8');
        console.log(`sitemap.xml updated to ${today}`);
    } else {
        console.log('No changes to sitemap.xml');
    }
} catch (err) {
    console.error('Failed to update sitemap.xml:', err);
    process.exit(1);
}
