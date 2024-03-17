# Aiducation Installation Guide

## Introduction

Aiducation is a pioneering web platform revolutionizing learning and collaboration. With customizable Hubs and Channels, users can create dedicated spaces for discussions and collaborations. The Chat Summarizer condenses conversations for efficient knowledge retention, In chat Q/A allowing users to ask questions based on chat. Ask Anything provides timely responses using AI, fostering seamless learning. Additionally, Aiducation offers audio/video calls, an integrated code editor, educational games, and a song player, catering to diverse learning needs. Aiducation redefines education as a dynamic, interactive experience, promoting productivity, creativity, and well-being. Join us on Aiducation to embark on a transformative journey where innovation meets education.

## Prerequisites

To set up a Next.js web application, you'll need to ensure you have the following prerequisites installed:

1. **Node.js**: Next.js is built on top of Node.js, so you need to have Node.js installed on your machine. You can download and install Node.js from the [official website](https://nodejs.org/en).

2. **Text Editor or IDE**: You need a text editor or an integrated development environment (IDE) to write your code. Popular choices include Visual Studio Code, Sublime Text, Atom, or WebStorm.

# Installation Steps

## Step 1: Clone the Repository

Clone the project repository from the version control system (e.g., GitHub).

```bash
# Open your terminal or command prompt
cd path/to/destination/directory
git clone [repository_url]
cd [project_directory]
```

Replace path/to/destination/directory with the actual path to the directory where you want to clone the repository and [repository_url] with the actual URL of the project repository.

## Step 2: Install Dependencies
Run the following command in the terminal:
```bash
npm install
```
## Step 3: Configuration
Configure the following environment variables:

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
            Clerk website link :https://clerk.com/docs/quickstarts/nextjs




# Database Configuration
```bash
DATABASE_URL=
```
                Link: https://www.postgresql.org/download/

### UploadThing Configuration
```bash
UPLOADTHING_SECRET= 

UPLOADTHING_APP_ID=
```
              Link: https://docs.uploadthing.com/getting-started/appdir

### LiveKit Configuration
```bash
LIVEKIT_API_KEY=

LIVEKIT_API_SECRET=

NEXT_PUBLIC_LIVEKIT_URL=
```
           Website link : https://docs.uploadthing.com/getting-started/appdir

### Eden AI Configuration
```bash
EDEN_AI_KEY=
```
### OpenAI Configuration
```bash
OPENAI_KEY=
```
### Spotify Api Configuration
```bash
SPOTIFY_KEY=
```
### Weather Api Configuration
```bash
OPEN_WEATHER_KEY=
```
### MapBox Api Configuration
```bash
MAPBOX_ASCESS_KEY=
MAPBOX_ASCESS_TOKEN=
```
Website link:https://www.mapbox.com/


### Application URL
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Run the Project
Run the following commands in the terminal:
```bash
npx prisma init
npx prisma generate
npx prisma db push
npm install @lordicon/element lottie-web
npm run dev
```
And there you go...
