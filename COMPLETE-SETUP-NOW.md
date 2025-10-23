# 🚨 IMPORTANT: Complete Setup Steps

## Issue: Models Not Displaying

This happens because the app needs your Supabase credentials to fetch data from the database.

## Fix: Follow These Steps IN ORDER

### Step 1: Create Supabase Project (5 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New project"**
3. Sign up with GitHub or email
4. Create a new project:
   - **Name**: ai-chat-app (or any name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - Click **"Create new project"**
5. Wait 2-3 minutes for project to be ready

### Step 2: Set Up Database (2 minutes)

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase-schema.sql` in your project
4. Copy ALL the contents (Ctrl+A, Ctrl+C)
5. Paste into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: **"Success. No rows returned"**

This creates:
- ✅ Models table with 7 AI models
- ✅ Messages table for chat history
- ✅ Proper security with Row Level Security

### Step 3: Get Your API Credentials (1 minute)

1. In Supabase, click **Settings** (gear icon) at the bottom left
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon public** key: A long string starting with `eyJ...`
4. **Keep this page open** - you'll need these values

### Step 4: Create Environment File (1 minute)

1. In your project root folder, create a new file called `.env.local`
2. Add these lines (replace with YOUR actual values from Step 3):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-long-key-here

# Optional: OpenRouter API (leave empty for now - we'll use stub mode)
OPENROUTER_API_KEY=

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**IMPORTANT**: 
- Replace `https://xxxxx.supabase.co` with YOUR Project URL
- Replace the anon key with YOUR actual anon public key
- Don't add quotes around the values
- Save the file

### Step 5: Restart Development Server (30 seconds)

1. Go to your terminal where `npm run dev` is running
2. Press `Ctrl+C` to stop the server
3. Run again:
   ```bash
   npm run dev
   ```
4. Wait for it to say "Ready in X.Xs"

### Step 6: Test the App (2 minutes)

1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. You should be redirected to `/login`
3. Click **"Sign up"** 
4. Enter your email and password
5. Click **"Sign Up"**
6. You'll be redirected to `/chat`
7. **YOU SHOULD NOW SEE 7 MODELS IN THE DROPDOWN!** 🎉

Models you'll see:
- GPT-4o
- GPT-4o Mini
- GPT-3.5 Turbo
- Claude 3.5 Sonnet
- Claude 3 Opus
- Gemini Pro
- Llama 3.1 70B

### Step 7: Test Chat (1 minute)

1. Select a model from the dropdown (e.g., "GPT-4o Mini")
2. Type a message: "Hello!"
3. Press Enter or click Send
4. You should see a response like:
   ```
   [openai/gpt-4o-mini stub] You said: "Hello!"
   ```

This is **NORMAL**! We're in **stub mode** because you don't have an OpenRouter API key yet.

---

## Still Not Working? Check These:

### Issue: "Invalid Supabase URL"
- ❌ **Wrong**: `NEXT_PUBLIC_SUPABASE_URL="https://..."`
- ✅ **Correct**: `NEXT_PUBLIC_SUPABASE_URL=https://...` (no quotes)

### Issue: "Failed to fetch models"
- Did you run the SQL script in Supabase SQL Editor?
- Check in Supabase: **Table Editor** → should see `models` and `messages` tables
- Check the `models` table has 7 rows of data

### Issue: Still seeing loading spinner
- Check browser console (F12) for errors
- Check your `.env.local` file is in the project root (same folder as `package.json`)
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Issue: "Unauthorized" or "Authentication error"
- Clear browser cookies: F12 → Application → Cookies → Clear all
- Try signing up again with a different email

---

## Optional: Get Real AI Responses (5 minutes)

If you want REAL AI responses instead of stub mode:

1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Click **"Sign In"** (use Google or GitHub)
3. Go to **"Keys"** in the sidebar
4. Click **"Create Key"**
5. Name it "AI Chat App"
6. Copy the key (starts with `sk-or-v1-...`)
7. Add to your `.env.local`:
   ```bash
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```
8. Restart dev server: `Ctrl+C` then `npm run dev`
9. Now you'll get REAL AI responses! 🤖

---

## Quick Debug Checklist

Before asking for help, verify:

- [ ] Created Supabase project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Created `.env.local` file with correct values
- [ ] No quotes around environment variable values
- [ ] Restarted dev server after creating `.env.local`
- [ ] Can access http://localhost:3000
- [ ] Can sign up successfully
- [ ] Can see the chat page

---

## Need More Help?

If models still don't show:

1. Take a screenshot of your browser console (F12 → Console tab)
2. Take a screenshot of your Supabase Table Editor showing the `models` table
3. Share your `.env.local` file (REMOVE the actual keys first!)
4. Share any error messages from the terminal

---

**Once you complete ALL steps above, the models WILL appear!** 🎉

The issue is almost always one of:
1. Missing `.env.local` file
2. Wrong Supabase credentials
3. Didn't run the SQL script
4. Didn't restart the dev server

Follow the steps carefully and you'll be chatting with AI in 10 minutes! 🚀

