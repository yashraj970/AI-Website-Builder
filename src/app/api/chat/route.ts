import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { BASE_PROMPT, getSystemPrompt } from "@/utils/prompts";
import { basePrompt } from "@/defaults/react";

const ApiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: ApiKey,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${getSystemPrompt()}
                 ${BASE_PROMPT}
                 ${`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`}
                 ${prompt}`,
    });
    console.log(response.text);

    return NextResponse.json(response.text);
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
