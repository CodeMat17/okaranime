"use client";

import { useEffect, useRef, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminPagesHeader from "../_components/AdminPagesHeader";
import { Download, Upload, AlertCircle, CheckCircle2 } from "lucide-react";

type ImportResult = {
  newsImported: number;
  teamImported: number;
};

// Downloads a URL and returns a base64 data URL string
async function fetchAsDataUrl(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return undefined;
  }
}

// Converts a base64 data URL to a Blob
function dataUrlToBlob(dataUrl: string): { blob: Blob; contentType: string } {
  const [header, base64] = dataUrl.split(",");
  const contentType = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return { blob: new Blob([bytes], { type: contentType }), contentType };
}

const BackupClient = () => {
  const exportBackup = useAction(api.backup.exportBackup);
  const generateUploadUrl = useMutation(api.backup.generateUploadUrl);
  const importItems = useMutation(api.backup.importItems);

  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState("");
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasAutoExported = useRef(false);

  // ── Export ──────────────────────────────────────────────────
  const handleExport = async () => {
    setExporting(true);
    setExportStatus("Fetching data from Convex…");
    try {
      // 1. Get all records + short-lived imageUrls from Convex
      const data = await exportBackup({});

      // 2. Download each image immediately and embed as base64
      const totalImages =
        data.news.filter((n) => n.imageUrl).length +
        data.team.filter((t) => t.imageUrl).length;
      let downloaded = 0;

      const news = await Promise.all(
        data.news.map(async (item) => {
          const { imageUrl, ...rest } = item;
          if (!imageUrl) return rest;
          setExportStatus(
            `Downloading images… (${++downloaded}/${totalImages})`
          );
          const imageData = await fetchAsDataUrl(imageUrl);
          return imageData ? { ...rest, imageData } : rest;
        })
      );

      const team = await Promise.all(
        data.team.map(async (item) => {
          const { imageUrl, ...rest } = item;
          if (!imageUrl) return rest;
          setExportStatus(
            `Downloading images… (${++downloaded}/${totalImages})`
          );
          const imageData = await fetchAsDataUrl(imageUrl);
          return imageData ? { ...rest, imageData } : rest;
        })
      );

      // 3. Save self-contained JSON — no expiring URLs
      setExportStatus("Saving file…");
      const payload = {
        exportedAt: data.exportedAt,
        version: "1.0",
        news,
        team,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `okaranime-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus("");
    } catch (err) {
      alert("Export failed: " + String(err));
      setExportStatus("");
    } finally {
      setExporting(false);
    }
  };

  // Auto-export on page load
  useEffect(() => {
    if (hasAutoExported.current) return;
    hasAutoExported.current = true;
    handleExport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Import ──────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
    setImportResult(null);
    setImportError(null);
    setImportStatus("");
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    setImporting(true);
    setImportResult(null);
    setImportError(null);

    try {
      const parsed = JSON.parse(await selectedFile.text());

      if (
        !Array.isArray(parsed.news) ||
        !Array.isArray(parsed.team)
      ) {
        setImportError("Invalid backup file: missing 'news' or 'team' arrays.");
        return;
      }

      // Helper: upload a base64 data URL to Convex storage, return storageId
      const uploadImage = async (
        dataUrl: string
      ): Promise<string | undefined> => {
        try {
          const { blob, contentType } = dataUrlToBlob(dataUrl);
          const uploadUrl = await generateUploadUrl();
          const res = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": contentType },
            body: blob,
          });
          if (!res.ok) return undefined;
          const { storageId } = await res.json();
          return storageId as string;
        } catch {
          return undefined;
        }
      };

      // 1. Upload images and resolve storageIds
      const totalImages =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsed.news.filter((n: any) => n.imageData).length +
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsed.team.filter((t: any) => t.imageData).length;
      let uploaded = 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const news = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsed.news.map(async (item: any) => {
          let storageId: string | undefined;
          if (item.imageData) {
            setImportStatus(
              `Uploading images… (${++uploaded}/${totalImages})`
            );
            storageId = await uploadImage(item.imageData);
          }
          return {
            title: item.title as string,
            slug: item.slug as string,
            content: item.content as string,
            ...(storageId ? { storageId } : {}),
          };
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const team = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parsed.team.map(async (item: any) => {
          let storageId: string | undefined;
          if (item.imageData) {
            setImportStatus(
              `Uploading images… (${++uploaded}/${totalImages})`
            );
            storageId = await uploadImage(item.imageData);
          }
          return {
            name: item.name as string,
            position: item.position as string,
            description: item.description as string,
            ...(item.email ? { email: item.email as string } : {}),
            ...(storageId ? { storageId } : {}),
          };
        })
      );

      // 2. Insert all records (no base64, no _id)
      setImportStatus("Saving records to database…");
      const result = await importItems({ news, team });
      setImportResult(result);
      setImportStatus("");
    } catch (err) {
      setImportError("Import failed: " + String(err));
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminPagesHeader />

        <div className="pt-4 mb-8">
          <h1 className="text-3xl font-black text-foreground mb-1">
            Backup &amp; Restore
          </h1>
          <p className="text-muted-foreground text-sm">
            Export all data and images into a self-contained file, then import
            into any Convex deployment at any time.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Export Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Export Backup
              </CardTitle>
              <CardDescription>
                Downloads a JSON file with all news articles, team members, and
                images embedded as base64 — no expiry.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button
                onClick={handleExport}
                disabled={exporting}
                className="gap-2 w-fit">
                <Download className="h-4 w-4" />
                {exporting ? "Exporting…" : "Export Backup"}
              </Button>
              {exportStatus && (
                <p className="text-sm text-muted-foreground">{exportStatus}</p>
              )}
            </CardContent>
          </Card>

          {/* Import Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Import Backup
              </CardTitle>
              <CardDescription>
                Upload a backup JSON file to restore all data and images into
                this Convex deployment. Run on a fresh deployment to avoid
                duplicates.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2">
                  <Upload className="h-4 w-4" />
                  {selectedFile ? selectedFile.name : "Choose backup file"}
                </Button>

                {selectedFile && (
                  <Button onClick={handleImport} disabled={importing}>
                    {importing ? "Importing…" : "Import"}
                  </Button>
                )}
              </div>

              {importStatus && (
                <p className="text-sm text-muted-foreground">{importStatus}</p>
              )}

              {importResult && (
                <div className="rounded-md border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 p-4 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Imported {importResult.newsImported} news articles and{" "}
                    {importResult.teamImported} team members.
                  </p>
                </div>
              )}

              {importError && (
                <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-4 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {importError}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BackupClient;
