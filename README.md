# AI Chat Application

A modern, full-stack chat application built with Next.js 14, tRPC, and Supabase that allows users to interact with multiple AI models.

## 🚀 Features

### Core Features
- ✅ **Authentication**: Email/password signup and login with Supabase Auth
- ✅ **Model Selection**: Choose from multiple AI models (GPT-4o, GPT-3.5-turbo, etc.)
- ✅ **Real-time Chat**: Send messages and receive AI responses
- ✅ **Message History**: Persistent chat history stored in Supabase
- ✅ **Loading States**: Visual feedback with typing indicators and spinners
- ✅ **Error Handling**: Graceful error states and user feedback
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive Design**: Mobile-friendly UI that works on all screen sizes

### Stretch Goals Implemented
- ✅ **Message Deletion**: Users can delete their messages
- ✅ **Dark/Light Theme Toggle**: Persistent theme selection
- ✅ **Mobile-Responsive**: Fully responsive layout with stacked mobile design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: tRPC for type-safe APIs
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI API (with stub fallback)
- **State Management**: TanStack Query (React Query)

## 📋 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)
- OpenAI API key (optional - will use stub responses without it)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd job_assesment
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase-schema.sql` and run it
4. This will create the necessary tables and seed data

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required: Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: OpenAI API (will use stub responses if not provided)
OPENAI_API_KEY=your_openai_api_key_here
```

**Where to find Supabase credentials:**
- Go to your Supabase project dashboard
- Click on the ⚙️ **Settings** icon
- Navigate to **API** section
- Copy the `Project URL` and `anon public` key

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How It Works

### AI API Integration

The app supports two modes:

1. **With OpenAI API Key**: 
   - Add your `OPENAI_API_KEY` to `.env.local`
   - The app will make real API calls to OpenAI models
   - Supports GPT-4o, GPT-4o-mini, GPT-3.5-turbo

2. **Without API Key (Stub Mode)**:
   - Leave `OPENAI_API_KEY` empty or omit it
   - The app will return echo responses: `"[model] stub: You said: {your message}"`
   - Perfect for testing the UI and functionality without API costs

The stub implementation is in `server/routers/chat.ts`:

```typescript
if (openai) {
  // Call real OpenAI API
} else {
  // Return stub response
  aiResponse = `[${input.modelTag} stub] You said: "${input.prompt}"`;
}
```

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages (login, signup)
│   ├── chat/            # Main chat interface
│   ├── api/trpc/        # tRPC API route handler
│   └── layout.tsx       # Root layout with providers
├── components/
│   ├── chat/            # Chat-specific components
│   │   ├── message-bubble.tsx
│   │   ├── typing-indicator.tsx
│   │   ├── model-selector.tsx
│   │   └── chat-input.tsx
│   ├── ui/              # Reusable UI components
│   └── theme-toggle.tsx
├── lib/
│   ├── supabase/        # Supabase client configuration
│   ├── trpc/            # tRPC client and provider
│   └── theme-provider.tsx
├── server/
│   ├── routers/         # tRPC router definitions
│   │   ├── models.ts    # Model management
│   │   ├── chat.ts      # Chat functionality
│   │   └── _app.ts      # Main router
│   └── trpc.ts          # tRPC setup and context
├── types/
│   └── database.ts      # TypeScript types for DB models
└── supabase-schema.sql  # Database schema and seed data
```

## 🔐 Database Schema

The app uses three main tables:

1. **auth.users** - Managed by Supabase Auth
2. **models** - Stores available AI models (GPT-4o, GPT-3.5-turbo, etc.)
3. **messages** - Stores chat history with user_id, model_tag, role, and content

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## 🎨 UI/UX Features

- **Modern Design**: Clean, minimal interface with smooth transitions
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Message Bubbles**: Distinct styling for user and AI messages
- **Timestamps**: Each message shows when it was sent
- **Scroll Behavior**: Auto-scrolls to the latest message
- **Loading States**: Typing indicator when AI is "thinking"
- **Error Handling**: Clear error messages for failed operations
- **Theme Persistence**: Dark/light mode preference saved to localStorage

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional)

## 🧪 Testing Locally

1. **Test Authentication:**
   - Sign up with a new email
   - Log out and log back in
   - Verify session persists across refreshes

2. **Test Chat:**
   - Select different AI models
   - Send messages and verify responses
   - Test with and without OpenAI API key

3. **Test Features:**
   - Toggle dark/light mode
   - Delete messages
   - Try on mobile device or responsive mode

## 📝 Development Notes

### Code Organization

The project follows a feature-based organization:
- Authentication logic in `app/(auth)/`
- Chat features in `components/chat/`
- Server logic isolated in `server/`
- Type-safe API with tRPC throughout

### Key Design Decisions

1. **tRPC over REST**: Type-safe APIs with automatic TypeScript types
2. **Row Level Security**: Database-level security for user data
3. **Server/Client Split**: Clear separation with Supabase SSR
4. **Stub Mode**: Development-friendly without requiring API keys
5. **Component Library**: shadcn/ui for consistent, accessible components

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

---

Built with ❤️ using Next.js, tRPC, and Supabase
