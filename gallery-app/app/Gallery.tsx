"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryImage } from "@/lib/s3";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { DotPattern } from "@/components/magicui/dot-pattern";

interface GalleryProps {
  images: GalleryImage[];
  error: string | null;
  maxMb: number;
}

interface Message {
  kind: "ok" | "error";
  text: string;
}

function BrandMark({ className = "" }: { className?: string }) {
  const gradientId = `pv${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" />
          <stop offset="0.55" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent-3)" />
        </linearGradient>
      </defs>
      <path
        d="M10 27V5h7a7 7 0 0 1 0 14h-7"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="22.5" y="22.5" width="6" height="6" rx="1.8" fill={`url(#${gradientId})`} />
    </svg>
  );
}

function UploadCloudIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17.2 9.2 4.4 4.4 0 0 1 17 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M12 12v7m0-7-2.5 2.5M12 12l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10V7.5a3.5 3.5 0 1 1 7 0V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" />
    </svg>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13 3 5 14h5l-1 7 8-11h-5l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17.2 9.2 4.4 4.4 0 0 1 17 18H7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="m8.5 12 2.4 2.4L15.7 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16.3" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const features = [
  {
    icon: LockIcon,
    title: "Private by default",
    body: "Your bucket stays locked down. Nothing is public unless you decide it is.",
  },
  {
    icon: BoltIcon,
    title: "Signed links only",
    body: "Every image is served through short-lived presigned URLs, so copies expire.",
  },
  {
    icon: CloudIcon,
    title: "Built on AWS",
    body: "Next.js on EC2 with S3 storage — the same stack real teams ship on.",
  },
];

export default function Gallery({ images, error, maxMb }: GalleryProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const viewerRef = useRef<HTMLDialogElement>(null);

  const [busy, setBusy] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (selected && viewer && !viewer.open) viewer.showModal();
  }, [selected]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileRef.current?.files?.[0];

    if (!file) {
      setMessage({ kind: "error", text: "Choose an image first, then select Upload image." });
      return;
    }
    if (file.size > maxMb * 1024 * 1024) {
      setMessage({
        kind: "error",
        text: `That image is larger than ${maxMb} MB. Choose a smaller one.`,
      });
      return;
    }

    const body = new FormData();
    body.append("image", file);

    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as { error?: string; name?: string };
      if (!response.ok) {
        setMessage({ kind: "error", text: data.error || "The upload did not work. Try again." });
      } else {
        setMessage({ kind: "ok", text: `Uploaded ${data.name}.` });
        formRef.current?.reset();
        setFileName(null);
        router.refresh();
      }
    } catch {
      setMessage({
        kind: "error",
        text: "The app could not be reached. Check that it is still running.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(image: GalleryImage) {
    const yes = window.confirm(`Delete "${image.name}" from your bucket? This cannot be undone.`);
    if (!yes) return;

    setDeletingKey(image.key);
    setMessage(null);
    try {
      const response = await fetch(`/api/delete?key=${encodeURIComponent(image.key)}`, {
        method: "DELETE",
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setMessage({ kind: "error", text: data.error || "The image could not be deleted. Try again." });
      } else {
        setMessage({ kind: "ok", text: `Deleted ${image.name}.` });
        if (selected?.key === image.key) viewerRef.current?.close();
        router.refresh();
      }
    } catch {
      setMessage({
        kind: "error",
        text: "The app could not be reached. Check that it is still running.",
      });
    } finally {
      setDeletingKey(null);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && fileRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileRef.current.files = transfer.files;
      setFileName(file.name);
    }
  }

  let countText = `${images.length} images in your bucket`;
  if (error) countText = "Could not load your images.";
  else if (images.length === 1) countText = "1 image in your bucket";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--glass)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <BrandMark className="h-8 w-8 drop-shadow-[0_6px_12px_rgba(109,40,217,0.35)]" />
            <span className="text-[15px] font-semibold tracking-tight">
              Pixel<span className="text-[var(--accent)]">Vault</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--muted)] md:flex">
            <a className="relative transition hover:text-[var(--ink)] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent-2)] after:transition-all after:duration-200 hover:after:w-full" href="#gallery">
              Gallery
            </a>
            <a className="relative transition hover:text-[var(--ink)] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent-2)] after:transition-all after:duration-200 hover:after:w-full" href="#upload">
              Upload
            </a>
            <a className="relative transition hover:text-[var(--ink)] after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent-2)] after:transition-all after:duration-200 hover:after:w-full" href="#about">
              Why it works
            </a>
          </nav>

          <a
            href="#upload"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(219,39,119,0.65)] hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
          >
            Get started
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden">
          <DotPattern className="fill-[var(--line)] [mask-image:radial-gradient(480px_circle_at_50%_0%,white,transparent)]" />
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent-2), transparent 70%)" }}
          />
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24">
            <span className="font-pixel-soft inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--muted)] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Private S3 gallery · live on EC2
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Your images,
              <br />
              <AnimatedGradientText>beautifully organized.</AnimatedGradientText>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Drop in a photo, get a signed link, and share it anywhere. No public buckets, no
              clutter — just a fast gallery that runs on AWS.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#upload"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-14px_rgba(219,39,119,0.7)] hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
              >
                <UploadCloudIcon className="h-4.5 w-4.5" />
                Upload an image
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:shadow-sm active:translate-y-0 active:scale-[0.98]"
              >
                Browse gallery
              </a>
            </div>

            <dl className="mt-12 grid w-full max-w-lg grid-cols-3 divide-x divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-4 shadow-sm">
              <div className="flex flex-col items-center gap-1 px-2">
                <dt className="font-pixel text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">Images</dt>
                <dd className="text-xl font-semibold tabular-nums">{images.length}</dd>
              </div>
              <div className="flex flex-col items-center gap-1 px-2">
                <dt className="font-pixel text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">Bucket</dt>
                <dd className="flex items-center gap-1.5 text-xl font-semibold">
                  <LockIcon className="h-4 w-4 text-[var(--accent)]" />
                  Private
                </dd>
              </div>
              <div className="flex flex-col items-center gap-1 px-2">
                <dt className="font-pixel text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">Max size</dt>
                <dd className="text-xl font-semibold tabular-nums">{maxMb} MB</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="upload" className="mx-auto w-full max-w-3xl scroll-mt-24 px-5 pb-6 sm:px-8">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-[0_20px_60px_-30px_rgba(11,122,117,0.45)]"
          >
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-12 text-center transition-all duration-300 ${
                dragging
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-[var(--bg)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:shadow-[0_18px_40px_-28px_rgba(109,40,217,0.6)]"
              }`}
            >
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent-soft)] ring-1 ring-[var(--line)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-[0_14px_30px_-10px_rgba(219,39,119,0.45)] group-active:scale-100">
                <BrandMark className="h-8 w-8" />
                <span className="absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full bg-[var(--surface)] text-[var(--accent)] shadow-sm ring-1 ring-[var(--line)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M12 19V5m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
              <span className="text-sm font-semibold">
                {fileName ? fileName : "Drop an image here, or click to browse"}
              </span>
              <span className="text-xs text-[var(--muted)]">
                JPG or PNG · up to {maxMb} MB · stored privately in S3
              </span>
              <input
                ref={fileRef}
                type="file"
                name="image"
                accept="image/jpeg,image/png"
                aria-label="Choose an image"
                className="sr-only"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
              />
            </label>

            <div className="flex flex-col-reverse items-center justify-between gap-3 px-3 py-3 sm:flex-row">
              <p className="text-xs text-[var(--muted)]">
                Only you can see this bucket. Links are signed and expire.
              </p>
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(219,39,119,0.65)] hover:brightness-110 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md sm:w-auto"
              >
                {busy ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="h-4 w-4" />
                    Upload image
                  </>
                )}
              </button>
            </div>
          </form>

          {message && (
            <div
              role="status"
              className={`mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
                message.kind === "ok"
                  ? "border-transparent bg-[var(--ok-bg)] text-[var(--ok)]"
                  : "border-transparent bg-[var(--danger-bg)] text-[var(--danger)]"
              }`}
            >
              {message.kind === "ok" ? (
                <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0" />
              ) : (
                <AlertIcon className="mt-0.5 h-4.5 w-4.5 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-transparent bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger)]"
            >
              <AlertIcon className="mt-0.5 h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </section>

        <section id="gallery" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-14 sm:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-pixel text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                Library
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Recent uploads
              </h2>
            </div>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              {countText}
            </span>
          </div>

          {images.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <li key={image.key}>
                  <BlurFade delay={0.04 * Math.min(index, 12)} inView>
                    <MagicCard className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_-30px_rgba(109,40,217,0.6)]">
                      <button
                        className="block w-full text-left"
                        type="button"
                        onClick={() => setSelected(image)}
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--bg)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.url}
                            alt={image.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
                          <span className="absolute bottom-3 left-3 right-3 translate-y-1 truncate text-sm font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                            {image.name}
                          </span>
                        </span>
                      </button>
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setSelected(image)}
                          className="min-w-0 flex-1 text-left"
                        >
                          <span className="block truncate text-sm font-medium">{image.name}</span>
                        </button>
                        <span className="font-pixel inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[9px] font-medium text-[var(--accent)]">
                          <LockIcon className="h-3 w-3" />
                          Signed
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(image)}
                        disabled={deletingKey === image.key}
                        aria-label={`Delete ${image.name}`}
                        title="Delete image"
                        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/50 text-white opacity-100 backdrop-blur transition-all duration-200 hover:border-transparent hover:bg-[var(--danger)] focus-visible:opacity-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        {deletingKey === image.key ? (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                      </button>
                    </MagicCard>
                  </BlurFade>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent-soft)] ring-1 ring-[var(--line)]">
                <BrandMark className="h-8 w-8" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">No images yet</h3>
              <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
                Upload your first image and it will show up here with a private, signed link.
              </p>
              <a
                href="#upload"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(219,39,119,0.65)] hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
              >
                Upload an image
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </section>

        <section id="about" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-20 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_40px_-24px_rgba(109,40,217,0.55)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-[var(--muted)] sm:flex-row sm:px-8">
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-6 w-6 drop-shadow-[0_4px_10px_rgba(109,40,217,0.3)]" />
            <span className="font-medium text-[var(--ink)]">PixelVault</span>
            <span className="hidden sm:inline">· AWS for Beginners</span>
          </div>
          <p className="font-pixel-soft text-[13px]">Next.js · S3 · EC2</p>
        </div>
      </footer>

      <dialog
        ref={viewerRef}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === viewerRef.current) viewerRef.current.close();
        }}
      >
        {selected && (
          <div className="w-[min(92vw,64rem)] rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between gap-3 px-1">
              <span className="truncate text-sm font-medium">{selected.name}</span>
              <button
                type="button"
                onClick={() => viewerRef.current?.close()}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] shadow-sm backdrop-blur transition-all duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] active:scale-95"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selected.url}
              alt={selected.name}
              className="mx-auto max-h-[70vh] w-auto rounded-xl object-contain"
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
