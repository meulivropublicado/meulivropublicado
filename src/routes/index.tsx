import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  PenLine,
  Layout,
  Palette,
  Printer,
  Megaphone,
  Plus,
  Minus,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Quote,
  ArrowRight,
} from "lucide-react";
import heroBooks from "@/assets/hero-books.jpg";
import portfolioImg from "@/assets/portfolio-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu Livro Publicado — Publicação independente para autores" },
      { name: "description", content: "Da ideia ao livro nas tuas mãos. Revisão, design, capa, impressão e marketing — com mais de 20 anos de experiência editorial." },
      { property: "og:title", content: "Meu Livro Publicado" },
      { property: "og:description", content: "Da ideia ao livro nas tuas mãos — sem complicações." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const GREEN = "#08523a";
const ORANGE = "#d86014";
const CREAM = "#f8f8f6";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".mlp-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.floor(eased * end));
              if (p < 1) requestAnimationFrame(tick);
              else setVal(end);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {prefix}
      {end === 200000 ? "200 mil" : val.toLocaleString("pt-PT")}
      {suffix}
    </span>
  );
}

const services = [
  { icon: PenLine, title: "Revisão ortográfica e gramatical", desc: "Revisão linguística, sintática e de estilo no padrão editorial, realizada por profissionais qualificados, garantindo um texto limpo e fluente." },
  { icon: Layout, title: "Design editorial e paginação", desc: "Projeto gráfico profissional para livro físico e ebook, com composição que respeita a leitura. Registos de ISBN e catalogação da obra." },
  { icon: Palette, title: "Design de capa", desc: "Conceito visual original que traduz a identidade da obra e capta o leitor à primeira vista." },
  { icon: Printer, title: "Impressão e entrega", desc: "Preparação de todos os ficheiros de acordo com os padrões gráficos ou digitais para garantir alta qualidade e valorização do teu livro." },
  { icon: Megaphone, title: "Marketing digital e redes sociais", desc: "Estratégias de conteúdo, gestão das redes sociais e campanhas para autores que desejam alcançar mais leitores." },
  { icon: BookOpen, title: "Consultoria personalizada", desc: "Dedicação total em cada etapa da produção do livro, do primeiro contacto à entrega do exemplar impresso." },
];

const stats = [
  { value: 400, prefix: "+", label: "Autores acompanhados" },
  { value: 700, prefix: "+", label: "Obras publicadas" },
  { value: 200000, prefix: "+", label: "Livros impressos" },
  { value: 20, prefix: "+", label: "Anos de experiência" },
];

const testimonials = [
  { name: "Gerson dos Santos.", city: "Livro técnico", text: "Ao longo de alguns anos o Sérgio tem publicado todos os meus livros com muita dedicação e profissionalismo. Estou extremamente grato e satisfeito." },
  { name: "Marina Alves", city: "Poesia", text: "Quando entreguei os meus poemas ao Sergio, eu não sabia como seria ver minha alma impressa em papel. O livro ficou lindo, é meu, é nosso. Foi a melhor decisão confiar nele." },
  { name: "Aldo Nora.", city: "Contos e Poesias", text: "Já publiquei dois livros com o Sérgio. A maior vitória foi ver minha família orgulhosa. Sempre ouviram minhas histórias, mas agora elas estão registradas em formato de livros." },
];

const steps = [
  "Levantamento dos requisitos e proposta personalizada.",
  "Revisão completa por um profissional qualificado.",
  "Projeto gráfico, paginação, capas e todos os registos.",
  "Aprovação do autor antes de avançarmos para a impressão.",
  "Impressão e envio dos exemplares na morada. Missão cumprida.",
];

const faqs = [
  { q: "Quanto tempo demora o processo?", a: "Em média, entre 10 e 20 semanas, dependendo da extensão do manuscrito e dos serviços contratados." },
  { q: "Preciso de ter o texto finalizado para pedir orçamento?", a: "Não. Podemos analisar mesmo um manuscrito ainda em rascunho e indicar o melhor caminho." },
  { q: "Fazem distribuição em livrarias?", a: "Trabalhamos sobretudo o modelo de autopublicação, mas aconselhamos sobre canais de venda online e em livrarias parceiras." },
  { q: "Qual é o número mínimo de exemplares para impressão?", a: "Trabalhamos a partir de 50 exemplares, com escalas otimizadas para cada tiragem." },
  { q: "Trabalham com autores fora de Portugal?", a: "Sim. Acompanhamos autores lusófonos em qualquer parte do mundo, com entrega internacional." },
];

const portfolioFilters = ["Ficção", "Não-ficção", "Poesia", "Técnico", "Infantil"];

const portfolioItems = Array.from({ length: 8 }).map((_, i) => ({
  title: ["Voz Adentro", "O Caminho das Águas", "Manual do Cuidador", "Pequenos Versos", "Histórias do Tejo", "Guia da Floresta", "Onde Mora o Tempo", "Cartas a Lisboa"][i],
  author: ["Ana Mendes", "Pedro Lima", "Dra. Rita Faria", "João Costa", "Marta Sousa", "Luís Barreto", "Helena Pires", "Carlos Tavares"][i],
  category: portfolioFilters[i % portfolioFilters.length],
}));

function Index() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>("Todos");
  const filters = ["Todos", ...portfolioFilters];
  const visible = filter === "Todos" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-white" style={{ color: "#2a2a2a" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-[color:var(--brand-green-soft)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-semibold" style={{ color: GREEN }}>
            Meu Livro Publicado
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: GREEN }}>
            <a href="#sobre" className="hover:opacity-70">Sobre</a>
            <a href="#servicos" className="hover:opacity-70">Serviços</a>
            <a href="#portfolio" className="hover:opacity-70">Portfolio</a>
            <a href="#processo" className="hover:opacity-70">Processo</a>
            <a href="#faq" className="hover:opacity-70">PERGUNTAS FREQUENTES</a>
            <a href="#contacto" className="hover:opacity-70">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="hidden rounded-full px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 md:inline-block"
            style={{ backgroundColor: ORANGE }}
          >
            Publicar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, " + GREEN + " 0 1px, transparent 1px 80px)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="mlp-reveal">
            <p className="mb-5 inline-block border-l-2 pl-3 text-sm uppercase tracking-[0.2em]" style={{ borderColor: ORANGE, color: GREEN }}>
              PUBLICAÇÃO INDEPENDENTE
            </p>
            <h1 className="font-display text-5xl leading-[1.05] md:text-6xl" style={{ color: GREEN }}>
              O teu manuscrito merece <em className="not-italic" style={{ color: ORANGE }}>virar livro.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg" style={{ color: "#3d3d3d" }}>
              Do manuscrito ao livro impresso, transformamos o seu sonho em realidade com revisão detalhada, design personalizado e capa profissional.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:opacity-95"
                style={{ backgroundColor: ORANGE }}
              >
                Quero publicar o meu livro
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#servicos" className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: GREEN }}>
                Ver serviços
              </a>
            </div>
          </div>
          <div className="mlp-reveal relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-sm border" style={{ borderColor: GREEN }} />
            <img
              src={heroBooks}
              alt="Livro aberto sobre fundo de papel"
              width={1280}
              height={960}
              className="relative w-full rounded-sm object-cover"
            />
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
          <div className="mlp-reveal md:col-span-5">
            <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>PUBLICAÇÃO INDEPENDENTE</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
              Profissionais ao lado de quem escreve.
            </h2>
          </div>
          <div className="mlp-reveal md:col-span-7">
            <p className="text-lg leading-relaxed whitespace-pre-line" style={{ color: "#3d3d3d" }}>
              O <strong style={{ color: GREEN }}>Meu Livro Publicado</strong> é um projeto idealizado por Sérgio Santos, profissional com mais de 20 anos de experiência no setor editorial, dedicado a ajudar autores independentes a concretizarem o sonho de publicar as suas obras.{"\n"}
              Acreditamos que uma boa história não deve ficar na gaveta por falta de oportunidades. Por isso, oferecemos um serviço completo e personalizado, trabalhando lado a lado com cada autor para transformar ideias em livros de qualidade profissional, respeitando a sua identidade e garantindo um resultado à altura do seu talento.
            </p>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mlp-reveal mb-14 max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>Serviços</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
              Tudo o que o teu livro precisa, num só lugar.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="mlp-reveal group relative flex flex-col rounded-sm border bg-white p-8 transition hover:translate-y-[-2px]"
                style={{ borderColor: "#e5e5e0" }}
              >
                <span
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: ORANGE }}
                />
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm border"
                  style={{ borderColor: GREEN, color: GREEN }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-display text-xl" style={{ color: GREEN }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-center gap-6">
            <span className="h-px w-16" style={{ backgroundColor: GREEN, opacity: 0.4 }} />
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: GREEN }}>EXPERIÊNCIA TRADUZIDA EM NÚMEROS</p>
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="mlp-reveal">
                <div className="font-display text-5xl md:text-6xl" style={{ color: ORANGE }}>
                  <Counter end={s.value} prefix={s.prefix ?? ""} suffix={(s as any).suffix ?? ""} />
                </div>
                <p className="mt-3 text-sm font-medium" style={{ color: GREEN }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mlp-reveal mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>Portfolio</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
                Obras que ajudamos a nascer.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="rounded-full border px-4 py-2 text-xs font-medium transition"
                    style={{
                      borderColor: active ? ORANGE : GREEN,
                      backgroundColor: active ? ORANGE : "transparent",
                      color: active ? "#fff" : GREEN,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {visible.map((p) => (
              <figure key={p.title} className="mlp-reveal group">
                <div className="overflow-hidden rounded-sm bg-[color:var(--brand-cream)]">
                  <img
                    src={portfolioImg}
                    alt={p.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-sm" style={{ color: GREEN }}>{p.title}</p>
                  <p className="text-xs" style={{ color: "#888" }}>{p.author}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mlp-reveal mb-14 max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>Testemunhos</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
              Quem publicou connosco.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="mlp-reveal relative rounded-sm bg-white p-8 shadow-[0_4px_24px_rgba(8,82,58,0.06)]"
              >
                <Quote className="absolute -top-3 left-6 h-8 w-8" style={{ color: ORANGE }} fill="currentColor" />
                <p className="mt-2 leading-relaxed" style={{ color: "#3d3d3d" }}>"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    {t.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: GREEN }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#888" }}>{t.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mlp-reveal mb-14 max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>Processo</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
              Cinco passos, um livro.
            </h2>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-6 hidden h-px md:block"
              style={{ backgroundColor: GREEN, opacity: 0.2 }}
            />
            <ol className="grid gap-10 md:grid-cols-5">
              {steps.map((s, i) => (
                <li key={s} className="mlp-reveal relative">
                  <div
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-display text-base text-white"
                    style={{ backgroundColor: ORANGE }}
                  >
                    {i + 1}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed" style={{ color: GREEN }}>{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-3xl px-6">
          <div className="mlp-reveal mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.25em]" style={{ color: ORANGE }}>PERGUNTAS FREQUENTES</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
              Tens dúvidas? Temos respostas.
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#e5e5e0" }}>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="mlp-reveal border-t" style={{ borderColor: "#e5e5e0" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-lg" style={{ color: GREEN }}>{f.q}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ color: ORANGE, border: `1px solid ${ORANGE}` }}
                    >
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div
                    className="grid overflow-hidden transition-all duration-300"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p className="pb-6 pr-12 leading-relaxed" style={{ color: "#4a4a4a" }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t" style={{ borderColor: "#e5e5e0" }} />
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="mlp-reveal rounded-sm border bg-white p-10 md:p-16"
            style={{ borderColor: GREEN, backgroundColor: "var(--brand-green-soft)" }}
          >
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl leading-tight md:text-5xl" style={{ color: GREEN }}>
                  O teu livro está à espera de existir.
                </h2>
                <p className="mt-5 max-w-sm leading-relaxed" style={{ color: "#3d3d3d" }}>
                  Conta-nos a tua ideia. Respondemos a cada mensagem com uma análise personalizada e sem compromisso.
                </p>
                <a
                  href="https://wa.me/351000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-medium transition hover:bg-white"
                  style={{ borderColor: ORANGE, color: ORANGE }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Obrigado! Entraremos em contacto em breve.");
                }}
                className="space-y-4"
              >
                {[
                  { name: "nome", placeholder: "Nome", type: "text" },
                  { name: "email", placeholder: "Email", type: "email" },
                  { name: "telefone", placeholder: "Telefone", type: "tel" },
                ].map((f) => (
                  <input
                    key={f.name}
                    required
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-green)]"
                    style={{ borderColor: "#d8d8d2", color: GREEN }}
                  />
                ))}
                <textarea
                  required
                  name="mensagem"
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full rounded-sm border bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-green)]"
                  style={{ borderColor: "#d8d8d2", color: GREEN }}
                />
                <button
                  type="submit"
                  className="w-full rounded-full py-4 text-sm font-medium text-white transition hover:opacity-95"
                  style={{ backgroundColor: ORANGE }}
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-14" style={{ borderTop: "1px solid #e5e5e0" }}>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg" style={{ color: GREEN }}>Meu Livro Publicado</p>
            <p className="mt-1 text-xs" style={{ color: "#666" }}>
              © {new Date().getFullYear()} Meu Livro Publicado. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4" style={{ color: GREEN }}>
            <a href="#" aria-label="Instagram" className="hover:opacity-70"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:opacity-70"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
