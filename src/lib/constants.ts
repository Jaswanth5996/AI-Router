export const AI_MODELS = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Excels at natural language understanding and creative writing tasks.",
    specialty: "Natural language understanding, creative content generation, and detailed explanations.",
    reason: "AIR routes prompts to ChatGPT when they involve creative writing, summarization, or need for detailed explanations."
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Great for reasoning, code generation, and multimodal understanding.",
    specialty: "Reasoning, mathematical problems, and coding challenges.",
    reason: "AIR routes prompts to Gemini when they involve complex reasoning, logic problems, or code generation."
  },
  {
    id: "claude",
    name: "Claude",
    description: "Known for contextual understanding and nuanced responses.",
    specialty: "Long context windows, nuanced responses, and strong summarization.",
    reason: "AIR routes prompts to Claude when they require deep contextual understanding or analysis of long documents."
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Specialized in coding and technical problem-solving.",
    specialty: "Advanced coding, technical problem-solving, and specialized knowledge domains.",
    reason: "AIR routes prompts to DeepSeek when they involve complex technical challenges or specialized programming tasks."
  },
  {
    id: "llama",
    name: "Llama",
    description: "Open-source model with balanced capabilities for various tasks.",
    specialty: "Balanced performance across text generation, reasoning, and creative tasks.",
    reason: "AIR routes prompts to Llama when they need a balanced approach or for more general queries."
  }
];

export const SAMPLE_PROMPTS = [
  {
    text: "Explain quantum computing to a 5-year-old",
    aiModel: "chatgpt"
  },
  {
    text: "Solve this math problem: Find all values of x where 2x² - 7x + 3 = 0",
    aiModel: "gemini"
  },
  {
    text: "Summarize the key arguments in favor of and against universal basic income",
    aiModel: "claude"
  },
  {
    text: "Write a recursive function to calculate Fibonacci numbers in Python",
    aiModel: "deepseek"
  }
];

export const APP_DESCRIPTION = "AIR is an intelligent chatbot that understands your prompt and routes it to the most suitable AI — whether it's ChatGPT, Gemini, Claude, DeepSeek, or Llama. It returns a smart response, rendered with real-time typing animation, and lets you know which AI powered the answer.";

// Detailed samples for different AI capabilities
export const DETAILED_SAMPLES = {
  codeGeneration: {
    title: "Code Generation",
    icon: "Code",
    examples: [
      {
        prompt: "Create a React component that displays a countdown timer",
        description: "AI can generate functional code with proper syntax, component structure, and state management",
        model: "deepseek"
      },
      {
        prompt: "Write a Python function to extract text from a PDF file",
        description: "AI identifies the proper libraries and implements error handling for reliable file processing",
        model: "gemini"
      }
    ]
  },
  imageGeneration: {
    title: "Image Description",
    icon: "Image",
    examples: [
      {
        prompt: "Describe an image of a futuristic city with flying cars and holographic billboards",
        description: "AI can provide detailed visual descriptions that would help with image generation",
        model: "claude"
      },
      {
        prompt: "Create a prompt for generating an image of an underwater civilization",
        description: "AI crafts detailed prompts with visual elements, lighting, style, and composition details",
        model: "chatgpt"
      }
    ]
  },
  humanTouch: {
    title: "Human Touch",
    icon: "Heart",
    examples: [
      {
        prompt: "Write a heartfelt congratulations letter to a friend who just got promoted",
        description: "AI creates emotionally resonant content that feels personal and authentic",
        model: "claude"
      },
      {
        prompt: "Help me draft a sensitive email to decline a job offer while maintaining the relationship",
        description: "AI considers social nuance and emotional impact in communication",
        model: "chatgpt"
      }
    ]
  },
  logicalReasoning: {
    title: "Logical Reasoning",
    icon: "Brain",
    examples: [
      {
        prompt: "Solve this logic puzzle: If all Zorbs are Yerks, and some Yerks are Quops, can we conclude that some Zorbs are Quops?",
        description: "AI applies logical principles to analyze and solve complex reasoning problems",
        model: "gemini"
      },
      {
        prompt: "Evaluate the following argument for logical fallacies: 'Everyone who exercises regularly lives longer. John exercises regularly. Therefore, John will live to be 100.'",
        description: "AI identifies flaws in reasoning and explains logical relationships",
        model: "llama"
      }
    ]
  }
};
