document.getElementById("summarize-btn").addEventListener("click", () => {
  const result = document.getElementById("summary-box");
  const summaryType = document.getElementById("summary-type").value;

  result.textContent = "Summarizing...";
  result.classList.remove("summary-box--empty");

  // Get the user's API key from storage
  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      result.textContent =
        "Please set your Gemini API key in the settings.";
      return;
    }

    // Ask content.js for the page article text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = Array.isArray(tabs) ? tabs[0] : tabs;
      if (!tab || !tab.id) {
        result.textContent = "No active tab found.";
        return;
      }

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_ARTICLE_TEXT" },
        async (response) => {
          if (chrome.runtime.lastError) {
            result.textContent =
              "Error: " + chrome.runtime.lastError.message;
            return;
          }

          const text = response && response.text;
          if (!text) {
            result.textContent =
              "No article text found on this page.";
            return;
          }

          // send text to gemini API for summarization
          try {
            const summary = await getGeminiSummary(
              geminiApiKey,
              text,
              summaryType
            );
            result.textContent = summary;
            document.getElementById("copy-btn").disabled = false;
          } catch (error) {
            result.textContent =
              "Error generating summary: " + error.message;
            document.getElementById("copy-btn").disabled = true;
          }
        }
      );
    });
  });
});

// Copy button functionality
document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText =
    document.getElementById("summary-box").textContent;
  if (
    !summaryText ||
    summaryText ===
      "Your summary will appear here after you run SnapRead."
  ) {
    return;
  }

  navigator.clipboard
    .writeText(summaryText)
    .then(() => {
      const copyBtn = document.getElementById("copy-btn");
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
});

async function getGeminiSummary(apiKey, articleText, summaryType) {
  const promptMap = {
    short: `Provide a concise and clear summary of the following article in 2–3 sentences. Focus on the main idea and key takeaway:\n\n${articleText}`,
    medium: `Provide a detailed summary of the following article in 4–5 paragraphs. Include:
- Main topic and context
- Key points and findings
- Important details and examples
- Conclusion or implications

Article:
${articleText}`,
    bullet: `Provide a comprehensive summary of the following article as structured bullet points. Organize as follows:
- Overview (1–2 sentences about the main topic)
- Key Points (3–5 main takeaways)
- Important Details (supporting facts and examples)
- Conclusion (final thoughts or implications)

Use clear, concise bullet points for easy reading.

Article:
${articleText}`
  };

  const prompt = promptMap[summaryType] || promptMap.short;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(
      error?.message || "Failed to get summary from Gemini API"
    );
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    "No summary generated."
  );
}
