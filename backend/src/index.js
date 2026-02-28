export default {
  async fetch(request, env) {
    // Lidar com o CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Só aceitamos mensagens via POST
    if (request.method !== "POST") {
      return new Response("Apenas pedidos POST são aceites.", { status: 405 });
    }

    try {
      // Receber a mensagem do utilizador 
      const data = await request.json();
      const userMessage = data.message || "Hello";

      // 4. Chamar a IA da Cloudflare (Llama 3.3)
      const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { 
            role: "system", 
            content: "You are a senior tech interviewer at Cloudflare. You are interviewing a candidate for a Junior Software Engineer position. The candidate knows Java, React, and SQL. Keep your answers short. Ask ONE technical question at a time. Evaluate their previous answer briefly if they gave one." 
          },
          { role: "user", content: userMessage }
        ]
      });

      // 5. Devolver a resposta da IA ao utilizador
      return new Response(JSON.stringify({ reply: response.response }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }
  },
};