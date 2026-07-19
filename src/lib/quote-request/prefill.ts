import { cityCoefficients, finishCoefficients, projectRates } from "@/lib/estimate";
import { createQuoteDraft } from "./defaults";
import type { QuoteDraft } from "./types";
import type { Trade } from "./constants";

const PROJECT_MAPPING: Record<keyof typeof projectRates, { type: string; trade: Trade }> = {
  renovation: { type: "full_renovation", trade: "renovation" }, construction: { type: "new_construction", trade: "construction" },
  peinture: { type: "partial_renovation", trade: "painting" }, plomberie: { type: "repair", trade: "plumbing" },
  electricite: { type: "partial_renovation", trade: "electrical" }, carrelage: { type: "partial_renovation", trade: "tiling" },
  cuisine: { type: "partial_renovation", trade: "kitchen" }, bain: { type: "partial_renovation", trade: "bathroom" },
  climatisation: { type: "installation_replacement", trade: "air_conditioning" }, solaire: { type: "installation_replacement", trade: "solar" },
};
const FINISH_MAPPING: Record<keyof typeof finishCoefficients, string> = { economique: "economy", standard: "standard", premium: "premium" };
export type QuotePrefill = { projectType?: string; primaryTrade?: Trade; city?: string; area?: string; finishLevel?: string };

export function parseQuotePrefill(search: string): QuotePrefill {
  const params = new URLSearchParams(search); const project = params.get("project") ?? ""; const city = params.get("city") ?? ""; const finish = params.get("finish") ?? ""; const area = Number(params.get("area"));
  const mapped = project in PROJECT_MAPPING ? PROJECT_MAPPING[project as keyof typeof PROJECT_MAPPING] : undefined;
  return { ...(mapped ? { projectType: mapped.type, primaryTrade: mapped.trade } : {}), ...(city in cityCoefficients ? { city } : {}), ...(Number.isFinite(area) && area >= 1 && area <= 10000 ? { area: String(area) } : {}), ...(finish in FINISH_MAPPING ? { finishLevel: FINISH_MAPPING[finish as keyof typeof FINISH_MAPPING] } : {}) };
}

export function draftWithPrefill(prefill: QuotePrefill, current: QuoteDraft = createQuoteDraft()): QuoteDraft {
  return { ...current, project: { ...current.project, type: current.project.type || prefill.projectType || "" }, property: { ...current.property, area: current.property.area || prefill.area || "" }, trades: { ...current.trades, primary: current.trades.primary || prefill.primaryTrade || "" }, finishes: { ...current.finishes, level: current.finishes.level || prefill.finishLevel || "" }, location: { ...current.location, city: current.location.city || prefill.city || "" } };
}
