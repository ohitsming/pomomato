# Pomomato

A lightweight, customizable Pomodoro timer built with **Next.js** and powered by **AWS Cloud Services**.

## Overview

Pomomato helps you stay focused using the Pomodoro Technique—alternating work sessions with short breaks. Ideal for boosting productivity with a clean, intuitive interface.

## Features

* Customizable focus and break durations  
* Session cycles support (focus + short breaks + long break)  
* Audio or desktop notifications (enable via settings)  
* Session history tracking (optional/if implemented)  
* Cross-platform compatibility (macOS, Windows, Linux)

## Tech Stack

* **Frontend**: Next.js  

### Backend
* **AppSync**: AWS-managed GraphQL API layer  
* **Cognito**: User authentication and authorization  

### Services
* **DynamoDB**: NoSQL database for storing user and session data  
* **AWS Amplify**: CI/CD, deployment, and hosting platform  

## Installation

### Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/ohitsming/pomomato.git
   cd pomomato
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or yarn:
   ```bash
   yarn
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

### Build for Production

```bash
npm run build
```


## Usage

Pomomato combines effective time management with focused note-taking, supported by smart summarization. The core experience centers on:

* Using the **Pomodoro Timer** on the main screen to structure your work into focus sessions and breaks  
* Taking **real-time notes in the side panel** during each Pomodoro session, allowing you to capture thoughts, progress, or ideas while you work  
* After each session, notes are **automatically summarized using the OpenAI API**, helping you retain key takeaways without manual effort  

The side panel is designed to be a powerful yet lightweight writing space. With integrated summarization, Pomomato becomes a personal productivity assistant that helps you work smarter, not just harder.

## Notes / Roadmap

* Basic Pomodoro cycles  
* Integrated side panel for real-time note-taking during sessions  
* AI-powered summarization of notes using OpenAI API  
* Add optional session logging and export capabilities (e.g. Markdown, PDF)  
* Customizable themes and UI layout preferences  
* Mini/tray mode for quick access and background running  
* Optional timer presets and user-defined intervals  
* Sync notes and summaries with cloud storage or user profile  

