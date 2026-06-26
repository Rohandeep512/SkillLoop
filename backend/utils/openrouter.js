import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();

const getClient = () => new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY ,
  baseURL: "https://openrouter.ai/api/v1",
});

export const getMatchExplanation = async (user1, user2) => {
  try {
    const client = getClient();
    const prompt = `In 2 sentences, explain why ${user1.name} (teaches: ${user1.skillsOffered}, wants: ${user1.skillsWanted}) and ${user2.name} (teaches: ${user2.skillsOffered}, wants: ${user2.skillsWanted}) are a good skill barter match.`;

    const response = await client.chat.completions.create({
      model: "openrouter/free", 
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Match Error:", error);
    return "A great match with highly aligned peer-to-peer learning goals.";
  }
};
export const getRoadmap = async (skill) => {
  
  
  try {
    const client = getClient();
   
    
    const prompt = `Create a concise learning roadmap for "${skill}" with 3 stages: Beginner, Intermediate, Advanced. For each stage list 3 topics and 1 free resource. Respond ONLY with pure JSON. Format: { "stages": [{ "level": "", "topics": [], "resource": "" }]}`;

    const response = await client.chat.completions.create({
      model: "openrouter/free", 
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices[0].message.content;
    
    
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      const cleanJsonString = text.substring(startIndex, endIndex + 1);
      return JSON.parse(cleanJsonString);
    } else {
      throw new Error("AI did not return valid JSON brackets.");
    }

  } catch (error) {
    console.error("Roadmap generation failed:", error.message || error);
    
    return {
      stages: [
        { level: "Beginner", topics: [`${skill} Basics`, "Basic Concepts", "Setup"], resource: "https://youtube.com" },
        { level: "Intermediate", topics: ["Intermediate Topics", "Practice", "Projects"], resource: "https://youtube.com" },
        { level: "Advanced", topics: ["Advanced Optimization", "Architecture", "Mastery"], resource: "https://github.com" }
      ]
    };
  }
};