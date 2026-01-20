# PlayTune Studio Automation

This project includes scripts to automate the promotion of PlayTune Studio (b4iborn.com) on X (formerly Twitter).

## Features
- **Trend Discovery**: Scrapes trends24.in for top trends in India.
- **Content Matching**: identifying if any trends are music-related.
- **Automated Posting**: Posts a promotional tweet if a match is fine.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally (Dry Run)**:
    ```bash
    export DRY_RUN=true
    npm run promote
    ```

## GitHub Actions Automation

The workflow `.github/workflows/daily_promote.yml` is configured to run twice daily.

### Required Secrets
Go to your GitHub Repository -> Settings -> Secrets and variables -> Actions -> **New repository secret**.

You must set **ONE** of the following sets of credentials:

#### Option A: Twitter API (Recommended, Stable)
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`

#### Option B: Browser Automation (Fallback, Riskier)
- `X_USERNAME`
- `X_PASSWORD`
- `X_EMAIL` (Optional, for verification challenges)

## Manual Trigger
You can also manually trigger the "Daily Music Promotion to X" workflow from the "Actions" tab in GitHub to test it immediately.
