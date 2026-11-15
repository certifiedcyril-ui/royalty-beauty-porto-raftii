## Fix blocked external links in preview

### Problem
Links to Instagram, Facebook, and Google Maps use `target="_blank"`. Inside the Lovable preview iframe, the browser treats these as popups and blocks them with a "blocked" warning.

### Solution
Remove `target="_blank"` and `rel="noopener noreferrer"` from all external links in `src/routes/index.tsx`:
1. Instagram link (Contact section and Footer)
2. Facebook link (Contact section and Footer)  
3. Google Maps address link (Contact section and Footer)

This lets the links navigate normally within the preview window. On the published site they will also work correctly, just without opening a new tab.

### No other changes needed
- Phone `tel:` links are unaffected (no `target="_blank"`)
- Internal anchor links (`#services`, `#booking`, etc.) are unaffected