import "dotenv/config";

const getOpenAIAPIResponse = async(message)=>{
       const options = {
        method:"POST",
        headers:{
            "Content-Type" :"application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
            model:"openai/gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try{
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions",options);
        const data = await response.json();

         if (data.choices && data.choices.length > 0) {
              return data.choices[0].message.content;
    } else {
      console.error("OpenRouter error:", data.error);
      res.status(500).send(data.error?.message || "No choices returned");
    }

    }catch(err){
        console.log(err);
    }

}

export default getOpenAIAPIResponse;