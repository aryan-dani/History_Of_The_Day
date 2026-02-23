import { getChatCompletion } from "./groq.js";

/**
 * Generates an expanded newspaper-style article from an event's data
 * using the Groq AI service.
 */
export const chronicleService = {
	generateArticle: async (event) => {
		const prompt = `You are a historical newspaper reporter from the era of the event described below. Write a detailed, engaging newspaper article about this historical event. The article should be 4-5 paragraphs long, written in a formal yet captivating journalistic style of the period. Include historical context, key figures involved, and the significance of the event. Do NOT use any markdown formatting — write in plain text only.

Event: ${event.title}
Year: ${event.year}
Location: ${event.location_name || event.location || "India"}
Summary: ${event.full_story || event.short_summary}
Category: ${event.category}

Write the article as if reporting for a newspaper called "The Daily Chronicles". Do not include a headline — just the body text. Start directly with the article content.`;

		try {
			const article = await getChatCompletion([
				{ role: "user", content: prompt },
			]);
			return article;
		} catch (error) {
			console.error("Failed to generate chronicle article:", error);
			// Fallback to the existing full_story
			return event.full_story || event.short_summary || "The chronicle of this event remains lost to time.";
		}
	},
};
