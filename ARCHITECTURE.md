# Architecture & Code Organization

## Overview

This is a full-stack Next.js application using the App Router with tRPC for type-safe APIs and Supabase for authentication and database.

## Tech Stack Rationale

### Frontend
- **Next.js 14 (App Router)**: Modern React framework with server components
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **shadcn/ui**: High-quality, accessible component library

### Backend
- **tRPC**: End-to-end type safety without code generation
- **Supabase**: 
  - PostgreSQL database with Row Level Security
  - Built-in authentication
  - Real-time capabilities (not used yet, but available)
- **OpenAI API**: AI model integration with fallback to stub

## Directory Structure

```
job_assesment/
│
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/page.tsx        # Login page
│   │   ├── signup/page.tsx       # Signup page
│   │   └── layout.tsx            # Auth layout with theme toggle
│   │
│   ├── chat/                     # Chat interface
│   │   └── page.tsx              # Main chat page
│   │
│   ├── api/trpc/[trpc]/          # tRPC API endpoint
│   │   └── route.ts              # API route handler
│   │
│   ├── layout.tsx                # Root layout (providers)
│   ├── page.tsx                  # Home page (auth redirect)
│   └── globals.css               # Global styles + theme variables
│
├── components/
│   ├── chat/                     # Chat-specific components
│   │   ├── message-bubble.tsx    # Individual message display
│   │   ├── typing-indicator.tsx  # Loading animation
│   │   ├── model-selector.tsx    # Dropdown for AI models
│   │   └── chat-input.tsx        # Message input with send button
│   │
│   ├── ui/                       # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── label.tsx
│   │   └── select.tsx
│   │
│   └── theme-toggle.tsx          # Dark/light mode toggle
│
├── lib/
│   ├── supabase/                 # Supabase client setup
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Session management
│   │
│   ├── trpc/                     # tRPC client setup
│   │   ├── client.ts             # Vanilla client
│   │   └── provider.tsx          # React Query provider
│   │
│   ├── theme-provider.tsx        # Theme context
│   └── utils.ts                  # Utility functions (cn)
│
├── server/
│   ├── routers/                  # tRPC routers
│   │   ├── _app.ts               # Main router (combines sub-routers)
│   │   ├── models.ts             # Model management
│   │   └── chat.ts               # Chat functionality
│   │
│   └── trpc.ts                   # tRPC initialization & context
│
├── types/
│   └── database.ts               # TypeScript types for DB models
│
├── middleware.ts                 # Next.js middleware (auth check)
├── supabase-schema.sql           # Database schema + seed data
└── package.json                  # Dependencies
```

## Data Flow

### Authentication Flow
```
User → Login Page → Supabase Auth → Set Cookie → Middleware → Protected Pages
```

### Chat Message Flow
```
1. User types message
2. ChatInput component calls onSend
3. tRPC mutation: chat.send
4. Server saves user message to DB
5. Server calls OpenAI API (or stub)
6. Server saves AI response to DB
7. Client refetches messages
8. MessageBubble components render
```

## Key Patterns

### 1. Type Safety with tRPC

```typescript
// Server: server/routers/chat.ts
export const chatRouter = router({
  send: protectedProcedure
    .input(z.object({
      modelTag: z.string(),
      prompt: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Implementation
    }),
});

// Client: app/chat/page.tsx
const sendMutation = trpc.chat.send.useMutation();
sendMutation.mutate({ modelTag, prompt }); // Fully typed!
```

### 2. Row Level Security (RLS)

```sql
-- Users can only read their own messages
create policy "Users can read their own messages"
  on public.messages for select
  using (auth.uid() = user_id);
```

### 3. Server/Client Separation

- **Server Components**: Used in layouts for metadata
- **Client Components**: Used for interactivity (marked with "use client")
- **tRPC**: Bridge between client and server with type safety

### 4. Theme System

```typescript
// CSS Variables in globals.css
:root { --background: 0 0% 100%; }
.dark { --background: 222.2 84% 4.9%; }

// Tailwind classes use these
<div className="bg-background text-foreground">
```

## Security Considerations

1. **Row Level Security**: Database enforces user isolation
2. **Protected Procedures**: tRPC middleware checks authentication
3. **Cookie-based Auth**: HttpOnly cookies prevent XSS
4. **Environment Variables**: Sensitive keys never exposed to client
5. **API Key Server-side**: OpenAI key only used in server context

## Performance Optimizations

1. **React Query Caching**: tRPC uses React Query for smart caching
2. **Optimistic Updates**: Could be added for instant UI feedback
3. **Batch Requests**: tRPC batches multiple requests automatically
4. **Server Components**: Reduce client-side JavaScript
5. **Lazy Loading**: Route-based code splitting with App Router

## Future Enhancements

Potential improvements:
- [ ] Streaming responses (SSE/websockets)
- [ ] Message editing
- [ ] Conversation management (multiple chats)
- [ ] File/image uploads
- [ ] Real-time with Supabase Realtime
- [ ] Search through chat history
- [ ] Export conversations
- [ ] User settings/preferences

