# Prompts used for the Cloudflare AI Assignment

**Prompt 1 (Architecture & System Design):**
"I am designing a technical interview bot (cf_ai_tech_interviewer) using Cloudflare Workers AI (Llama 3.3) as the backend and a React single-page application hosted on Cloudflare Pages as the frontend. Act as my sounding board: suggest a clean system architecture to handle CORS, stateless LLM requests, and the system prompt for the interviewer persona."

**Prompt 2 (Boilerplate Generation):**
"Generate the boilerplate code for a Cloudflare Worker `index.js` using the new `wrangler.jsonc` configuration format. I need it to bind the `@cf/meta/llama-3.3-70b-instruct-fp8-fast` model. Set up a basic POST endpoint that receives a JSON payload `{"message": "..."}`, injects a system prompt, and returns the LLM's response. Ensure CORS headers are properly configured to allow requests from my local React dev server."