# Going live — sending the client a link

Data is stored in a plain JSON file (`data/aims.json`). There are **no native
modules**, so the app installs and runs anywhere. For a **shared live link**
the only requirement is a host that runs a Node server with a **persistent
disk** (so `data/aims.json` survives restarts).

## Recommended options

### Option A — Railway (fastest)
1. Push this project to a GitHub repo.
2. railway.app → New Project → Deploy from GitHub.
3. Add a **Volume** mounted at `/app/data` (so `aims.json` persists).
4. Deploy → you get a public URL like `aims-portal.up.railway.app` to send the
   client. Free trial credit, then ~$5/month.

### Option B — Small VPS (cheapest long-term)
- Hostinger / Contabo VPS (~₹300–400/month), Node + PM2 + Nginx.
- `npm install && npm run build && pm2 start "npm start"`. Data lives on disk.

### Option C — Vercel free (needs a hosted DB)
- Vercel is serverless with a read-only filesystem, so the JSON file will not
  persist there. To use Vercel's free tier, move the data layer to **Neon
  Postgres** (free, auto-wakes). Only `lib/db.js`, `lib/queries.js` and
  `lib/actions.js` change; the pages stay the same.

## Quick local run (demo on one PC)
```bash
npm install
npm run build
npm start      # http://localhost:3000
```
