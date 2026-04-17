import type { IceSuggestion } from "../types/task";
import { isValidIceValue } from "../utils/ice";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";
const MAX_REASON_WORDS = 200;

type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiGenerateContentResponse = {
  candidates?: GeminiCandidate[];
};

type GeminiSuggestionPayload = {
  impact?: unknown;
  confidence?: unknown;
  ease?: unknown;
  reason?: unknown;
};

export class GeminiServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiServiceError";
  }
}

const countWords = (value: string): number => {
  return value.trim().split(/\s+/).filter(Boolean).length;
};

const buildPrompt = (description: string): string => {
  return [
    "Analiza la siguiente tarea y devuelve una propuesta ICE en JSON puro.",
    "Responde exclusivamente con un objeto JSON sin texto adicional.",
    'Usa exactamente esta forma: {"impact": number, "confidence": number, "ease": number, "reason": string}.',
    "impact, confidence y ease deben ser enteros entre 1 y 10.",
    `reason debe tener como maximo ${MAX_REASON_WORDS} palabras.`,
    "No uses markdown, comillas invertidas ni explicaciones fuera del JSON.",
    "Descripcion de la tarea:",
    description.trim(),
  ].join("\n");
};

const parseJsonResponse = (value: string): GeminiSuggestionPayload => {
  try {
    return JSON.parse(value) as GeminiSuggestionPayload;
  } catch {
    throw new GeminiServiceError(
      "Gemini ha devuelto una respuesta no valida. Inténtalo de nuevo.",
    );
  }
};

const assertSuggestionPayload = (
  payload: GeminiSuggestionPayload,
): IceSuggestion => {
  const { confidence, ease, impact, reason } = payload;

  if (
    typeof impact !== "number" ||
    typeof confidence !== "number" ||
    typeof ease !== "number" ||
    !Number.isInteger(impact) ||
    !Number.isInteger(confidence) ||
    !Number.isInteger(ease) ||
    !isValidIceValue(impact) ||
    !isValidIceValue(confidence) ||
    !isValidIceValue(ease)
  ) {
    throw new GeminiServiceError(
      "Gemini ha devuelto valores ICE fuera de rango o no enteros.",
    );
  }

  if (typeof reason !== "string" || !reason.trim()) {
    throw new GeminiServiceError(
      "Gemini ha devuelto una justificación vacía o inválida.",
    );
  }

  const normalizedReason = reason.trim();

  if (countWords(normalizedReason) > MAX_REASON_WORDS) {
    throw new GeminiServiceError(
      "Gemini ha devuelto una justificación demasiado larga.",
    );
  }

  return {
    impact,
    confidence,
    ease,
    reason: normalizedReason,
  };
};

const getResponseText = (response: GeminiGenerateContentResponse): string => {
  const text = response.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new GeminiServiceError(
      "Gemini no ha devuelto contenido utilizable para calcular ICE.",
    );
  }

  return text;
};

const getGeminiApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new GeminiServiceError(
      "Falta la variable VITE_GEMINI_API_KEY para usar Gemini.",
    );
  }

  return apiKey;
};

const getGeminiModel = (): string => {
  return import.meta.env.VITE_GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
};

export const getIceSuggestionFromGemini = async (
  description: string,
): Promise<IceSuggestion> => {
  const normalizedDescription = description.trim();

  if (!normalizedDescription) {
    throw new GeminiServiceError(
      "La descripción es obligatoria para consultar Gemini.",
    );
  }

  const apiKey = getGeminiApiKey();
  const model = getGeminiModel();

  const response = await fetch(
    `${GEMINI_API_URL}/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildPrompt(normalizedDescription),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    },
  ).catch(() => {
    throw new GeminiServiceError(
      "No se ha podido conectar con Gemini. Revisa tu red e inténtalo de nuevo.",
    );
  });

  if (!response.ok) {
    throw new GeminiServiceError(
      "Gemini ha rechazado la petición o ha fallado temporalmente.",
    );
  }

  const payload = (await response.json()) as GeminiGenerateContentResponse;
  const responseText = getResponseText(payload);
  const parsedPayload = parseJsonResponse(responseText);

  return assertSuggestionPayload(parsedPayload);
};
