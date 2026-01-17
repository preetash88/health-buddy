const express = require("express");
const {
    analyzeSymptomsWithGemini,
} = require("../services/geminiService");

const router = express.Router();

/* ======================================================
   INPUT VALIDATION (70% RULE)
   ====================================================== */

/**
 * Checks if input text is "valid enough" to call Gemini.
 * - Allows minor spelling mistakes
 * - Blocks gibberish, symbols, emojis, spam
 * - Requires ~70% meaningful words
 */
function isTextValidEnough(text, maxInvalidRatio = 0.4) {
    if (!text) return false;

    const cleaned = text
        .toLowerCase()
        .replace(/[^a-z\s]/g, " ")
        .trim();

    const words = cleaned.split(/\s+/).filter(Boolean);

    // Too short to judge meaningfully
    if (words.length < 3) return false;

    let validWords = 0;
    let invalidWords = 0;

    for (const word of words) {
        // Reject very short noise
        if (word.length < 3) {
            invalidWords++;
            continue;
        }

        // Reject repeated-character garbage (aaaaa, sssss)
        if (/^(.)\1{3,}$/.test(word)) {
            invalidWords++;
            continue;
        }

        // Reject random consonant clusters (very common gibberish)
        if (!/[aeiou]/.test(word)) {
            invalidWords++;
            continue;
        }

        // Otherwise treat as valid (allows spelling mistakes)
        validWords++;
    }

    const total = validWords + invalidWords;
    const invalidRatio = invalidWords / total;

    console.log("🧪 Validation stats:", {
        total,
        validWords,
        invalidWords,
        invalidRatio,
    });

    // 🚫 HARD BLOCK if invalid ≥ 40%
    if (invalidRatio >= maxInvalidRatio) {
        return false;
    }

    return true;
}


/* ======================================================
   ROUTE
   ====================================================== */

router.post("/", async (req, res) => {
    try {
        const { text, locale } = req.body;
         
        console.log("➡️ Analyze request received");
        console.log("Text:", text);
        console.log("Locale:", locale);

        // Basic safety
        if (!text || typeof text !== "string") {
            console.log("❌ Invalid text");
            return res.status(400).json({ error: "Invalid input" });
        }

        // Length guard (cheap)
        if (text.trim().length < 10) {
            console.log("❌ Text too short");
            return res.status(400).json({
                error: "Input too short for analysis",
            });
        }

        // 🛑 IMPORTANT: 80% validity gate
        if (!isTextValidEnough(text, 0.4)) {
            console.log("❌ Input too unclear — Gemini not called");
            return res.status(400).json({
                error: "Input unclear",
            });
        }

        console.log("✅ Text passed validation — calling Gemini");

        // ✅ ONLY NOW Gemini is called
        const result = await analyzeSymptomsWithGemini(
            text,
            locale || "en"
        );
        
        console.log("🤖 Gemini response:", JSON.stringify(result, null, 2));

        return res.json(result);
    } catch (err) {
        console.error("🔥 Analyze route error:", err);

        return res.status(500).json({
            error: "AI analysis failed",
        });
    }
});

module.exports = router;
