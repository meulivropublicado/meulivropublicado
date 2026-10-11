import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/start-server-core";
import { z } from "zod";

const submissionSchema = z.object({
  name: z.string().trim().min(2, "Indica o teu nome.").max(120),
  email: z.string().trim().email("Indica um email válido.").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(5, "Escreve a tua mensagem.").max(5000),
});

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const ip = getRequestIP({ xForwardedFor: true }) || "unknown";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
      return { ok: false as const, error: "too_many" as const };
    }
    recent.push(now);
    hits.set(ip, recent);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      });

    if (error) {
      console.error("Contact submission failed:", error.message);
      return { ok: false as const, error: "server" as const };
    }

    return { ok: true as const };
  });
