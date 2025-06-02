# taskOS

**taskOS** is a secure, real-time task management system built with Next.js, Redux Toolkit, and styled-components.

---

## 🚀 Features

- **Secure authentication** with data encryption
- **Real-time task board** with organized workflow
- **Responsive UI** built with styled-components
- **Integration** with `next/navigation` and Lottie animations

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v20 or higher recommended)
- **Yarn** (or npm)

---

## Installation

### Clone the repository
```
git clone https://github.com/yourusername/taskos.git
cd taskos
```

---
#### Install dependencies
```
yarn install
```

---

Running the App

### Start the development server
```
yarn dev
```

The app will be running at http://localhost:3000.

---
### Project Structure

```
src/
  ├── app/               # Next.js pages and app logic
  ├── components/        # Reusable UI components
  ├── features/          # Redux slices and feature-specific logic
  ├── store/             # Redux store setup
  ├── utils/             # Utility functions (e.g., encryption)
  ├── assets/            # Images and Lottie animations
  └── styles/            # Global styles
  ```

---
### Notes
	•	The app uses mock APIs (like https://reqres.in/api/login) for authentication and validation.
	•	Encryption is handled with Web Crypto API to protect sensitive data.
