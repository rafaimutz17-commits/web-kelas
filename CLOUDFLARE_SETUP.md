# Cloudflare setup (free-tier)

The public site continues to work without an account. Admin sign-in, saved edits, and image uploads become persistent after the Cloudflare resources below are connected.

## Create the free resources

1. Install Node.js LTS and run `npm install`.
2. Sign in to Cloudflare: `npx wrangler login`.
3. Create the D1 database: `npx wrangler d1 create web-kelas-content`. Copy the UUID returned by Wrangler into `d1_databases[0].database_id` in `wrangler.jsonc`.
4. Create the R2 bucket: `npx wrangler r2 bucket create web-kelas-images`.
5. Apply the database tables locally for development: `npx wrangler d1 migrations apply web-kelas-content --local`.
6. Make a local-only `.dev.vars` file (already ignored by Git) containing:

   ```dotenv
   ADMIN_PASSWORD=your-temporary-test-password
   SESSION_SECRET=replace-with-a-long-random-secret
   ```

   Generate a strong session secret with `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`. Keep the chosen admin password server-side; do not add it to React code, `.dev.vars.example`, or Git.
7. Run `npm run dev`. This starts both Vite and the API/storage Worker; keep this terminal open while signing in or using the admin panel. Open the Vite URL; `/api` and `/media` are proxied to the Worker. The admin login uses one shared password from `.dev.vars`, so multiple admins can sign in with it; this is not a separate account per person. To run either service separately, use `npm run dev:vite` and `npm run dev:worker` in separate terminals. To test the local D1 database, run `npx wrangler d1 migrations apply web-kelas-content --local` after creating it.

## Publish the site

1. Run `npx wrangler d1 create web-kelas-content` and `npx wrangler r2 bucket create web-kelas-images` once per Cloudflare account. Use the real D1 UUID in `wrangler.jsonc`; the checked-in UUID is only a local placeholder.
2. Apply schema remotely: `npx wrangler d1 migrations apply web-kelas-content --remote`.
3. Set server-side secrets interactively (the values are prompted for and must not be committed):

   ```powershell
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put SESSION_SECRET
   ```

4. Publish: `npm run deploy`.
5. Open `/login`. Visitors can continue without an account; all admins use the same server-configured password. Use `/admin` to edit the introduction, class/teacher details, student profiles, featured works, and lesson schedule. Save to publish changes. Images are stored in the private R2 bucket and served through the Worker.

## Free tier and backups

The free tiers have usage limits and terms can change; they are not a lifetime availability guarantee. Cloudflare currently lists D1 at 5 GB total storage, Workers at 100,000 requests per day, and R2 at 10 GB-month standard storage with free internet egress. If usage exceeds a free limit, data remains subject to account limits and current Cloudflare terms. Export database data regularly (`npx wrangler d1 export web-kelas-content --remote --output backup.sql`) and keep a separate copy of important images.

The temporary password is intentionally configured as a server secret, never included in the frontend bundle. Replace it with a unique strong password before using the site publicly. Admin sessions expire after 12 hours, and failed sign-in attempts are limited per network address.
