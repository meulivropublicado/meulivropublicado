# AGENTS.md

## Architecture rules

- Contact form submissions are stored server-side: `src/lib/contact.functions.ts` defines `submitContact` (createServerFn) which validates with zod, rate-limits in memory (5 per IP per 10 min), and inserts into `public.contact_submissions` via `supabaseAdmin` loaded inside the handler. Why: the form must never lose a submission, and the admin client must not ship to the client bundle.
- `public.contact_submissions` has RLS with an anon insert-only policy; never add anon SELECT/UPDATE/DELETE policies. Why: submissions are private to the owner.
