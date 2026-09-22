// Recent saves from Curius, fetched at build time (static export), so the
// page ships with them inline. The deploy workflow rebuilds daily.
const CURIUS_USER_ID = 4694; // timothy-kostolansky
export const CURIUS_PROFILE = "https://curius.app/timothy-kostolansky";

export type CuriusSave = { title: string; link: string; date: string };

export async function recentCuriusSaves(n = 3): Promise<CuriusSave[]> {
  try {
    const res = await fetch(`https://curius.app/api/users/${CURIUS_USER_ID}/links?page=0`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      userSaved?: { title?: string; link?: string; createdDate?: string }[];
    };
    return (data.userSaved ?? [])
      .filter((s) => s.title && s.link)
      .sort((a, b) => Date.parse(b.createdDate ?? "") - Date.parse(a.createdDate ?? ""))
      .slice(0, n)
      .map((s) => ({ title: s.title!, link: s.link!, date: s.createdDate ?? "" }));
  } catch {
    return [];
  }
}
