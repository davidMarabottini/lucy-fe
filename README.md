# Spam Detector – Frontend Application

Frontend application for detecting spam emails and SMS messages, built with **React** and **TypeScript** and integrated with a machine learning backend.

The application consumes a REST API that performs text classification using **Naive Bayes models** and returns real-time predictions.

🔗 Backend repository:  
https://github.com/davidMarabottini/bayes_spam_detector

---

## 🧠 Project Overview

This project started as a personal experiment to explore machine learning model integration and evolved into a structured, production-oriented frontend application.

The main goal of this repository is to showcase **frontend architecture, API integration, testing strategy, and UX considerations** when consuming an ML-powered service.

The project is intentionally designed with scalability and maintainability in mind, despite being at an early stage.

---

## ⚙️ Main Features

- Spam detection for email and SMS text
- Real-time prediction feedback
- Clear visualization of classification results
- API-driven architecture
- Authentication-ready frontend (OAuth-based)
- Protected routes for authenticated users

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- SCSS
- TanStack Query (server-state management)
- Axios
- i18n (internationalization setup)

### Quality & Tooling
- Unit testing
- Storybook for component-driven development
- Modular and scalable component architecture

### Backend (external)
- Flask REST API
- Naive Bayes models
- Scikit-learn

---

## 🔐 Authentication & Authorization

The frontend integrates an authentication flow based on backend-managed sessions (HTTP-only cookies).

Key points:
- Authentication state is fetched via a `/me` endpoint
- Session validity is enforced by the backend
- Protected routes are implemented at UI level for UX purposes
- Security is intentionally backend-driven

> Note: frontend route protection is meant for user experience, not as a security mechanism.

---

## 🧪 Testing Strategy

Even though this project is at an early stage, a basic unit test coverage is already in place to ensure reliability of core components.

Covered areas:
* Atomic UI components (atoms, molecules, organisms)
* Utility functions

The project is also Storybook-ready, currently including Button and Card components, allowing isolated component development, visual documentation, and easier testing of UI elements.

The excluded parts are still evolving and will be progressively covered as the application matures, maintaining a scalable and maintainable frontend architecture.

---

## 🚀 Local Development & Installation Guide

Follow these steps to run the frontend locally:

### Prerequisites
- Node.js >= 18
- Python >= 3.11
- Virtual environment recommended

### Backend Installation
Clone the backend repo:

```bash
git clone https://github.com/davidMarabottini/bayes_spam_detector.git
cd bayes_spam_detector
```
Follow the instruction on README.md in the backend

open another terminal and start the frontend installation:

### Frontend Installation
1. Clone the repository:
```bash
git clone https://github.com/davidMarabottini/fe-spam-detector.git
cd fe-spam-detector
```

2. Install dependencies:
```
npm install
```

Create a .env file in the root
```bash
VITE_API_URL=http://localhost:5000
```
4. Start the development server:
```bash
npm run dev
```
5. Open the app in your browser http://localhost:5173

## watch storybook
npm run storybook

---

## launching test
1. launching single test:
npm run test
2. launching test in watch mode
npm run test:watch
3. launching test with coverage
npm run test:coverage

---

## Notes
This project is under active development and represents an evolving codebase rather than a finished product.
