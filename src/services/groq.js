import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side usage
});

export const getChatCompletion = async (messages) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null,
        });
        return chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
        return "Sorry, something went wrong. Please try again later.";
    }
};
