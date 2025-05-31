import axios from "axios";
import { marked } from "marked"; // Import the marked library for markdown conversion

// export const fetchSearchResults = async (query) => {
//   try {
//     // Send a GET request with the query as a parameter
//     const response = await axios.get("https://your-api-endpoint.com/search", {
//       params: { q: query },
//       responseType: "stream", // This is crucial for handling streamed responses
//     });

//     // Set up an array to store the streamed results
//     let results = [];

//     // Handle the stream by reading chunks of data
//     response.data.on("data", (chunk) => {
//       // Convert the chunk to string and parse it as JSON (assuming the chunk is JSON)
//       const chunkData = chunk.toString();

//       // Parse the chunk and update results (you can customize this based on your API structure)
//       try {
//         const parsedData = JSON.parse(chunkData);
//         results = [...results, ...parsedData.results]; // Assuming 'results' is part of the chunk data
//       } catch (error) {
//         console.error("Error parsing chunk:", error);
//       }
//     });

//     // Handle when the stream ends
//     return new Promise((resolve, reject) => {
//       response.data.on("end", () => {
//         resolve(results); // Return the full results once the stream ends
//       });

//       response.data.on("error", (err) => {
//         console.error("Stream error:", err);
//         reject(err); // Handle error in the stream
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

// Mock function to simulate a streaming response
export const fetchSearchResults = (query, setHtmlResult) => {
  // Results to simulate the streamed data
  const results = [
    {
      result: `### Result 1 for ${query}\n\nThis is a **multiline** markdown example.`,
    },
    { result: `- Item 1\n- Item 2\n- Item 3 for ${query}` },
    { result: `> Blockquote for ${query}\n\nAnother **markdown** example.` },
    {
      result: `\n## Heading for ${query}\nThis is a simple **markdown** conversion.`,
    },
  ];

  // Create a ReadableStream to simulate streaming
  const stream = new ReadableStream({
    start(controller) {
      results.forEach((item, index) => {
        setTimeout(() => {
          // Push each result as a chunk to the stream
          controller.enqueue(JSON.stringify(item) + "\n"); // Push as text
          if (index === results.length - 1) {
            controller.close(); // Close the stream after the last chunk
          }
        }, index * 1000); // Simulate a delay between chunks
      });
    },
  });

  // Read the stream and update the state incrementally
  const reader = stream.getReader();
  let done = false;

  return new Promise((resolve, reject) => {
    const processStream = async () => {
      let htmlResult = "";
      let accumulatedMarkdown = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (done) {
          break;
        }
        // The value is a Uint8Array, so we need to decode it properly
        // const chunkData = new TextDecoder().decode(value); // Use TextDecoder for Uint8Array
        try {
          const parsedData = JSON.parse(value); // Assuming each chunk is a JSON object
          accumulatedMarkdown += parsedData.result;
          htmlResult = marked.parse(accumulatedMarkdown + "...");
          setHtmlResult(htmlResult); // Update state with each new chunk
        } catch (error) {
          console.error("Error parsing chunk:", error);
        }
      }
      setHtmlResult(marked.parse(accumulatedMarkdown));
      resolve(accumulatedMarkdown); // Resolve when the stream ends
    };

    processStream().catch(reject); // Handle any errors
  });
};
