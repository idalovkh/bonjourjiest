import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logoMarkUrl from "@/assets/brand/logo-mark.png";
import type { QuizResult } from "./model";

interface AchievementActionProps {
  result: QuizResult;
  total: number;
  accuracy: number;
}

async function buildAchievementBlob(result: QuizResult, total: number, accuracy: number): Promise<Blob> {
  const width = 1080;
  const height = 1350;
  const centerX = width / 2;
  const canvas = globalThis.document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Не удалось создать ачивку");

  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 2) => {
    const words = text.split(" ");
    let line = "";
    let lines = 0;
    let cursorY = y;
    for (const word of words) {
      const candidate = `${line}${word} `;
      if (ctx.measureText(candidate).width > maxWidth) {
        ctx.fillText(line.trim(), x, cursorY);
        line = `${word} `;
        cursorY += lineHeight;
        lines += 1;
        if (lines >= maxLines) return;
      } else {
        line = candidate;
      }
    }
    if (line.trim().length) ctx.fillText(line.trim(), x, cursorY);
  };

  ctx.fillStyle = "#f5f0e8";
  ctx.fillRect(0, 0, width, height);

  const stripeHeight = 16;
  ctx.fillStyle = "#313d57";
  ctx.fillRect(0, 0, width / 3, stripeHeight);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(width / 3, 0, width / 3, stripeHeight);
  ctx.fillStyle = "#7a4d57";
  ctx.fillRect((width / 3) * 2, 0, width / 3, stripeHeight);

  drawRoundedRect(58, 58, width - 116, height - 116, 46);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = "rgba(15,23,42,0.08)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const brandMark = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Не удалось загрузить логотип"));
    image.src = logoMarkUrl;
  });
  const markHeight = 210;
  const markWidth = markHeight * (brandMark.width / brandMark.height);
  ctx.drawImage(brandMark, centerX - markWidth / 2, 78, markWidth, markHeight);

  ctx.beginPath();
  ctx.arc(centerX, 520, 165, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#313d57";
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "700 46px Inter, system-ui, -apple-system, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("Мой уровень французского", centerX, 318);
  ctx.fillStyle = "#64748b";
  ctx.font = "600 38px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillText("Level", centerX, 458);
  ctx.fillStyle = "#7a4d57";
  ctx.font = "800 120px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillText(result.level, centerX, 540);
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";

  drawRoundedRect(142, 730, 378, 180, 26);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.strokeStyle = "rgba(15,23,42,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  drawRoundedRect(560, 730, 378, 180, 26);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.strokeStyle = "rgba(15,23,42,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const leftCardCenterX = 142 + 378 / 2;
  const rightCardCenterX = 560 + 378 / 2;
  ctx.textAlign = "center";

  ctx.fillStyle = "#64748b";
  ctx.font = "600 24px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillText("ПРАВИЛЬНЫЕ ОТВЕТЫ", leftCardCenterX, 782);
  ctx.fillText("ТОЧНОСТЬ", rightCardCenterX, 782);

  ctx.fillStyle = "#0f172a";
  ctx.font = "800 74px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillText(`${result.score}/${total}`, leftCardCenterX, 865);
  ctx.fillText(`${accuracy}%`, rightCardCenterX, 865);
  ctx.textAlign = "start";

  drawRoundedRect(142, 946, width - 284, 232, 30);
  ctx.fillStyle = "#f8fafc";
  ctx.fill();
  ctx.strokeStyle = "rgba(15,23,42,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#313d57";
  ctx.font = "500 32px Inter, system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("bonjourjiest.com", centerX, 1050);
  ctx.font = "500 28px Inter, system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#475569";
  drawWrappedText("Сможешь лучше? Проверь свой уровень за 3 минуты.", centerX, 1110, 760, 36, 2);
  ctx.textAlign = "start";

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) reject(new Error("Не удалось сформировать изображение"));
      else resolve(blob);
    }, "image/png");
  });
}

export function AchievementAction({ result, total, accuracy }: AchievementActionProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleDownload = async () => {
    setSaving(true);
    try {
      const blob = await buildAchievementBlob(result, total, accuracy);
      const url = globalThis.URL.createObjectURL(blob);
      const link = globalThis.document.createElement("a");
      link.href = url;
      link.download = `achievement-${result.level}-${result.score}-${total}.png`;
      link.click();
      globalThis.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить ачивку",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Button type="button" variant="outline" onClick={handleDownload} disabled={saving} className="rounded-full shrink-0">
        {saving ? "Сохраняем..." : "Сохранить результат"}
      </Button>
      <p className="text-sm text-muted-foreground">Забирай ачивку и покажи в сторис свой уровень.</p>
    </div>
  );
}
