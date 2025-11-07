Frontend deploy notes — Vercel
=================================

Purpose
-------
Short, copy-pastable steps to set the build-time API base and verify the frontend connects to the correct backend.

1) Set Vercel environment variable (Production)

- Key: VITE_API_BASE_URL
- Value: https://sherry-backend.vercel.app
- Environment: Production (also add to Preview if you want preview deployments to point to the same backend)

Save and trigger a redeploy (Deployments → Redeploy or push a new commit).

2) Verify backend health (PowerShell)

Invoke-RestMethod -Uri "https://sherry-backend.vercel.app/api/health/db" -Method Get

# or
curl "https://sherry-backend.vercel.app/api/health/db" -UseBasicParsing

Expected: JSON response like { ok: true, state: 1 } or similar.

3) Verify frontend (browser)

- Open the deployed site in a Private/Incognito window: https://sherrytravels-webapp.vercel.app
- Open DevTools → Network. Trigger the action (login / open dashboard).
- Confirm requests target: https://sherry-backend.vercel.app/api/...

4) Common troubleshooting

- If requests still target another host (old bundle): clear CDN/cache, open a private window, or trigger another redeploy.
- If you see CORS preflight or Authorization header errors, ensure your backend CORS allows the frontend origin and Authorization header. Example Express CORS configuration:

  const corsOptions = {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)
      if (origin === 'https://sherrytravels-webapp.vercel.app') return cb(null, true)
      return cb(new Error('CORS blocked'))
    },
    methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
    allowedHeaders: ['Content-Type','Authorization','Accept'],
    credentials: true,
  }
  app.use(cors(corsOptions))

5) Cleanup notes

- The codebase uses `import.meta.env.VITE_API_BASE_URL` (Vite) and a centralized axios instance in `src/lib/api.ts`. Env vars are baked at build time; changing the Vercel env and redeploying is required.
- Remove any runtime fallbacks/diagnostics before final production (they are useful for debugging but not recommended long-term).

If you want, I can add this short checklist to the top-level README instead or include a CI step that validates the env is present during build.
