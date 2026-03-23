"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminPagesHeader from "../_components/AdminPagesHeader";
import { ImageIcon, Save, Users, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

// ── Default values (shown when no Convex data exists yet) ────────────────

const DEFAULTS = {
  hero: {
    title: "Empowering The Future",
    subtitle:
      "Transforming lives through sustainable programs, skill development, and talent discovery for youth and handicapped women in underserved communities.",
    stats: [
      { value: "500+", label: "Youth Empowered" },
      { value: "200+", label: "Women Trained" },
      { value: "100+", label: "Talents Found" },
    ],
  },
  about_hero: {
    title: "Building a Better Future",
    subtitle:
      "For over 5 years, OKARANIME HERITAGE FOUNDATION has been at the forefront of empowering underserved communities through sustainable programs, skill development, and talent discovery.",
  },
  our_story: {
    para1:
      "Founded in 2020, OKARANIME HERITAGE FOUNDATION emerged from a deep commitment to preserving cultural heritage while driving meaningful social change in underserved communities.",
    para2:
      'Our name "OKARANIME" honors our shared heritage of resilience, community, and the belief that every individual, regardless of their circumstances, deserves the opportunity to thrive.',
    founded: "2020",
    location: "Nigeria",
    communities: "50+",
    programs: "12+",
  },
  our_journey: {
    title: "Our Journey",
    subtitle: "From humble beginnings to impacting thousands of lives",
  },
  our_purpose: {
    title: "Our Purpose",
    subtitle: "Driving meaningful change through clear vision and dedicated action",
  },
  mission: {
    text: "To empower youth (both girls and boys) through sustainable programs, uplift handicapped women via skill acquisition and business building, and discover talents among the less privileged to create lasting community impact.",
    bullets: [
      "Youth empowerment through vocational training",
      "Women's economic independence",
      "Talent discovery and development",
      "Sustainable community impact",
    ],
  },
  vision: {
    text: "A world where every less privileged individual, regardless of gender, ability, or background, has access to opportunities that foster self-sufficiency, innovation, and cultural pride.",
    bullets: [
      "Universal access to opportunities",
      "Self-sufficiency for all",
      "Innovation and creativity",
      "Cultural pride and heritage",
    ],
  },
  values: [
    {
      title: "Inclusivity",
      description:
        "Welcoming all, especially the marginalized, regardless of background, ability, or circumstance.",
    },
    {
      title: "Transparency",
      description:
        "Accountable to donors, partners, and beneficiaries with clear reporting and open communication.",
    },
    {
      title: "Innovation",
      description:
        "Creative approaches to talent discovery and empowerment, adapting to community needs.",
    },
    {
      title: "Sustainability",
      description:
        "Programs designed for long-term impact, creating self-reliant individuals and communities.",
    },
  ],
  achievements: {
    title: "Our Impact",
    subtitle:
      "Over the past 5 years, we've achieved significant milestones in our mission to empower underserved communities through targeted programs and sustainable initiatives.",
    stats: [
      { number: "1,000+", label: "Beneficiaries Reached" },
      { number: "20+", label: "Partner Organizations" },
      { number: "150+", label: "Women Business Startups" },
      { number: "5", label: "Years of Impact" },
    ],
    visual: { number: "5+", heading: "Years of Service", sub: "Creating lasting change since 2020" },
  },
  programs_preview: {
    title: "Transforming Lives Through Targeted Programs",
    subtitle:
      "We design comprehensive empowerment initiatives that create lasting change in youth development, women's economic independence, and talent cultivation.",
    programs: [
      {
        title: "Youth Empowerment",
        description:
          "Comprehensive sustainability programs for boys and girls, fostering self-reliance through vocational training, mentorship, and eco-friendly business development.",
        stats: "500+ Youth Trained",
        features: ["Vocational Training", "Mentorship", "Sustainability Workshops"],
      },
      {
        title: "Women's Empowerment",
        description:
          "Tailored skill acquisition and business building initiatives for handicapped women, providing economic independence and community support networks.",
        stats: "200+ Women Empowered",
        features: ["Skill Acquisition", "Business Coaching", "Support Networks"],
      },
      {
        title: "Talent Discovery",
        description:
          "Active scouting and nurturing of hidden talents in underserved communities through camps, scholarships, and community outreach programs.",
        stats: "100+ Talents Discovered",
        features: ["Talent Camps", "Scholarships", "Community Outreach"],
      },
    ],
  },
  impact_stories: {
    title: "Impact Stories",
    subtitle: "Real Lives Changed Through Our Programs",
    stories: [
      { name: "Aisha", role: "Entrepreneur", story: "Through the women's empowerment program, I gained skills to start my own business and now support my family independently." },
      { name: "John", role: "Green Entrepreneur", story: "The youth sustainability program helped me launch an eco-friendly business that creates jobs in my community." },
      { name: "Maria", role: "Artist", story: "Discovered through our talent hunt, Maria now shares her artistic talents with the world and mentors other young artists." },
    ],
  },
};

// ── Image helpers ────────────────────────────────────────────────────────

// Compress + convert to WebP in the browser before uploading
async function compressImage(
  file: File,
  maxWidth = 1920,
  quality = 0.85
): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => resolve(blob!), "image/webp", quality);
    };
    img.src = url;
  });
}

type ImageState = {
  existingStorageId: string | null;
  existingUrl: string | null;
  file: File | null;
  preview: string | null; // object URL of the pending file
};

function useImageField(existingStorageId: string | null, existingUrl: string | null): {
  state: ImageState;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearPending: () => void;
  getStorageIdForSave: (generateUploadUrl: () => Promise<string>) => Promise<string | null>;
} {
  const [state, setState] = useState<ImageState>({
    existingStorageId,
    existingUrl,
    file: null,
    preview: null,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync when Convex data arrives
  useEffect(() => {
    setState((s) => ({
      ...s,
      existingStorageId,
      existingUrl,
    }));
  }, [existingStorageId, existingUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous preview
    if (state.preview) URL.revokeObjectURL(state.preview);
    const preview = URL.createObjectURL(file);
    setState((s) => ({ ...s, file, preview }));
    e.target.value = "";
  };

  const clearPending = () => {
    if (state.preview) URL.revokeObjectURL(state.preview);
    setState((s) => ({ ...s, file: null, preview: null }));
  };

  // Returns the storageId to use for saving.
  // Uploads the pending file if there is one; otherwise returns the existing storageId.
  const getStorageIdForSave = async (
    generateUploadUrl: () => Promise<string>
  ): Promise<string | null> => {
    if (!state.file) return state.existingStorageId;
    const compressed = await compressImage(state.file);
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/webp" },
      body: compressed,
    });
    if (!res.ok) throw new Error("Image upload failed");
    const { storageId } = await res.json();
    return storageId as string;
  };

  return { state, inputRef, handleFileChange, clearPending, getStorageIdForSave };
}

// ── Image Upload Field UI ────────────────────────────────────────────────

function ImageUploadField({
  label,
  imageState,
  inputRef,
  onFileChange,
  onClear,
}: {
  label: string;
  imageState: ImageState;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const displayUrl = imageState.preview ?? imageState.existingUrl;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      {displayUrl ? (
        <div className="relative w-full max-w-sm">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            <Image
              src={displayUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={!!imageState.preview}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              className="gap-1">
              <ImageIcon className="h-3.5 w-3.5" />
              Change Image
            </Button>
            {imageState.preview && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={onClear}
                className="gap-1 text-muted-foreground">
                <X className="h-3.5 w-3.5" />
                Cancel
              </Button>
            )}
          </div>
          {imageState.preview && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              New image selected — save to apply.
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full max-w-sm aspect-video rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary/50 transition-colors bg-slate-50 dark:bg-slate-800/50 cursor-pointer gap-2 text-muted-foreground hover:text-primary">
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm font-medium">Click to upload image</span>
          <span className="text-xs">Will be compressed & converted to WebP</span>
        </button>
      )}
    </div>
  );
}

// ── Save helper ───────────────────────────────────────────────────────────

async function withToast(label: string, fn: () => Promise<void>) {
  const id = toast.loading(`Saving ${label}…`);
  try {
    await fn();
    toast.success(`${label} saved`, { id });
  } catch (err) {
    toast.error(`Failed to save ${label}: ${String(err)}`, { id });
  }
}

// ── Main Component ───────────────────────────────────────────────────────

export default function AboutAdminClient() {
  const allSections = useQuery(api.siteContent.getAllSections);
  const upsertSection = useMutation(api.siteContent.upsertSection);
  const generateUploadUrl = useMutation(api.siteContent.generateUploadUrl);

  // Build a lookup map from the query result
  const sectionMap = Object.fromEntries(
    (allSections ?? []).map((s) => [s.section, s])
  );

  const get = (key: string) => sectionMap[key] ?? null;

  // ── Hero (home page) ─────────────────────────────────────────────────
  const heroDoc = get("hero");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroStats, setHeroStats] = useState(DEFAULTS.hero.stats);
  const heroImage = useImageField(
    heroDoc?.image ?? null,
    heroDoc?.imageUrl ?? null
  );

  useEffect(() => {
    if (!heroDoc) return;
    setHeroTitle(heroDoc.title ?? DEFAULTS.hero.title);
    setHeroSubtitle(heroDoc.subtitle ?? DEFAULTS.hero.subtitle);
    try {
      const parsed = JSON.parse(heroDoc.body ?? "");
      if (Array.isArray(parsed)) setHeroStats(parsed);
    } catch {
      setHeroStats(DEFAULTS.hero.stats);
    }
  }, [heroDoc]);

  // ── About Hero ───────────────────────────────────────────────────────
  const aboutHeroDoc = get("about_hero");
  const [aboutHeroTitle, setAboutHeroTitle] = useState("");
  const [aboutHeroSubtitle, setAboutHeroSubtitle] = useState("");

  useEffect(() => {
    if (!aboutHeroDoc) return;
    setAboutHeroTitle(aboutHeroDoc.title ?? DEFAULTS.about_hero.title);
    setAboutHeroSubtitle(aboutHeroDoc.subtitle ?? DEFAULTS.about_hero.subtitle);
  }, [aboutHeroDoc]);

  // ── Our Story ────────────────────────────────────────────────────────
  const storyDoc = get("our_story");
  const [story, setStory] = useState(DEFAULTS.our_story);

  useEffect(() => {
    if (!storyDoc?.body) return;
    try {
      setStory({ ...DEFAULTS.our_story, ...JSON.parse(storyDoc.body) });
    } catch { /* keep defaults */ }
  }, [storyDoc]);

  // ── Our Journey ──────────────────────────────────────────────────────
  const journeyDoc = get("our_journey");
  const [journeyTitle, setJourneyTitle] = useState("");
  const [journeySubtitle, setJourneySubtitle] = useState("");
  const journeyImage = useImageField(
    journeyDoc?.image ?? null,
    journeyDoc?.imageUrl ?? null
  );
  useEffect(() => {
    if (!journeyDoc) return;
    setJourneyTitle(journeyDoc.title ?? DEFAULTS.our_journey.title);
    setJourneySubtitle(journeyDoc.subtitle ?? DEFAULTS.our_journey.subtitle);
  }, [journeyDoc]);

  // ── Our Purpose ──────────────────────────────────────────────────────
  const purposeDoc = get("our_purpose");
  const [purposeTitle, setPurposeTitle] = useState("");
  const [purposeSubtitle, setPurposeSubtitle] = useState("");
  useEffect(() => {
    if (!purposeDoc) return;
    setPurposeTitle(purposeDoc.title ?? DEFAULTS.our_purpose.title);
    setPurposeSubtitle(purposeDoc.subtitle ?? DEFAULTS.our_purpose.subtitle);
  }, [purposeDoc]);

  // ── Mission ──────────────────────────────────────────────────────────
  const missionDoc = get("mission");
  const [missionText, setMissionText] = useState("");
  const [missionBullets, setMissionBullets] = useState(
    DEFAULTS.mission.bullets.join("\n")
  );
  useEffect(() => {
    if (!missionDoc?.body) return;
    try {
      const parsed = JSON.parse(missionDoc.body);
      setMissionText(parsed.text ?? DEFAULTS.mission.text);
      setMissionBullets(
        (parsed.bullets ?? DEFAULTS.mission.bullets).join("\n")
      );
    } catch { /* keep defaults */ }
  }, [missionDoc]);

  // ── Vision ───────────────────────────────────────────────────────────
  const visionDoc = get("vision");
  const [visionText, setVisionText] = useState("");
  const [visionBullets, setVisionBullets] = useState(
    DEFAULTS.vision.bullets.join("\n")
  );
  useEffect(() => {
    if (!visionDoc?.body) return;
    try {
      const parsed = JSON.parse(visionDoc.body);
      setVisionText(parsed.text ?? DEFAULTS.vision.text);
      setVisionBullets(
        (parsed.bullets ?? DEFAULTS.vision.bullets).join("\n")
      );
    } catch { /* keep defaults */ }
  }, [visionDoc]);

  // ── Values ───────────────────────────────────────────────────────────
  const valuesDoc = get("values");
  const [values, setValues] = useState(DEFAULTS.values);
  useEffect(() => {
    if (!valuesDoc?.body) return;
    try {
      const parsed = JSON.parse(valuesDoc.body);
      if (Array.isArray(parsed)) setValues(parsed);
    } catch { /* keep defaults */ }
  }, [valuesDoc]);

  // ── Achievements ─────────────────────────────────────────────────────
  const achievementsDoc = get("achievements");
  const [achievementsTitle, setAchievementsTitle] = useState("");
  const [achievementsSubtitle, setAchievementsSubtitle] = useState("");
  const [achievementsStats, setAchievementsStats] = useState(DEFAULTS.achievements.stats);
  const [achievementsVisual, setAchievementsVisual] = useState(DEFAULTS.achievements.visual);
  useEffect(() => {
    if (!achievementsDoc) return;
    setAchievementsTitle(achievementsDoc.title ?? DEFAULTS.achievements.title);
    setAchievementsSubtitle(achievementsDoc.subtitle ?? DEFAULTS.achievements.subtitle);
    try {
      const parsed = JSON.parse(achievementsDoc.body ?? "");
      if (parsed.achievements) setAchievementsStats(parsed.achievements);
      if (parsed.visual) setAchievementsVisual({ ...DEFAULTS.achievements.visual, ...parsed.visual });
    } catch { /* keep defaults */ }
  }, [achievementsDoc]);

  // ── Programs Preview ─────────────────────────────────────────────────
  const programsDoc = get("programs_preview");
  const [programsTitle, setProgramsTitle] = useState("");
  const [programsSubtitle, setProgramsSubtitle] = useState("");
  const [programs, setPrograms] = useState(DEFAULTS.programs_preview.programs);
  useEffect(() => {
    if (!programsDoc) return;
    setProgramsTitle(programsDoc.title ?? DEFAULTS.programs_preview.title);
    setProgramsSubtitle(programsDoc.subtitle ?? DEFAULTS.programs_preview.subtitle);
    try {
      const parsed = JSON.parse(programsDoc.body ?? "");
      if (Array.isArray(parsed) && parsed.length > 0) setPrograms(parsed);
    } catch { /* keep defaults */ }
  }, [programsDoc]);

  // ── Impact Stories ───────────────────────────────────────────────────
  const storiesDoc = get("impact_stories");
  const [storiesTitle, setStoriesTitle] = useState("");
  const [storiesSubtitle, setStoriesSubtitle] = useState("");
  const [impactStories, setImpactStories] = useState(DEFAULTS.impact_stories.stories);
  useEffect(() => {
    if (!storiesDoc) return;
    setStoriesTitle(storiesDoc.title ?? DEFAULTS.impact_stories.title);
    setStoriesSubtitle(storiesDoc.subtitle ?? DEFAULTS.impact_stories.subtitle);
    try {
      const parsed = JSON.parse(storiesDoc.body ?? "");
      if (Array.isArray(parsed) && parsed.length > 0) setImpactStories(parsed);
    } catch { /* keep defaults */ }
  }, [storiesDoc]);

  // ── Save handlers ─────────────────────────────────────────────────────

  const [saving, setSaving] = useState<string | null>(null);

  const saveHero = () =>
    withToast("Home Hero", async () => {
      setSaving("hero");
      const image = await heroImage.getStorageIdForSave(generateUploadUrl);
      await upsertSection({
        section: "hero",
        title: heroTitle || DEFAULTS.hero.title,
        subtitle: heroSubtitle || DEFAULTS.hero.subtitle,
        body: JSON.stringify(heroStats),
        image: image ?? undefined,
      });
      setSaving(null);
    });

  const saveAboutHero = () =>
    withToast("About Hero", async () => {
      setSaving("about_hero");
      await upsertSection({
        section: "about_hero",
        title: aboutHeroTitle || DEFAULTS.about_hero.title,
        subtitle: aboutHeroSubtitle || DEFAULTS.about_hero.subtitle,
      });
      setSaving(null);
    });

  const saveStory = () =>
    withToast("Our Story", async () => {
      setSaving("our_story");
      await upsertSection({
        section: "our_story",
        body: JSON.stringify(story),
      });
      setSaving(null);
    });

  const saveJourney = () =>
    withToast("Our Journey", async () => {
      setSaving("our_journey");
      const image = await journeyImage.getStorageIdForSave(generateUploadUrl);
      await upsertSection({
        section: "our_journey",
        title: journeyTitle || DEFAULTS.our_journey.title,
        subtitle: journeySubtitle || DEFAULTS.our_journey.subtitle,
        image: image ?? undefined,
      });
      setSaving(null);
    });

  const savePurpose = () =>
    withToast("Our Purpose", async () => {
      setSaving("our_purpose");
      await upsertSection({
        section: "our_purpose",
        title: purposeTitle || DEFAULTS.our_purpose.title,
        subtitle: purposeSubtitle || DEFAULTS.our_purpose.subtitle,
      });
      setSaving(null);
    });

  const saveMission = () =>
    withToast("Mission", async () => {
      setSaving("mission");
      await upsertSection({
        section: "mission",
        body: JSON.stringify({
          text: missionText || DEFAULTS.mission.text,
          bullets: missionBullets.split("\n").map((b) => b.trim()).filter(Boolean),
        }),
      });
      setSaving(null);
    });

  const saveVision = () =>
    withToast("Vision", async () => {
      setSaving("vision");
      await upsertSection({
        section: "vision",
        body: JSON.stringify({
          text: visionText || DEFAULTS.vision.text,
          bullets: visionBullets.split("\n").map((b) => b.trim()).filter(Boolean),
        }),
      });
      setSaving(null);
    });

  const saveValues = () =>
    withToast("Values", async () => {
      setSaving("values");
      await upsertSection({ section: "values", body: JSON.stringify(values) });
      setSaving(null);
    });

  const saveAchievements = () =>
    withToast("Achievements", async () => {
      setSaving("achievements");
      await upsertSection({
        section: "achievements",
        title: achievementsTitle || DEFAULTS.achievements.title,
        subtitle: achievementsSubtitle || DEFAULTS.achievements.subtitle,
        body: JSON.stringify({ achievements: achievementsStats, visual: achievementsVisual }),
      });
      setSaving(null);
    });

  const saveProgramsPreview = () =>
    withToast("Programs Preview", async () => {
      setSaving("programs_preview");
      await upsertSection({
        section: "programs_preview",
        title: programsTitle || DEFAULTS.programs_preview.title,
        subtitle: programsSubtitle || DEFAULTS.programs_preview.subtitle,
        body: JSON.stringify(programs),
      });
      setSaving(null);
    });

  const saveImpactStories = () =>
    withToast("Impact Stories", async () => {
      setSaving("impact_stories");
      await upsertSection({
        section: "impact_stories",
        title: storiesTitle || DEFAULTS.impact_stories.title,
        subtitle: storiesSubtitle || DEFAULTS.impact_stories.subtitle,
        body: JSON.stringify(impactStories),
      });
      setSaving(null);
    });

  const loading = allSections === undefined;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <AdminPagesHeader />
          <div className="mt-4">
            <h1 className="text-3xl font-black text-foreground mb-1">
              About Page Content
            </h1>
            <p className="text-sm text-muted-foreground">
              Edit every section of the About page and the Home page hero.
              Changes go live immediately.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {loading && (
          <p className="text-muted-foreground text-sm">Loading content…</p>
        )}

        {/* ── 1. Home Page Hero ──────────────────────────────────────── */}
        <SectionCard title="Home Page Hero" isSaving={saving === "hero"} onSave={saveHero}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Main Heading</Label>
              <Input
                value={heroTitle || DEFAULTS.hero.title}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder={DEFAULTS.hero.title}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Subtitle</Label>
              <Textarea
                rows={3}
                value={heroSubtitle || DEFAULTS.hero.subtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder={DEFAULTS.hero.subtitle}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Stats (3 numbers)</Label>
            <div className="grid grid-cols-3 gap-3">
              {heroStats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <Input
                    value={stat.value}
                    placeholder="e.g. 500+"
                    onChange={(e) =>
                      setHeroStats((prev) =>
                        prev.map((s, idx) =>
                          idx === i ? { ...s, value: e.target.value } : s
                        )
                      )
                    }
                  />
                  <Input
                    value={stat.label}
                    placeholder="e.g. Youth Empowered"
                    onChange={(e) =>
                      setHeroStats((prev) =>
                        prev.map((s, idx) =>
                          idx === i ? { ...s, label: e.target.value } : s
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Top row = number, bottom row = label</p>
          </div>

          <ImageUploadField
            label="Hero Image"
            imageState={heroImage.state}
            inputRef={heroImage.inputRef}
            onFileChange={heroImage.handleFileChange}
            onClear={heroImage.clearPending}
          />
        </SectionCard>

        {/* ── 2. About Page Hero ─────────────────────────────────────── */}
        <SectionCard title="About Page Hero" isSaving={saving === "about_hero"} onSave={saveAboutHero}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input
                value={aboutHeroTitle || DEFAULTS.about_hero.title}
                onChange={(e) => setAboutHeroTitle(e.target.value)}
                placeholder={DEFAULTS.about_hero.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Textarea
                rows={3}
                value={aboutHeroSubtitle || DEFAULTS.about_hero.subtitle}
                onChange={(e) => setAboutHeroSubtitle(e.target.value)}
                placeholder={DEFAULTS.about_hero.subtitle}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 3. Our Story ───────────────────────────────────────────── */}
        <SectionCard title="Our Story" isSaving={saving === "our_story"} onSave={saveStory}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Paragraph 1</Label>
              <Textarea
                rows={3}
                value={story.para1}
                onChange={(e) => setStory((s) => ({ ...s, para1: e.target.value }))}
                placeholder={DEFAULTS.our_story.para1}
              />
            </div>
            <div className="space-y-2">
              <Label>Paragraph 2</Label>
              <Textarea
                rows={3}
                value={story.para2}
                onChange={(e) => setStory((s) => ({ ...s, para2: e.target.value }))}
                placeholder={DEFAULTS.our_story.para2}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  { key: "founded", label: "Founded" },
                  { key: "location", label: "Location" },
                  { key: "communities", label: "Communities" },
                  { key: "programs", label: "Programs" },
                ] as const
              ).map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    value={story[key]}
                    onChange={(e) =>
                      setStory((s) => ({ ...s, [key]: e.target.value }))
                    }
                    placeholder={DEFAULTS.our_story[key]}
                  />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ── 4. Our Journey ─────────────────────────────────────────── */}
        <SectionCard title="Our Journey" isSaving={saving === "our_journey"} onSave={saveJourney}>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={journeyTitle || DEFAULTS.our_journey.title}
                  onChange={(e) => setJourneyTitle(e.target.value)}
                  placeholder={DEFAULTS.our_journey.title}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={journeySubtitle || DEFAULTS.our_journey.subtitle}
                  onChange={(e) => setJourneySubtitle(e.target.value)}
                  placeholder={DEFAULTS.our_journey.subtitle}
                />
              </div>
            </div>
            <ImageUploadField
              label="Journey Image (replaces the animated icon)"
              imageState={journeyImage.state}
              inputRef={journeyImage.inputRef}
              onFileChange={journeyImage.handleFileChange}
              onClear={journeyImage.clearPending}
            />
          </div>
        </SectionCard>

        {/* ── 5. Our Purpose ─────────────────────────────────────────── */}
        <SectionCard title="Our Purpose (section header)" isSaving={saving === "our_purpose"} onSave={savePurpose}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Heading</Label>
              <Input
                value={purposeTitle || DEFAULTS.our_purpose.title}
                onChange={(e) => setPurposeTitle(e.target.value)}
                placeholder={DEFAULTS.our_purpose.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={purposeSubtitle || DEFAULTS.our_purpose.subtitle}
                onChange={(e) => setPurposeSubtitle(e.target.value)}
                placeholder={DEFAULTS.our_purpose.subtitle}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 6. Mission ─────────────────────────────────────────────── */}
        <SectionCard title="Our Mission" isSaving={saving === "mission"} onSave={saveMission}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mission Statement</Label>
              <Textarea
                rows={4}
                value={missionText || DEFAULTS.mission.text}
                onChange={(e) => setMissionText(e.target.value)}
                placeholder={DEFAULTS.mission.text}
              />
            </div>
            <div className="space-y-2">
              <Label>Bullet Points</Label>
              <Textarea
                rows={5}
                value={missionBullets}
                onChange={(e) => setMissionBullets(e.target.value)}
                placeholder={DEFAULTS.mission.bullets.join("\n")}
              />
              <p className="text-xs text-muted-foreground">One bullet per line</p>
            </div>
          </div>
        </SectionCard>

        {/* ── 7. Vision ──────────────────────────────────────────────── */}
        <SectionCard title="Our Vision" isSaving={saving === "vision"} onSave={saveVision}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Vision Statement</Label>
              <Textarea
                rows={4}
                value={visionText || DEFAULTS.vision.text}
                onChange={(e) => setVisionText(e.target.value)}
                placeholder={DEFAULTS.vision.text}
              />
            </div>
            <div className="space-y-2">
              <Label>Bullet Points</Label>
              <Textarea
                rows={5}
                value={visionBullets}
                onChange={(e) => setVisionBullets(e.target.value)}
                placeholder={DEFAULTS.vision.bullets.join("\n")}
              />
              <p className="text-xs text-muted-foreground">One bullet per line</p>
            </div>
          </div>
        </SectionCard>

        {/* ── 8. Values ──────────────────────────────────────────────── */}
        <SectionCard title="Our Values" isSaving={saving === "values"} onSave={saveValues}>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Value {i + 1} — Title
                  </Label>
                  <Input
                    value={val.title}
                    onChange={(e) =>
                      setValues((prev) =>
                        prev.map((v, idx) =>
                          idx === i ? { ...v, title: e.target.value } : v
                        )
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea
                    rows={3}
                    value={val.description}
                    onChange={(e) =>
                      setValues((prev) =>
                        prev.map((v, idx) =>
                          idx === i ? { ...v, description: e.target.value } : v
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 9. Achievements ────────────────────────────────────────── */}
        <SectionCard title="Achievements / Impact Stats" isSaving={saving === "achievements"} onSave={saveAchievements}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={achievementsTitle || DEFAULTS.achievements.title}
                onChange={(e) => setAchievementsTitle(e.target.value)}
                placeholder={DEFAULTS.achievements.title}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={achievementsSubtitle || DEFAULTS.achievements.subtitle}
                onChange={(e) => setAchievementsSubtitle(e.target.value)}
                placeholder={DEFAULTS.achievements.subtitle}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Stats (4 numbers)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievementsStats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <Input
                    value={stat.number}
                    placeholder="e.g. 1,000+"
                    onChange={(e) =>
                      setAchievementsStats((prev) =>
                        prev.map((s, idx) => idx === i ? { ...s, number: e.target.value } : s)
                      )
                    }
                  />
                  <Input
                    value={stat.label}
                    placeholder="e.g. Beneficiaries"
                    onChange={(e) =>
                      setAchievementsStats((prev) =>
                        prev.map((s, idx) => idx === i ? { ...s, label: e.target.value } : s)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Top = number, bottom = label</p>
          </div>
          <div className="space-y-2">
            <Label>Visual Card</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Big Number</Label>
                <Input
                  value={achievementsVisual.number}
                  onChange={(e) => setAchievementsVisual((v) => ({ ...v, number: e.target.value }))}
                  placeholder="5+"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Heading</Label>
                <Input
                  value={achievementsVisual.heading}
                  onChange={(e) => setAchievementsVisual((v) => ({ ...v, heading: e.target.value }))}
                  placeholder="Years of Service"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Sub-text</Label>
                <Input
                  value={achievementsVisual.sub}
                  onChange={(e) => setAchievementsVisual((v) => ({ ...v, sub: e.target.value }))}
                  placeholder="Creating lasting change since 2020"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── 10. Programs Preview ────────────────────────────────────── */}
        <SectionCard title="Programs Preview (Home Page)" isSaving={saving === "programs_preview"} onSave={saveProgramsPreview}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={programsTitle || DEFAULTS.programs_preview.title}
                onChange={(e) => setProgramsTitle(e.target.value)}
                placeholder={DEFAULTS.programs_preview.title}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Subtitle</Label>
              <Textarea
                rows={2}
                value={programsSubtitle || DEFAULTS.programs_preview.subtitle}
                onChange={(e) => setProgramsSubtitle(e.target.value)}
                placeholder={DEFAULTS.programs_preview.subtitle}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Programs (3 cards)</Label>
            {programs.map((prog, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">Program {i + 1}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Title</Label>
                    <Input
                      value={prog.title}
                      onChange={(e) =>
                        setPrograms((prev) => prev.map((p, idx) => idx === i ? { ...p, title: e.target.value } : p))
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Stat (e.g. 500+ Youth Trained)</Label>
                    <Input
                      value={prog.stats}
                      onChange={(e) =>
                        setPrograms((prev) => prev.map((p, idx) => idx === i ? { ...p, stats: e.target.value } : p))
                      }
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Description</Label>
                    <Textarea
                      rows={2}
                      value={prog.description}
                      onChange={(e) =>
                        setPrograms((prev) => prev.map((p, idx) => idx === i ? { ...p, description: e.target.value } : p))
                      }
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Features (one per line)</Label>
                    <Textarea
                      rows={3}
                      value={prog.features.join("\n")}
                      onChange={(e) =>
                        setPrograms((prev) =>
                          prev.map((p, idx) =>
                            idx === i
                              ? { ...p, features: e.target.value.split("\n").map((f) => f.trim()).filter(Boolean) }
                              : p
                          )
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 11. Impact Stories ──────────────────────────────────────── */}
        <SectionCard title="Impact Stories (Home Page)" isSaving={saving === "impact_stories"} onSave={saveImpactStories}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Section Heading</Label>
              <Input
                value={storiesTitle || DEFAULTS.impact_stories.title}
                onChange={(e) => setStoriesTitle(e.target.value)}
                placeholder={DEFAULTS.impact_stories.title}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={storiesSubtitle || DEFAULTS.impact_stories.subtitle}
                onChange={(e) => setStoriesSubtitle(e.target.value)}
                placeholder={DEFAULTS.impact_stories.subtitle}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Label>Stories (3 cards)</Label>
            {impactStories.map((story, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">Story {i + 1}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Name</Label>
                    <Input
                      value={story.name}
                      onChange={(e) =>
                        setImpactStories((prev) => prev.map((s, idx) => idx === i ? { ...s, name: e.target.value } : s))
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Role</Label>
                    <Input
                      value={story.role}
                      onChange={(e) =>
                        setImpactStories((prev) => prev.map((s, idx) => idx === i ? { ...s, role: e.target.value } : s))
                      }
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Story</Label>
                    <Textarea
                      rows={3}
                      value={story.story}
                      onChange={(e) =>
                        setImpactStories((prev) => prev.map((s, idx) => idx === i ? { ...s, story: e.target.value } : s))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 12. Team ───────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Team members displayed on the About page are managed in the Team
              Management section.
            </p>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/admin/team">
                <ExternalLink className="h-4 w-4" />
                Go to Team Management
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// ── Section Card wrapper ─────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  isSaving,
  onSave,
}: {
  title: string;
  children: React.ReactNode;
  isSaving: boolean;
  onSave: () => void;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">{title}</CardTitle>
          <Button
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
