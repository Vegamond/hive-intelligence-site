"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { about, business, cases, contacts, faq, prices, process, services } from "@/content/site";
import { CaseArt, ServiceArt } from "./Icons";
import { ButtonLink, Cut, Divider, Eyebrow, H2, HexBullet, HudCorners, Logo, Reveal, Section } from "./ui";

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <Eyebrow index="01">Послуги</Eyebrow>
        <H2 className="mb-12 max-w-[46rem]">Чотири напрямки — одна людина, яка відповідає за результат</H2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <Cut>
            <article className="flex h-full flex-col">
              <div className="flex aspect-[16/9] items-center justify-center border-b border-line bg-ink-2">
                <ServiceArt icon={s.icon} />
              </div>
              <div className="flex flex-col gap-3 px-6 pb-8 pt-6">
                <span className="font-display text-[13px] text-gold">{s.n}</span>
                <h3 className="text-xl font-bold text-head">{s.title}</h3>
                <ul className="flex flex-col gap-1.5 text-muted">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <HexBullet />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            </Cut>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Business() {
  return (
    <Section id="business" alt className="flex flex-col gap-14">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow index="02">{business.eyebrow}</Eyebrow>
          <H2>{business.title}</H2>
          <p className="max-w-[34rem] text-muted">{business.lead}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Cut gold innerClassName="relative flex flex-col gap-4 p-7 sm:p-8">
            <span className="font-display text-[11px] uppercase tracking-[0.24em] text-gold">Старт співпраці</span>
            <span className="text-2xl font-extrabold text-head">{business.audit.title}</span>
            <ul className="flex flex-col gap-1.5 text-muted">
              {business.audit.items.map((it) => (
                <li key={it} className="flex gap-2.5">
                  <HexBullet />
                  {it}
                </li>
              ))}
            </ul>
            <span>{business.audit.note}</span>
            <ButtonLink href={contacts.telegramHref} className="self-start">
              Записатися на аудит
            </ButtonLink>
          </Cut>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {business.plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <Cut gold={p.featured} className="transition-transform duration-300 hover:-translate-y-1" innerClassName={`flex flex-col gap-4 p-7 ${p.featured ? "bg-[#16150F]!" : "bg-card-2!"}`}>
              {p.featured && (
                <span className="btn-cut self-start bg-gold px-3 py-0.5 text-xs font-bold tracking-wider text-ink [--c:6px]">ДЛЯ ЗАКЛАДІВ</span>
              )}
              <h3 className="text-xl font-bold text-head">{p.name}</h3>
              <span className="-mt-2 text-[0.95rem] text-dim">{p.for}</span>
              <span className="text-[2rem] font-extrabold leading-tight text-gold-hi">
                {p.price} <span className="text-base font-semibold text-muted">{p.unit}</span>
              </span>
              <ul className="flex flex-col gap-1.5 text-muted">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <HexBullet />
                    {it}
                  </li>
                ))}
              </ul>
            </Cut>
          </Reveal>
        ))}
      </div>
      <p className="-mt-6 text-[0.95rem] text-dim">{business.footnote}</p>
    </Section>
  );
}

export function Cases() {
  return (
    <Section id="cases">
      <Reveal>
        <Eyebrow index="03">Кейси</Eyebrow>
        <H2 className="mb-12">Що вже працює</H2>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <Cut>
            <article className="flex h-full flex-col">
              <div className="flex aspect-[2/1] items-center justify-center border-b border-line bg-ink-2">
                <CaseArt kind={c.diagram} />
              </div>
              <div className="flex flex-col gap-3 px-6 pb-8 pt-7">
                <span className="text-sm text-dim">{c.tag}</span>
                <h3 className="text-xl font-bold text-head">{c.title}</h3>
                <p className="text-muted">{c.text}</p>
              </div>
            </article>
            </Cut>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Prices() {
  return (
    <Section id="prices" alt>
      <Reveal>
        <Eyebrow index="04">Ціни</Eyebrow>
        <H2 className="mb-3">Прозорі ціни «від»</H2>
        <p className="mb-10 text-muted">Точну вартість називаю після діагностики — до початку робіт. Запчастини оплачуються окремо.</p>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {prices.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.1}>
            <Cut innerClassName="bg-ink!">
              <table className="w-full border-collapse text-left">
                <caption className="border-b border-line-2 px-5 py-4 text-left font-bold text-head">{t.title}</caption>
                <tbody>
                  {t.rows.map(([name, price], r) => (
                    <tr key={name} className={r < t.rows.length - 1 ? "border-b border-[#1E1C17]" : ""}>
                      <td className="px-5 py-3.5 align-top">{name}</td>
                      <td className="px-5 py-3.5 text-right align-top text-gold-hi sm:whitespace-nowrap">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Cut>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Process() {
  return (
    <Section>
      <Reveal>
        <Eyebrow index="05">Як я працюю</Eyebrow>
        <H2 className="mb-12">Без сюрпризів у рахунку</H2>
      </Reveal>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <li className="relative flex flex-col gap-2.5 pt-5">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              />
              <span className="font-display text-[13px] text-gold">{String(i + 1).padStart(2, "0")}</span>
              <strong className="text-lg text-head">{s.title}</strong>
              <span className="text-muted">{s.text}</span>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" alt className="grid items-center gap-12 md:grid-cols-[minmax(0,420px)_1fr]">
      <Reveal>
        <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[420px] flex-col items-center justify-center gap-3 border border-line-2 bg-card-2 p-6 text-center text-[0.95rem] text-dim">
          {about.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={about.photo} alt={about.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <Logo className="h-24 w-20 opacity-40" label="" />
              <span>Місце для вашого фото за роботою</span>
            </>
          )}
          <div className="pointer-events-none absolute -inset-3"><HudCorners size={24} /></div>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="flex flex-col gap-5">
        <Eyebrow index="06">Про мене</Eyebrow>
        <H2>{about.title}</H2>
        <p className="max-w-[36rem] text-muted">{about.text}</p>
        <ul className="flex flex-col gap-2.5">
          {about.points.map((p) => (
            <li key={p} className="flex gap-3">
              <HexBullet />
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative">
      <Divider />
      <div className="mx-auto max-w-[860px] px-5 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <Eyebrow index="07">Питання</Eyebrow>
          <H2 className="mb-10">Часті питання</H2>
        </Reveal>
        <div className="border-t border-line">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-lg font-bold text-head"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <motion.span aria-hidden="true" className="text-2xl font-normal text-gold" animate={{ rotate: isOpen ? 45 : 0 }}>
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contacts() {
  return (
    <Section id="contacts" alt className="grid items-center gap-12 md:grid-cols-2">
      <Reveal className="flex flex-col gap-5">
        <Eyebrow index="08">Контакти</Eyebrow>
        <H2>Опишіть проблему — відповім і назву ціну</H2>
        <div className="flex flex-col gap-1.5 text-lg">
          <a href={contacts.phoneHref} className="text-[1.7rem] font-bold text-head no-underline hover:text-gold-hi">
            {contacts.phone}
          </a>
          <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="text-gold-hi underline-offset-4 hover:underline">
            Telegram: {contacts.telegram}
          </a>
          <span className="text-muted">{contacts.city} · виїзд по місту</span>
          <span className="text-muted">{contacts.hours.join(" · ")}</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contacts.telegramHref}>Написати в Telegram</ButtonLink>
          <ButtonLink href={contacts.phoneHref} variant="ghost">
            Подзвонити
          </ButtonLink>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="hidden justify-center md:flex">
        <div className="relative p-5">
          <HudCorners size={24} />
          <div className="bg-white p-3.5">
            <QRCodeSVG value={contacts.telegramHref} size={180} bgColor="#FFFFFF" fgColor="#0A0A0B" level="M" title={`QR-код: Telegram ${contacts.telegram}`} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="pb-24 lg:pb-0">
      <Divider />
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-dim sm:px-6">
        <span className="flex items-center gap-3">
          <Logo className="h-6 w-5" label="" />© {new Date().getFullYear()} Hive Intelligence · {contacts.legal}
        </span>
        <span>{contacts.city}, Україна</span>
      </div>
    </footer>
  );
}

// Фіксована панель дій на мобільних — дзвінок і Telegram завжди під пальцем
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-ink/95 backdrop-blur-md lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={contacts.phoneHref} className="flex min-h-14 items-center justify-center font-semibold text-head">
        Подзвонити
      </a>
      <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center bg-gold font-bold text-ink">
        Telegram
      </a>
    </div>
  );
}
