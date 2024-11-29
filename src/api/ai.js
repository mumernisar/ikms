import axios from "axios";



export const getQuerySuggestions = async (inputText) => {
  const prompt = `Suggest query completions for: "${inputText}". Provide 3 options.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 50,
        n: 3,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices.map((choice) => {
      console.log(choice);
      return choice.text.trim();
    });
  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
};
