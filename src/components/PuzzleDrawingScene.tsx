import React, { useState, useRef, useEffect } from 'react';
import { AnalyzeDocumentCommand, FeatureType, TextractClient } from '@aws-sdk/client-textract';
import NextButton from './NextButton';


interface PuzzleDrawingSceneProps {
  images: string[]; // Array of image URLs
  correctAnswer: string; // The correct drawing as a base64 image string
  onCorrectAnswer: () => void; // Callback when the correct answer is submitted
}

const PuzzleDrawingScene: React.FC<PuzzleDrawingSceneProps> = ({
  images,
  onCorrectAnswer,
}) => {

  const [isCorrect, setIsCorrect] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const textractClient = new TextractClient({
    region: "us-east-1", // e.g., "us-east-1"
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID || "",
      secretAccessKey: import.meta.env.VITE_ACCESS_KEY || ""
    },
  });

  const handleSubmit = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    canvas.toBlob(async (blob) => {

      if (!blob) {
        console.error("Failed to create Blob from canvas");
        return;
      }
      console.log("blob", blob)
      // Convert Blob to ArrayBuffer
      const arrayBuffer = await blob.arrayBuffer();

      // Prepare Textract parameters
      const params = {
        Document: {
          Bytes: new Uint8Array(arrayBuffer),
        },
        FeatureTypes: [FeatureType.LAYOUT], // Adjust based on your needs
      };

      // Send request to Textract
      const command = new AnalyzeDocumentCommand(params);
      setErrorMessage('Loading...')
      try{
      const response = await textractClient.send(command);
      console.log("response", response)
      if(response.Blocks && response.Blocks[2].Text?.toUpperCase() === 'FROST'){
        console.log("Correct Answer")
        setErrorMessage('Correct Answer')
        setIsCorrect(true)

      }
      else{
        console.log("Incorrect Answer")
        setErrorMessage('Incorrect Answer. Please Try again!')
        setIsCorrect(false)
        
      }

      console.log("Textract Response of image:", response);
    }
    catch(error){
      console.error("Error in Textract", error)
      setErrorMessage('Invalid Input! Please try again')
    }
    }, "image/png"); // Specify the image format (e.g., "image/png")

  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "white"; // Set background to white
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Fill the canvas with white
        console.log('filled white')
      }
    }
  };
  useEffect(() => {
    // Ensure the canvas background is white when the component mounts
    //console.log("Access key id" + process.env.REACT_APP_ACCESS_KEY_ID)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "white"; // Set background to white
        context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with white
        console.log('filled white')
      }
    }
  }, []); 
  return (
    <div
      className="puzzle-drawing-scene"
      style={{
        backgroundImage: 'url(/path-to-board-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3 
       style={{
        color: 'white', 
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        fontSize: '1.4rem',
        fontWeight: 500,
        textAlign: 'center',
        margin: '20px 0',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '8px'
      }}
      >
        {errorMessage}
      </h3>

      {/* Display the images */}
      <div className="images-container" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Puzzle piece ${index + 1}`} style={{ width: '500px', height: '100px' }} />
        ))}
      </div>
      {/* Drawing tool */}
      
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{
              border: '2px solid black',
              backgroundColor: 'white',
              cursor: 'crosshair',
            }}
            onMouseDown={(e) => {
              if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                  ctx.beginPath();
                  ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                  canvasRef.current.addEventListener('mousemove', draw);
                }
              }
            }}
            onMouseUp={() => {
              if (canvasRef.current) {
                canvasRef.current.removeEventListener('mousemove', draw);
              }
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={handleClearCanvas} 
              style={{
                background: 'linear-gradient(to right,rgb(27, 119, 142),rgb(6, 71, 83))',
                border: 'none',
                padding: '8px 16px',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
            <button 
              onClick={handleSubmit} 
              style={{
                marginLeft: '10px',
                background: 'linear-gradient(to right,rgb(17, 155, 58),rgb(8, 105, 45))',
                border: 'none', 
                padding: '8px 16px',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </div>
        </div>
      

      {/* Next button (only if the answer is correct) */}
      {isCorrect ? (

        <NextButton onClick={onCorrectAnswer} />)
        : (<></>)
        
        }
    </div>
  );
};

// Helper function to draw on the canvas
const draw = (e: MouseEvent) => {
  const canvas = e.target as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

export default PuzzleDrawingScene;
