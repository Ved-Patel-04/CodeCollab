# CodeCollab

CodeCollab is a cutting-edge real-time collaborative coding platform designed specifically for Python developers. It enables multiple users to simultaneously edit Python code in a shared environment, paired with integrated real-time chat functionality to facilitate seamless collaboration and communication. Featuring Google OAuth authentication and customizable avatars, CodeCollab leverages modern frontend React architecture combined with Firebase backend services to provide a responsive and intuitive user experience.

---

## Features

- **Real-time Collaborative Python Editor**  
  Users can concurrently edit the same Python code, with every change instantly synced across all connected clients via Firebase Realtime Database.

- **Integrated Real-time Chat**  
  Communicate with collaborators instantly within the same interface using the built-in chatbox powered by Firebase.

- **User Authentication**  
  Secure authentication through Google OAuth, with fallback guest access to ensure flexibility in onboarding.

- **Customizable Avatars and Usernames**  
  Personalize your identity by choosing from a selection of avatars and setting a unique username.

- **Responsive and Modern UI**  
  Developed using React functional components and hooks, ensuring a fast and fluid user experience across devices.

---

## Technologies Used

- **Frontend:** React.js, React Hooks, CSS Modules  
- **Backend:** Firebase Realtime Database, Firebase Authentication (Google OAuth)  
- **Real-time Data Sync:** Firebase SDK for seamless multi-user collaboration  
- **State Management:** React Context and useState for efficient UI state handling  
- **Routing:** React Router for future scalability and navigation  

---

## Architecture Overview

1. **Authentication Layer**  
   Users authenticate via Google OAuth or opt for guest access. Authentication state is maintained by Firebase Authentication.

2. **User Profile Setup**  
   After signing in, users select an avatar and username, which are stored in Firebase Realtime Database to represent user identity in the collaboration space.

3. **Collaborative Code Editor**  
   A shared Python code editor component listens and pushes code changes in real time to Firebase, ensuring all participants view the latest updates simultaneously.

4. **Chat Module**  
   Chat messages are saved in Firebase and instantly broadcasted to all collaborators, enabling real-time conversation alongside coding.

5. **Future Room Management**  
   Planned support for multiple isolated collaboration rooms, allowing separate coding sessions to run concurrently.

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)  
- npm or yarn package manager  
- Firebase account with a project configured for Realtime Database and Authentication

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/codecollab.git
cd codecollab
