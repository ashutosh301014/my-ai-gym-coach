# AI Gym Coach — setup and deployment

Source: https://github.com/shradha-khapra/ai-gym-coach
Source commit: 6fe189713db45da95d23709655b85cf5dd30c872

The original code, branding and author links are retained. No LICENSE file was
present in this snapshot; this package does not grant a new license.
Use a GitHub fork to retain provenance; confirm the author's terms for reuse.

## Deploy from your GitHub account

1. Fork the original repository into your GitHub account.
2. Extract this ZIP and copy the contents of its ai-gym-coach folder over
   your fork's local checkout. Commit and push the changes.
3. Open https://share.streamlit.io and create an app from your fork.
4. Select your branch and entrypoint: Main App/main.py
5. In Advanced settings choose Python 3.11, then add this secret:
   GROQ_API_KEY = "your-own-key"
6. Deploy and allow camera access. Start a workout, then start the video.
   The Python backend requires Streamlit hosting; GitHub Pages can host
   only the separate static landing page.

## Run on Windows

Install Python 3.11 first (the old MediaPipe pin is not suitable for Python 3.14/3.15).
Open a terminal in the extracted ai-gym-coach folder:

    py -3.11 -m venv .venv
    .venv\Scripts\python -m pip install -r "Main App/requirements.txt"

Copy .streamlit/secrets.toml.example to .streamlit/secrets.toml and add your key.
Never commit the real secrets file.

    .venv\Scripts\python -m streamlit run "Main App/main.py"

Without a Groq key the app attempts to continue without voice coaching.
Groq and Google text-to-speech require network access.

## Landing page

LandingPage/index.html is separate from the working Python app.
Replace its existing Streamlit app link with your deployed URL.
Its referenced IMGs/i1.png through i6.png and videos/video.mp4 are absent from
the source snapshot, so add your own media before publishing this page.
Original author/social links are retained; review them before publishing.

## Scope and limitations

- Fixed CSS, font and model paths to resolve relative to source files.
- Added secret exclusions and an example secrets file.
- Python syntax validated; no dependency installation, live cloud deployment,
  webcam session or external API calls were validated.
- Username-only access is demo identification, not secure authentication:
  someone using the same username can access that user's history.
- SQLite history is local to the app and is not durable cloud storage.
- Camera use requires HTTPS or localhost. Restricted networks may require
  a TURN relay; the original app only configures STUN.
- Original dependency pins are preserved. If cloud installation fails, inspect
  build logs, especially MediaPipe/OpenCV and OS package compatibility.
