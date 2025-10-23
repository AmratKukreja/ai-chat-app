# Testing Checklist

Use this checklist to verify everything works before submission.

## ✅ Pre-Testing Setup

### 1. Environment Variables
- [ ] Created `.env.local` file
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Optionally added `OPENAI_API_KEY` (or left empty for stub mode)

### 2. Supabase Database
- [ ] Created Supabase project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Verified tables created: models, messages
- [ ] Verified seed data in models table (4 models)

### 3. Dependencies
```bash
npm install
```
- [ ] All dependencies installed without errors
- [ ] No security vulnerabilities found

---

## ✅ Authentication Testing

### Sign Up Flow
- [ ] Navigate to `/signup`
- [ ] Enter email and password (min 6 chars)
- [ ] Click "Sign Up"
- [ ] Redirected to chat page
- [ ] User created in Supabase Auth

### Login Flow
- [ ] Log out from chat page
- [ ] Navigate to `/login`
- [ ] Enter credentials
- [ ] Click "Login"
- [ ] Redirected to chat page

### Session Persistence
- [ ] Logged in successfully
- [ ] Refresh the page
- [ ] Still logged in (not redirected to login)
- [ ] Close browser and reopen
- [ ] Still logged in

### Protected Routes
- [ ] Log out
- [ ] Try to access `/chat` directly
- [ ] Redirected to `/login`

---

## ✅ Chat Functionality Testing

### Model Selection
- [ ] Model dropdown shows all available models
- [ ] Can select different models
- [ ] Default model pre-selected

### Sending Messages
- [ ] Type a message
- [ ] Click send button (or press Enter)
- [ ] Message appears in chat as user bubble (right side)
- [ ] Typing indicator appears
- [ ] AI response appears as assistant bubble (left side)
- [ ] Both messages have timestamps

### Message History
- [ ] Send several messages
- [ ] Refresh the page
- [ ] All messages still visible
- [ ] Messages in correct order

### Different Models
- [ ] Select "GPT-4o"
- [ ] Send a message
- [ ] Select "GPT-3.5-turbo"
- [ ] Previous messages cleared (different chat)
- [ ] Send a message in new model
- [ ] Switch back to "GPT-4o"
- [ ] Previous messages for GPT-4o visible again

---

## ✅ Stub Mode Testing (No API Key)

### Without OpenAI API Key
- [ ] Removed or left `OPENAI_API_KEY` empty in `.env.local`
- [ ] Restart dev server
- [ ] Send a message
- [ ] Receive stub response: "[model-tag stub] You said: {your message}"
- [ ] No errors in console

### With OpenAI API Key
- [ ] Add valid `OPENAI_API_KEY` to `.env.local`
- [ ] Restart dev server
- [ ] Send a message
- [ ] Receive actual AI response from OpenAI
- [ ] Response is relevant to your message

---

## ✅ UI/UX Testing

### Dark Mode
- [ ] Click theme toggle in header
- [ ] UI switches to dark mode
- [ ] Refresh page
- [ ] Dark mode persists
- [ ] Toggle back to light mode
- [ ] Light mode persists

### Loading States
- [ ] Send a message
- [ ] See loading spinner or disabled input
- [ ] Typing indicator shows while waiting
- [ ] UI returns to normal after response

### Error Handling
- [ ] Disconnect internet
- [ ] Try to send a message
- [ ] See error message displayed
- [ ] Reconnect internet
- [ ] Send another message
- [ ] Works normally

### Message Deletion
- [ ] Hover over your own message
- [ ] See delete button appear
- [ ] Click delete
- [ ] Message removed from chat
- [ ] Try to hover over AI message
- [ ] No delete button (can't delete AI messages)

---

## ✅ Responsive Design Testing

### Desktop (1920x1080)
- [ ] Layout looks good
- [ ] Chat centered with max-width
- [ ] All elements visible and properly spaced

### Tablet (768x1024)
- [ ] Layout adjusts properly
- [ ] Messages readable
- [ ] Input field full width

### Mobile (375x667)
- [ ] Stacked vertical layout
- [ ] Message bubbles fit screen
- [ ] Input accessible
- [ ] Header compact
- [ ] Can scroll through messages
- [ ] Theme toggle visible and clickable

### Mobile Landscape
- [ ] Still usable
- [ ] Input visible
- [ ] Messages scrollable

---

## ✅ Code Quality Checks

### TypeScript
```bash
npm run type-check
```
- [ ] No TypeScript errors

### Linting
```bash
npm run lint
```
- [ ] No linting errors
- [ ] Or only acceptable warnings

### Build
```bash
npm run build
```
- [ ] Build succeeds without errors
- [ ] Production build works

### Production Mode
```bash
npm run build && npm start
```
- [ ] Production server starts
- [ ] App works in production mode
- [ ] No console errors

---

## ✅ Browser Testing

### Chrome
- [ ] All features work
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] No console errors

### Safari (if available)
- [ ] All features work
- [ ] No console errors

### Mobile Browser
- [ ] Chrome mobile
- [ ] Safari mobile (iOS)
- [ ] Features work on mobile

---

## ✅ Security Testing

### SQL Injection Protection
- [ ] Try entering SQL in message input: `'; DROP TABLE messages; --`
- [ ] Message saved as plain text
- [ ] No database errors

### XSS Protection
- [ ] Try entering script tag: `<script>alert('xss')</script>`
- [ ] Rendered as plain text, not executed

### Authorization
- [ ] Log in as User A
- [ ] Note a message ID from User A
- [ ] Log in as User B
- [ ] Try to access User A's messages
- [ ] User B cannot see User A's messages (RLS works)

---

## ✅ Performance Testing

### Initial Load
- [ ] Page loads in < 3 seconds
- [ ] No layout shift
- [ ] Smooth transitions

### Chat Performance
- [ ] Send 20+ messages
- [ ] Scroll is smooth
- [ ] No lag when typing
- [ ] Messages render quickly

### Network Tab
- [ ] Check Network tab in DevTools
- [ ] API calls are batched (tRPC)
- [ ] No unnecessary requests

---

## ✅ Final Verification

### GitHub Repository
- [ ] All code committed
- [ ] `.env.local` NOT committed (in .gitignore)
- [ ] README.md is comprehensive
- [ ] Repository is public
- [ ] Repository has clear name

### Documentation
- [ ] README has setup instructions
- [ ] README mentions stub mode
- [ ] ARCHITECTURE.md explains structure
- [ ] All files have proper formatting

### Video Recording
- [ ] Loom video created (3-5 min)
- [ ] Shows signup/login
- [ ] Demonstrates chat features
- [ ] Quick code walkthrough
- [ ] Explains key decisions
- [ ] Video link added to README

---

## 🎉 Ready to Submit!

If all boxes are checked, your project is ready for submission!

### Final Checklist
- [ ] All features working
- [ ] No critical bugs
- [ ] Code is clean and organized
- [ ] Documentation is complete
- [ ] Video is recorded and linked
- [ ] GitHub repo is public
- [ ] Confident in the submission

Good luck! 🚀

