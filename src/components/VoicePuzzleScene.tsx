import React, { useRef, useState } from "react";
import { TranscribeClient, StartTranscriptionJobCommand, LanguageCode, GetTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import { uploadData } from 'aws-amplify/storage';

const VoicePuzzleScene: React.FC<{ puzzle: any; onComplete: () => void }> = ({ puzzle, onComplete }) => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [translation, setTranslation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const pollTranscriptionJob = async (client: TranscribeClient, jobName: string) => {
    let jobStatus = "IN_PROGRESS";
    let result: any;

    while (jobStatus === "IN_PROGRESS") {
      console.log("Checking transcription job status...");
      const command = new GetTranscriptionJobCommand({ TranscriptionJobName: jobName });
      const response = await client.send(command);
      console.log(response)

      jobStatus = response.TranscriptionJob?.TranscriptionJobStatus || "FAILED";

      if (jobStatus === "COMPLETED") {
        console.log("Transcription job completed:", response);
        const transcriptionUri = response.TranscriptionJob?.Transcript?.TranscriptFileUri;
        // return response
        if (transcriptionUri) {
          const transcriptionResponse = await fetch(transcriptionUri);
          result = await transcriptionResponse.json();
          console.log("Transcription result:", result);
        }
      } else if (jobStatus === "FAILED") {
        console.error("Transcription job failed:", response);
        throw new Error("Transcription job failed");
      }

      // Wait for a few seconds before polling again
      if (jobStatus === "IN_PROGRESS") {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    return result?.results?.transcripts?.[0]?.transcript || "No transcription found";
    
  };

  const startRecording = async () => {
    try {
        console.log('recording started')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioBlob(blob);
        audioChunks.current = []; // Reset for next recording
        console.log("Audio recording completed.");
        console.log("audio blob", blob)
        console.log("uploading to s3")
        const result = await uploadData({
            path: `chants/${Date.now()}.webm`,
            // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
            data: blob,
            options: {
                contentType: "audio/webm", // Specify the correct content type
            }
          }).result;
         console.log('Succeeded to upload: ', result);
        // const result1 = await getUrl({path: result.path})
        // console.log(result1)

        
          try {
      // Transcribe the recorded audio
      const transcribeClient = new TranscribeClient({ region: "us-east-2",credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
        secretAccessKey: import.meta.env.VITE_ACCESS_KEY || ""
      }});
      const jobName = `VoicePuzzle-${Date.now()}`
      const transcribeParams = {
        TranscriptionJobName: jobName,
        LanguageCode: LanguageCode.EN_IN, // Japanese
        Media: {
          MediaFileUri: "s3://amplify-d2wew4f6nlbm6q-ma-gamedialogueaudiosbucket-tijyngkrqp1j/"+result.path,
        },
        OutputBucketName: "voicepuzzle-transcripts"
      };

      const transcribeCommand = new StartTranscriptionJobCommand(transcribeParams);
      const transcribeResponse = await transcribeClient.send(transcribeCommand);

      console.log("Transcription response:", transcribeResponse);
      const transcriptionResult = await pollTranscriptionJob(transcribeClient, jobName);
      console.log("Transcription result:", transcriptionResult);
      setTranscription(transcriptionResult);

      // Translate the transcription
      const translateClient = new TranslateClient({ region: "us-east-2", credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
      secretAccessKey: import.meta.env.VITE_ACCESS_KEY || ""
      } });
      const translateCommand = new TranslateTextCommand({
        SourceLanguageCode: "en",
        TargetLanguageCode: "ja",
        Text: transcriptionResult,
      });

      const translateResponse = await translateClient.send(translateCommand);
      const translatedText = translateResponse.TranslatedText || "";
      console.log("Translation:", translatedText);
      setTranslation(translatedText);
      

      // Check if the translation matches the expected answer
    //   if (translatedText === puzzle.expectedTranslation) {
    //     onComplete(); // Notify parent component that the puzzle is complete
    //   } else {
    //     setErrorMessage("Incorrect chant. Please try again.");
    //   }
    } catch (error) {
      console.error("Error processing audio:", error);
      setErrorMessage("An error occurred. Please try again.");
    }



      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = async () => {
    console.log("Recording stopped...");
    if (mediaRecorder) {
        mediaRecorder.stop();
        setRecording(false);
        console.log("Audio recording stopped.");
      }
  };

  return (
    <div className="voice-puzzle-scene">
      <h1>Puzzle: Chant the Spell</h1>
      <p>{puzzle.textToAdd}</p>
      <div>
        {!recording ? (
          <button onClick={startRecording}>🎤 Start Recording</button>
        ) : (
          <button onClick={handleStopRecording}>⏹️ Stop Recording</button>
        )}
      </div>
      {audioBlob && (
        <>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </>
      )}
      {transcription && <p>Transcription: {transcription}</p>}
      {translation && <p>Translation: {translation}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={onComplete}>Next</button>
    </div>
  );
};

export default VoicePuzzleScene;
