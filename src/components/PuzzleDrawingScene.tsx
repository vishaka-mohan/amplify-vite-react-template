import React, { useState, useRef } from 'react';
import { Predictions } from '@aws-amplify/predictions';

interface PuzzleDrawingSceneProps {
  images: string[]; // Array of image URLs
  correctAnswer: string; // The correct drawing as a base64 image string
  onCorrectAnswer: () => void; // Callback when the correct answer is submitted
}

const PuzzleDrawingScene: React.FC<PuzzleDrawingSceneProps> = ({
  images,
  correctAnswer,
  onCorrectAnswer,
}) => {
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  //const [isCorrect, setIsCorrect] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleOpenDrawingTool = () => {
    setShowDrawingTool(true);
  };

  const handleSubmit = async () => {
    if (!canvasRef.current) return;

    // Get the user's drawing as a base64 image string
    //const userDrawing = canvasRef.current.toDataURL();
    // const response = await Predictions.identify({
    //     text: {
    //       source: {
    //         userDrawing
    //       }
    //     }
    //   });
    // Check if the drawing matches the correct answer
    // if (userDrawing === correctAnswer) {
    //   setIsCorrect(true);
    //   onCorrectAnswer();
    // } else {
    //   alert('Incorrect. Please try again!');
    // }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

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
      {/* Display the images */}
      <div className="images-container" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Puzzle piece ${index + 1}`} style={{ width: '500px', height: '100px' }} />
        ))}
      </div>

      {/* Drawing tool */}
      {showDrawingTool ? (
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
            <button onClick={handleClearCanvas}>Clear</button>
            <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handleOpenDrawingTool}>Open Drawing Tool</button>
      )}

      {/* Next button (only if the answer is correct) */}
      {<button onClick={onCorrectAnswer}>Next</button>}
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
