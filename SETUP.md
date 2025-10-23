# Quick Setup Guide

Follow these steps to get the AI Chat app running in **3 commands or less**:

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create a `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_key_optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note**: OpenRouter API key is optional. Without it, the app uses stub responses.

## Step 3: Set Up Database

1. Go to your Supabase project → SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL script

## Step 4: Run the App

```bash
npm run dev
```

That's it! Open [http://localhost:3000](http://localhost:3000) and start chatting.

---

## Getting Supabase Credentials

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Getting OpenRouter API Key (Optional)

1. Go to [openrouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Navigate to [Keys](https://openrouter.ai/keys)
4. Generate a new API key
5. Add it to your `.env.local` as `OPENROUTER_API_KEY`

**Why OpenRouter?**
- Access to 100+ AI models (OpenAI, Claude, Gemini, Llama, etc.)
- Pay-as-you-go pricing
- Free credits for new users
- No need for multiple API keys

## Testing Without OpenRouter API Key

The app works perfectly without an OpenRouter API key! It will return echo responses like:

```
[openai/gpt-4o-mini stub] You said: "Hello!"
```

This is great for:
- Testing the UI
- Demoing the app
- Avoiding API costs during development

