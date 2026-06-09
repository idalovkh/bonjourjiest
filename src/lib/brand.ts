export const BRAND_FONT_FAMILY = '"Cormorant Garamond", Georgia, "Times New Roman", serif';

export const BRAND_COLORS = {
  bonjour: "hsl(350, 28%, 42%)",
  jiEst: "hsl(220, 32%, 28%)",
} as const;

export async function loadBrandFont(sizePx = 44, weight = 500): Promise<void> {
  if (!globalThis.document?.fonts) return;
  try {
    await globalThis.document.fonts.load(`${weight} ${sizePx}px ${BRAND_FONT_FAMILY}`);
  } catch {
    // Georgia fallback is fine for canvas export
  }
}

export function drawBrandNameOnCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  y: number,
  fontSize: number,
  layout: "inline" | "stacked" = "stacked",
) {
  const bonjour = "Bonjour";
  const jiEst = layout === "stacked" ? "жи есть" : " жи есть";
  ctx.font = `500 ${fontSize}px ${BRAND_FONT_FAMILY}`;
  ctx.textBaseline = "alphabetic";

  if (layout === "stacked") {
    ctx.textAlign = "center";
    ctx.fillStyle = BRAND_COLORS.bonjour;
    ctx.fillText(bonjour, centerX, y);
    ctx.fillStyle = BRAND_COLORS.jiEst;
    ctx.fillText(jiEst, centerX, y + fontSize * 1.05);
    return;
  }

  const bonjourWidth = ctx.measureText(bonjour).width;
  const totalWidth = ctx.measureText(`${bonjour}${jiEst}`).width;
  const startX = centerX - totalWidth / 2;

  ctx.textAlign = "left";
  ctx.fillStyle = BRAND_COLORS.bonjour;
  ctx.fillText(bonjour, startX, y);
  ctx.fillStyle = BRAND_COLORS.jiEst;
  ctx.fillText(jiEst, startX + bonjourWidth, y);
}
