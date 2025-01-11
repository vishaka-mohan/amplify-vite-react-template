import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, convertTextToSpeech } from "./data/resource";
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { storage } from "./storage/resource";

const backend = defineBackend({
 auth,
 data,
 storage,
//  convertTextToSpeech,
});

// backend.convertTextToSpeech.resources.lambda.addToRolePolicy(
//  new PolicyStatement({
//    actions: ["polly:StartSpeechSynthesisTask"],
//    resources: ["*"],
//  })
// );


// backend.addOutput({
//   storage: {
//     aws_region: "us-east-1",
//     bucket_name: "demobucket070125"
//   },
// });

backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "translate:TranslateText",
      "polly:SynthesizeSpeech",
      "transcribe:StartStreamTranscriptionWebSocket",
      "comprehend:DetectSentiment",
      "comprehend:DetectEntities",
      "comprehend:DetectDominantLanguage",
      "comprehend:DetectSyntax",
      "comprehend:DetectKeyPhrases",
      "rekognition:DetectFaces",
      "rekognition:RecognizeCelebrities",
      "rekognition:DetectLabels",
      "rekognition:DetectModerationLabels",
      "rekognition:DetectText",
      "rekognition:DetectLabel",
      "rekognition:SearchFacesByImage",      
      "textract:AnalyzeDocument",
      "textract:DetectDocumentText",
      "textract:GetDocumentAnalysis",
      "textract:StartDocumentAnalysis",
      "textract:StartDocumentTextDetection",
    ],
    resources: ["*"],
  })
);

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        translateText: {
          defaults: {
            sourceLanguage: "en",
            targetLanguage: "es",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
        speechGenerator: {
          defaults: {
            voiceId: "Ivy",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
        transcription: {
          defaults: {
            language: "en-US",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
      },
      identify: {
        identifyEntities: {
          defaults: {
            collectionId: "default",
            maxEntities: 10,
          },
          celebrityDetectionEnabled: true,
          proxy: false,
          region: backend.auth.stack.region,
        },
        identifyLabels: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
        identifyText: {
          defaults: {
            format: "ALL",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
      },
      interpret: {
        interpretText: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: backend.auth.stack.region,
        },
      },
    },
  },
});