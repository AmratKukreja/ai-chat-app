# OpenRouter Integration Guide

## What is OpenRouter?

OpenRouter is a unified API that provides access to 100+ AI models from different providers through a single interface. Instead of managing multiple API keys for OpenAI, Anthropic, Google, Meta, etc., you can use one OpenRouter API key to access all of them.

## Benefits

✅ **One API Key for All Models**
- OpenAI (GPT-4o, GPT-3.5-turbo)
- Anthropic (Claude 3.5 Sonnet, Claude 3 Opus)
- Google (Gemini Pro, Gemini Flash)
- Meta (Llama 3.1 models)
- And 100+ more models!

✅ **Cost Effective**
- Pay-as-you-go pricing
- Often cheaper than going directly to providers
- Free credits for new users

✅ **Easy to Use**
- OpenAI-compatible API format
- Simple REST API with fetch
- No SDK required

## How It Works in This App

### 1. Environment Variables

```bash
# .env.local
OPENROUTER_API_KEY=sk-or-v1-xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Implementation

The chat functionality in `server/routers/chat.ts` makes a fetch request to OpenRouter:

```typescript
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": "AI Chat App",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: input.modelTag, // e.g., "openai/gpt-4o-mini"
    messages: [
      {
        role: "user",
        content: input.prompt,
      },
    ],
  }),
});

const data = await response.json();
const aiResponse = data.choices[0]?.message?.content;
```

### 3. Model Tags

OpenRouter uses a `provider/model` format for model tags:

| Display Name | Model Tag | Provider |
|-------------|-----------|----------|
| GPT-4o | `openai/gpt-4o` | OpenAI |
| GPT-4o Mini | `openai/gpt-4o-mini` | OpenAI |
| GPT-3.5 Turbo | `openai/gpt-3.5-turbo` | OpenAI |
| Claude 3.5 Sonnet | `anthropic/claude-3.5-sonnet` | Anthropic |
| Claude 3 Opus | `anthropic/claude-3-opus` | Anthropic |
| Gemini Pro | `google/gemini-pro` | Google |
| Llama 3.1 70B | `meta-llama/llama-3.1-70b-instruct` | Meta |

These are stored in the `models` table and seeded via `supabase-schema.sql`.

## Getting Your API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Click **Sign In** (supports Google, GitHub, or email)
3. Navigate to **Keys** in the sidebar
4. Click **Create Key**
5. Name your key (e.g., "AI Chat App")
6. Copy the key (starts with `sk-or-v1-`)
7. Add to your `.env.local` file

## Adding More Models

You can easily add more models by inserting them into the database:

```sql
INSERT INTO public.models (name, tag, description) VALUES
  ('GPT-4 Turbo', 'openai/gpt-4-turbo', 'Fast GPT-4 with 128K context'),
  ('Claude 3 Haiku', 'anthropic/claude-3-haiku', 'Fastest Claude model'),
  ('Mistral Large', 'mistralai/mistral-large', 'Mistral flagship model');
```

Or directly in Supabase dashboard:
1. Go to **Table Editor** → **models**
2. Click **Insert** → **Insert row**
3. Fill in: name, tag, description
4. Save

The model will immediately appear in your dropdown!

## Pricing

OpenRouter charges based on the model you use:

- **GPT-4o-mini**: ~$0.15 per million tokens (very cheap!)
- **GPT-4o**: ~$5 per million tokens
- **Claude 3.5 Sonnet**: ~$3 per million tokens
- **Llama 3.1 70B**: ~$0.80 per million tokens (open source)

Check current pricing at [openrouter.ai/docs/models](https://openrouter.ai/docs/models)

## Stub Mode (No API Key)

The app works perfectly without an API key! When `OPENROUTER_API_KEY` is not set:

```typescript
if (!OPENROUTER_API_KEY) {
  aiResponse = `[${input.modelTag} stub] You said: "${input.prompt}"`;
}
```

This is great for:
- **Development**: Test the UI without spending money
- **Demos**: Show the app without live API calls
- **Testing**: Run automated tests without API dependencies

## Error Handling

The implementation includes proper error handling:

```typescript
try {
  // Make API call
  const response = await fetch(...);
  
  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  aiResponse = data.choices[0]?.message?.content || "No response";
} catch (error) {
  console.error("OpenRouter API error:", error);
  // Fallback to stub
  aiResponse = `Error calling ${input.modelTag}. Using stub instead.`;
}
```

This ensures:
- Users get feedback even if API fails
- No crashes from network errors
- Graceful degradation to stub mode

## Advanced Features (Future)

OpenRouter supports many advanced features you could add:

### Streaming Responses
```typescript
stream: true
```

### Context Window Management
```typescript
max_tokens: 4000
```

### Model Routing (Fallbacks)
```typescript
models: ["openai/gpt-4o", "anthropic/claude-3.5-sonnet"]
```

### Cost Limits
```typescript
max_cost: 0.01 // Maximum $0.01 per request
```

### Custom Parameters
```typescript
temperature: 0.7,
top_p: 0.9
```

## Troubleshooting

### "Unauthorized" Error
- Check your API key is correct
- Make sure it starts with `sk-or-v1-`
- Verify it's set in `.env.local`
- Restart the dev server after adding the key

### "Insufficient Credits" Error
- Add credits to your OpenRouter account
- Or use free models like Llama or open source alternatives

### Rate Limit Errors
- OpenRouter has rate limits per model
- Consider using different models
- Or implement request queuing

### Model Not Found
- Verify the model tag format: `provider/model-name`
- Check [openrouter.ai/docs/models](https://openrouter.ai/docs/models) for available models
- Update your database seed data if needed

## Resources

- **OpenRouter Docs**: https://openrouter.ai/docs
- **Available Models**: https://openrouter.ai/docs/models
- **API Reference**: https://openrouter.ai/docs/api-reference
- **Pricing**: https://openrouter.ai/docs/pricing

---

**Pro Tip**: Start with `openai/gpt-4o-mini` for testing – it's fast, cheap, and high quality!

