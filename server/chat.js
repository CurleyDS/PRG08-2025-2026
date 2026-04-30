import { AzureChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

const model = new AzureChatOpenAI({
    temperature: 0.2
});

const messages = [
    new SystemMessage("You are Relmy! A friendly world-building-assistant."),
];

export async function callAssistant(prompt) {
    // De vraag van de gebruiker toevoegen aan de history
    messages.push(new HumanMessage(prompt));

    // AI antwoord ophalen en toevoegen aan history
    const result = await model.invoke(messages);
    messages.push(new AIMessage(result.content));
  
    // Bekijk de chat history
    console.log(messages);

    return result.content;
}