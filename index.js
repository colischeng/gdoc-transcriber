const speech = require("@google-cloud/speech");
const fs = require("fs");

async function main() {
  const client = new speech.SpeechClient({ keyFilename: './credentials.json' });
  const filename = "./resources/recording.wav";

  const file = fs.readFileSync(filename);
  const audioBytes = file.toString("base64");

  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: "LINEAR16",
    languageCode: "en-US",
    sampleRateHertz: 44100,
    audioChannelCount: 2,
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  
  console.log(`Transcription: ${transcription}`);
}

main()
.then(console.log("success")) // TODO: export onto Google Doc
.catch(console.error);
