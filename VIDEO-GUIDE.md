# Video Recording Guide (Loom)

## What to Include in Your 3-5 Minute Loom Video

### 1. Introduction (30 seconds)
- "Hi, I'm [your name], and I built this AI Chat application"
- Brief overview: "It's a full-stack Next.js app with tRPC, Supabase, and OpenAI integration"
- Show the deployed app or running locally

### 2. Demo the Application (2 minutes)

**Authentication:**
- Show the signup page
- Create a new account or login
- Explain: "Using Supabase Auth for secure authentication"

**Chat Interface:**
- Show the model selector: "Users can choose from multiple AI models"
- Send a few messages
- Point out:
  - Message bubbles with distinct user/AI styling
  - Timestamps on messages
  - Typing indicator when waiting for response
  - Dark mode toggle

**Features:**
- Delete a message: "Users can delete their own messages"
- Switch between models
- Show mobile responsive view (resize browser or use dev tools)
- Toggle dark/light theme

### 3. Code Walkthrough (2 minutes)

**Project Structure:**
```
job_assesment/
├── app/           # Next.js pages & API routes
├── components/    # Reusable UI components
├── lib/           # Supabase & tRPC clients
├── server/        # tRPC routers & API logic
```

**Key Files to Show:**

1. **`server/routers/chat.ts`** (30 sec)
   - Highlight the chat.send mutation
   - Show the stub implementation:
   ```typescript
   if (openai) {
     // Real API call
   } else {
     // Stub: "You said: {prompt}"
   }
   ```
   - Explain: "Works with or without OpenAI API key"

2. **`app/chat/page.tsx`** (30 sec)
   - Show the tRPC hooks usage
   - Point out type safety
   - Explain: "Full TypeScript safety from client to server"

3. **`supabase-schema.sql`** (20 sec)
   - Show the database schema
   - Highlight Row Level Security
   - Explain: "Users can only see their own messages"

4. **`components/chat/`** (30 sec)
   - Quick tour of modular components
   - Explain organization: "Feature-based component structure"

### 4. Technical Decisions (1 minute)

**Why tRPC?**
- "End-to-end type safety without code generation"
- "Catch errors at compile time, not runtime"

**Why Supabase?**
- "PostgreSQL with built-in auth and RLS"
- "No need to write auth logic from scratch"

**Stub Implementation:**
- "Can demo the app without API costs"
- Show in code: the if/else for API key check

**Stretch Goals Completed:**
- Dark mode toggle ✓
- Message deletion ✓
- Mobile responsive ✓

### 5. Wrap Up (30 seconds)
- "Setup is simple: 3 commands in the README"
- "All requirements met plus stretch goals"
- "Clean code structure, fully typed, production-ready"
- Thank you!

## Recording Tips

1. **Clean Your Desktop**: Close unnecessary tabs/apps
2. **Test Audio**: Do a quick test recording
3. **Use Loom Chrome Extension**: Easy to record browser + webcam
4. **Practice Once**: Do a quick run-through before recording
5. **Stay Focused**: 3-5 minutes goes fast, stick to the script
6. **Show, Don't Tell**: Demonstrate features instead of just talking about them

## Screen Layout Suggestions

- **Primary Screen**: Browser with your app
- **Picture-in-Picture**: Your face (small corner)
- **Code Editor**: VS Code or Cursor for code walkthrough
- **Switch Smoothly**: Use keyboard shortcuts to switch between browser and code

## What NOT to Include

- ❌ Installing dependencies in real-time
- ❌ Debugging or fixing issues
- ❌ Reading through all the code line by line
- ❌ Long explanations of basic concepts
- ❌ Apologizing for anything

## Example Script Outline

```
[Show app running]
"Hi, I'm [name]. This is an AI Chat app I built with Next.js, tRPC, and Supabase."

[Sign up]
"Let me create an account... and we're in."

[Select model]
"I can choose from different AI models..."

[Send messages]
"Send a message... see the typing indicator... and the response."

[Show features]
"Dark mode works... mobile responsive... can delete messages..."

[Switch to code]
"Quick code tour: tRPC routers here... chat page here... 
and here's the stub implementation that works without an API key."

[Back to app]
"Everything is type-safe, fully tested, and ready to deploy. Thanks!"
```

## After Recording

1. **Trim**: Remove any dead air at start/end
2. **Test the Link**: Make sure it's publicly accessible
3. **Add to README**: Include the Loom link in your repository
4. **Share**: Send the link with your submission

---

Good luck! Keep it concise, confident, and show your best work! 🎥

