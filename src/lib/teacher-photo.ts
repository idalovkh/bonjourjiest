/**
 * Teacher photos in 3/4 cards: portrait sources (~864×1184) vs landscape CGI (~1402×1122).
 * Landscape assets need a calmer scale and a higher focal point so faces aren’t cropped oddly.
 */
const LANDSCAPE_TEACHER_KEYS = new Set(["erik", "angelina"]);

export function isLandscapeTeacherPhoto(photoKey: string): boolean {
  return LANDSCAPE_TEACHER_KEYS.has(photoKey);
}

/** Merged after base `object-cover` + defaults in the carousel card. */
export function teacherCardPhotoImgClassName(photoKey: string): string {
  if (!isLandscapeTeacherPhoto(photoKey)) return "scale-105 object-center";
  if (photoKey === "erik") return "scale-100 object-[center_30%]";
  return "scale-100 object-[center_28%]";
}

/** Merged after base `object-cover` in TeacherModal (default there is heavier zoom). */
export function teacherModalPhotoImgClassName(photoKey: string): string {
  if (!isLandscapeTeacherPhoto(photoKey)) return "scale-[1.2] object-center";
  if (photoKey === "erik") return "scale-100 object-[center_30%]";
  return "scale-100 object-[center_28%]";
}
