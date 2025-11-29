# SnapRead – AI Article Summarizer (Chrome Extension)

SnapRead is a Chrome Extension that summarizes online articles using the Google Gemini API.
It extracts content directly from the webpage and generates short, detailed, or bullet-point summaries
inside a clean, Material-inspired popup UI.

<img width="393" height="452" alt="Screenshot 2025-11-29 214152" src="https://github.com/user-attachments/assets/fae57e79-e6fc-4b5d-b4f2-a38c3474478f" />
<img width="384" height="447" alt="Screenshot 2025-11-29 214229" src="https://github.com/user-attachments/assets/4dee7e7d-86aa-4dab-accb-14817ee5c8bb" />
<img width="1906" height="388" alt="Screenshot 2025-11-29 220207000" src="https://github.com/user-attachments/assets/e959df04-5d35-4c07-a4df-dcb31e8c7f51" />
<img width="1920" height="1080" alt="Screenshot 2025-11-29 214314" src="https://github.com/user-attachments/assets/d0ca39f8-ead3-4455-92ee-3321a5ae12fc" />
<img width="385" height="527" alt="Screenshot 2025-11-29 214251" src="https://github.com/user-attachments/assets/6fba1fe6-777d-492d-acc7-88f17934c93d" />

https://github.com/user-attachments/assets/66a6b5e2-db54-4711-87b7-ba13b5ad8b4b

## Features
- Summarize any article directly from the active tab
- Short / Detailed / Bullet-point summaries
- Clean Material UI
- Reliable DOM extraction using content scripts
- Secure API key handling (chrome.storage.sync)
- Fast responses using Gemini Flash model

## Tech Stack
- HTML, CSS, JavaScript (ES6+)
- Chrome Extensions (Manifest V3)
- Content Scripts & Message Passing
- Background Service Workers
- Chrome Storage API
- Google Gemini API (Generative Language)

## Installation
1. Clone the repository:
   git clone https://github.com/yourusername/snapread.git

2. Open Chrome → chrome://extensions/

3. Enable Developer Mode

4. Click "Load unpacked"

5. Select the project folder

6. Open the Options page and add your Gemini API Key

## How It Works
1. Content script extracts article text from the webpage.
2. Popup sends the text to Gemini API through fetch().
3. Gemini returns a short, detailed, or bullet-point summary.
4. Summary is displayed in the popup with copy functionality.

## Get a Gemini API Key
Get your free API key from:
https://makersuite.google.com/app/apikey

Add it inside the Options page of the extension.

## Future Improvements
- Additional summary formats
- Better DOM extraction logic
- Multi-provider support
- Chrome Web Store publishing

