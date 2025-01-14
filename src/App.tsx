import { useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import TakeshiImage from './assets/takeshi-removebg-preview.png'
import ReiImage from './assets/rei-removebg-preview.png'
import YukiImage from './assets/yuki-removebg-preview.png'
import InnkeeperImage from './assets/innkeeper_1-removebg-preview.png'
import BlacksmithImage from './assets/blacksmith Background Removed.png'
import KaedeImage from './assets/kaede-removebg-preview.png'
import HaruImage from './assets/haru Background Removed.png'
import OldVillagerImage from './assets/oldvillager-removebg-preview.png'
import NarratorImage from './assets/narrator.png'

import wallpaperImage from './assets/wallpaper.png'

import { Scene } from './models/SceneModel';
import { Character } from './models/CharacterModel';
import SceneComponent from './components/Scene';

import { useEffect } from 'react';



const scenes: any[] = [
  new Scene(
    'Scene_Intro',
    './intro.png',
    [
      new Character('char1', 'Narrator', NarratorImage, { x: 30, y: 250 }, true)
    ],
    [
      { characterId: 'char1', text: 'Every winter, as the first snow blankets the village, the Frost Festival begins. A celebration of the season’s beauty, a time for joy and togetherness… But also, a time of whispers.', dialoguePath: 'sceneIntro/dialogue_1.mp3' },

      { characterId: 'char1', text: 'For centuries, stories of the Spirit of Frost have shaped this village’s traditions. Some say the Spirit watches over the festival, bestowing its blessing. Others whisper of strange occurrences… unexplained disappearances, fleeting shadows, and an icy chill that lingers long after the snow melts.', dialoguePath: 'sceneIntro/dialogue_2.mp3' },

      { characterId: 'char1', text: 'But the heart of this story lies in the people. The villagers each hold their secrets—some kind, some cunning, and some… dangerous. To uncover the truth, you must walk among them, learn their stories, and earn their trust..', dialoguePath: 'sceneIntro/dialogue_3.mp3' },

      { characterId: 'char1', text: 'Throughout your journey, you’ll face puzzles that test your wits, riddles that demand your cunning, and decisions that could change the course of this tale forever. Every clue brings you closer to the truth… or perhaps, further from it.', dialoguePath: 'sceneIntro/dialogue_4.mp3' },

      { characterId: 'char1', text: 'But I’ve said too much already. Some secrets are meant to be uncovered, not told. So, step into the frost, traveler. The festival awaits… and so does its truth.', dialoguePath: 'sceneIntro/dialogue_5.mp3' },

    ],
    false
  ),
  new Scene(
    'Scene_0',
    './scene_0.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 10, y: 50 }, true),
      new Character('char2', 'Haru', HaruImage, { x: 1300, y: 450 },false),
      new Character('char3', 'Rei', ReiImage, { x: 1300, y: 50 },false),
      new Character('char4', 'Old Villager', OldVillagerImage, { x: 10, y: 450 },true),
    ],
    [
      { characterId: 'char1', text: 'The journey was too tiresome, but I am super excited for the Frost festival!', dialoguePath: 'scene1/dialogue1.mp3' },
      { characterId: 'char2', text: 'I know right! Since I heard of it last month, I have been meaning to visit this village and see the vibrance of the festival myself.', dialoguePath: 'scene1/dialogue2.mp3' },
      { characterId: 'char2', text: 'I am really hungry too, let\'s just grab something to eat as soon as we reach there.', dialoguePath: 'scene1/dialogue3.mp3' },
      { characterId: 'char1', text: 'Of course! Let’s go check it out!', dialoguePath: 'scene1/dialogue4.mp3' },
      { characterId: 'char3', text: 'You two go ahead. I want to take a look around the village.', dialoguePath: 'scene1/dialogue5.mp3' },
      { characterId: 'char1', text: 'Oh.. Okay. Suit yourself, but don’t get lost.', dialoguePath: 'scene1/dialogue6.mp3' },
      { characterId: 'char3', text: 'I\'ll see you guys directly at the inn.', dialoguePath: 'scene1/dialogue7.mp3' },
      { characterId: 'char2', text: 'Sure thing, see you!', dialoguePath: 'scene1/dialogue8.mp3' },
      { characterId: 'char4', text: 'You think the village is welcoming to strangers? You must first prove you are worthy to enter!!! ', dialoguePath: 'scene1/dialogue9.mp3' },
      { characterId: 'char2', text: 'What do you mean? What do we have to do? ', dialoguePath: 'scene1/dialogue10.mp3' },
      { characterId: 'char4', text: 'In the frosts embrace, balance lies in the sum of two. Begin with one, let it grow anew.Keep this in mind as you go ahead!', dialoguePath: 'scene1/dialogue11.mp3' }
    ],
    false
  ),
  {
    type: 'number-puzzle', // Custom type for the puzzle scene
    backgroundImage: './scene_0.png',
    images: [
      './im5.png'
    ],
    textToAdd: 'In the frost\'s embrace, balance lies in the sum of two. Begin with one, let it grow anew. Your task is to find the correct sequence of 4 numbers. enter it in the space given below',
    showNotebook: false
  },
  new Scene(
    'scene2',
    './scene_2.png',
    [
      new Character('char1', 'Innkeeper', InnkeeperImage, { x: 10, y: 250 },true),
      new Character('char2', 'OldVillager', OldVillagerImage, { x: 1300, y: 250 },false)
    ],
    [
      { characterId: 'char1', text: 'The frost festival is finally here, I do not feel too good about this.', dialoguePath: 'scene2/dialogue1.mp3'},
      { characterId: 'char2', text: 'I can understand how you feel. Every year this is when strange things happen in the village.', dialoguePath: 'scene2/dialogue2.mp3' },
      { characterId: 'char1', text: 'Have you been hearing weird noises right next to the shrine at night? It has become quite frequent these days. It is honestly unsettling.', dialoguePath: 'scene2/dialogue3.mp3' },
      { characterId: 'char2', text: 'I have not experienced that myself but my wife was talking about it a couple of days ago. I have asked her not to stay out till late in the evening. Just to be safe..The legend of the Frost spirit might be true, who knows?', dialoguePath: 'scene2/dialogue4.mp3' },
      { characterId: 'char1', text: 'I agree. Moreover, I have heard that people who have disappeared in the past years were questioning the spirit before they were taken away. Never to be seen again', dialoguePath: 'scene2/dialogue5.mp3' },
      { characterId: 'char1', text: 'You remember the chant don\'t you, it gives me the chills everytime.', dialoguePath: 'scene2/dialogue7.mp3' },
      { characterId: 'char2', text: 'Of course, it has been passed down  through generations, Beneath the frost, the heart endures; in snow’s embrace, we find our cure.', dialoguePath: 'scene2/dialogue8.mp3' },
      { characterId: 'char1', text: 'It is very creepy, let\'s not saying again, the spirit hears it all.', dialoguePath: 'scene2/dialogue9.mp3' },
      { characterId: 'char2', text: 'Yes, let us just stay out of this and go on with our lives.', dialoguePath: 'scene2/dialogue6.mp3' }
    ],
    false
  ),
  new Scene(
    'Scene3',
    './scene_3.png',
    [
      new Character('char1', 'Blacksmith', BlacksmithImage, { x: 10, y: 250 },true),
      new Character('char2', 'Rei', ReiImage, { x: 1300, y: 250 },false)
    ],
    [
      { characterId: 'char2', text: 'I was looking for some answers.. do you believe that the so-called frost spirit is real?', dialoguePath: 'scene3/dialogue1.mp3' },
      { characterId: 'char1', text: 'Shush, do not question the spirit again! Although I have my doubts, I shall never say it out loud!', dialoguePath: 'scene3/dialogue2.mp3' },
      { characterId: 'char2', text: 'Okay..I am sorry. This festival seems to be a grand affair though.', dialoguePath: 'scene3/dialogue3.mp3' },
      { characterId: 'char1', text: 'That is right. The Fujimoto family takes care of it. But they are a mysterious bunch of people. I do not personally feel comfortable talking about them.', dialoguePath: 'scene3/dialogue4.mp3' },
      { characterId: 'char2', text: 'The Fujimoto family? Alright.. I am sorry to bother you, I will leave now', dialoguePath: 'scene3/dialogue5.mp3' }
    ],
    false
  ),
  new Scene(
    'scene4',
    './scene_4.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 10, y: 50 },true),
      new Character('char2', 'Haru', HaruImage, { x: 10, y: 450 },true),
      new Character('char3', 'InnKeeper', InnkeeperImage, { x: 1300, y: 250 },false),
      
    ],
    [
      { characterId: 'char1', text: 'Where on earth is Rei?! Have you seen him?' , dialoguePath: 'scene4/dialogue1.mp3'},
      { characterId: 'char2', text: 'I have no clue! It is already 7 am in the morning. I told the guy to return early', dialoguePath: 'scene4/dialogue2.mp3' },
      { characterId: 'char1', text: 'No idea where he might be. We should probably check his room properly to see if he came at all.', dialoguePath: 'scene4/dialogue3.mp3' }, 
      { characterId: 'char3', text: 'He did, late at night. But now he is nowhere to be seen in his room!', dialoguePath: 'scene4/dialogue4.mp3' },
      { characterId: 'char2', text: 'Lets go check his room!', dialoguePath: 'scene4/dialogue5.mp3' }
    ],
    false
  ),
  new Scene(
    'scene5',
    './scene_5.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 10, y: 250 },true),
      new Character('char2', 'Haru', HaruImage, { x: 1300, y: 250 },false),
    ],
    [
      { characterId: 'char1', text: 'Looks like he did not come back.', dialoguePath: 'scene5/dialogue1.mp3' },
      { characterId: 'char2', text: 'Yes..but wait! look! there is his notebook. Which means he returned indeed?', dialoguePath: 'scene5/dialogue2.mp3' },
      { characterId: 'char1', text: 'I think so.. lets look at his notebook.', dialoguePath: 'scene5/dialogue3.mp3' },
    ],
    false
  ),
  new Scene(
    'scene6',
    './scene_6.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 10, y: 250 },true),
      new Character('char2', 'Haru', HaruImage, { x: 1300, y: 250 },false),
    ],
    [
      { characterId: 'char1', text: 'Rei had stuff written in this notebook about this shrine and the village... So he is here because he wants to find his old friend. This place looks so creepy. I have a very bad feeling about this!', dialoguePath: 'scene6/dialogue1.mp3' },
      { characterId: 'char2', text: 'Rei had been doing his investigation yesterday..that is why he went alone..But this might be our best shot to find Rei. They keep talking about his disappearance since he questioned the shrine and the spirit. But I am pretty sure that there is more to it.', dialoguePath: 'scene6/dialogue2.mp3' },
      { characterId: 'char1', text: 'Yeah, I think we need to use his notebook to explore the shrine and find him as soon as possible. I wonder what condition he might be in right now!' , dialoguePath: 'scene6/dialogue3.mp3'},
      { characterId: 'char2', text: 'Yes I know. lets look for him right away.', dialoguePath: 'scene6/dialogue4.mp3' }
    ],
    true
  ),
  {
    type: 'puzzle', // Custom type for the puzzle scene
    backgroundImage: './scene_6.png',
    images: [
      './im5.png'
    ],
    textToAdd: 'To proceed, you must decipher the hidden message in the mural below. Write the correct answer in the space provided.',
    correctAnswer: 'data:image/png;base64,...', // Replace with the actual correct answer
    showNotebook: true
  },
  new Scene(
    'scene8',
    './scene_8.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 10, y: 250 },true),
      new Character('char2', 'Haru', HaruImage, { x: 1300, y: 250 },false),
    ],
    [
      { characterId: 'char1', text: 'This is such a dark chamber. Look around, there are so many books lying around!', dialoguePath: 'scene8/dialogue1.mp3' },
      { characterId: 'char2', text: 'This ledger… it’s a record of donations to the Fujimoto family. The largest ones are linked to the years people disappeared.', dialoguePath: 'scene8/dialogue2.mp3' },
      { characterId: 'char1', text: 'Oh my God, that is a lot of money!', dialoguePath: 'scene8/dialogue3.mp3' },
      { characterId: 'char2', text: 'I feel the Fujimoto family might be on to something.', dialoguePath: 'scene8/dialogue4.mp3' },
      { characterId: 'char1', text: 'I feel so too. Lets look around more.', dialoguePath: 'scene8/dialogue5.mp3' },
      { characterId: 'char2', text: 'I can see a little door. We should see what that is', dialoguePath: 'scene8/dialogue6.mp3' }

    ],
    true
  ),
  {
    type: 'voice-puzzle', // Custom type for the puzzle scene
    backgroundImage: './scene_9.png',
    textToAdd: 'Please the spirit by offering it what it desires in its native language. Say the password to proceed',

    showNotebook: true
  },
  new Scene(
    'scene10',
    './scene_10.png',
    [
      new Character('char1', 'Rei', ReiImage, { x: 10, y: 250 },true),
      new Character('char2', 'Yuki', YukiImage, { x: 1300, y: 450 },false),
      new Character('char3', 'Haru', HaruImage, { x: 1300, y: 50 },false),
    ],
    [
      { characterId: 'char2', text: 'We found Rei!! Rei, how did you end up here!?', dialoguePath: 'scene10/dialogue1.mp3' },
      { characterId: 'char1', text: 'Oh my god guys! You found me. Some goons from the Fujimoto family kidnapped me and made it seem like I disappeared and the Frost spirit took me. They tied me up here and locked me up!', dialoguePath: 'scene10/dialogue2.mp3' },
      { characterId: 'char3', text: 'I am so glad that you are safe Rei. We found many ledgers outside that show records of donations made to the Fujimoto family. I now understand, they are faking the disappearances to keep the legend alive and draw money!', dialoguePath: 'scene10/dialogue3.mp3' },
      { characterId: 'char1', text: 'That is exactly what they are doing. I discovered the truth and hence I was brought here.', dialoguePath: 'scene10/dialogue4.mp3' },
      { characterId: 'char2', text: 'Its freezing, lets just get out of here first', dialoguePath: 'scene10/dialogue5.mp3' }
    ],
    true
  ),
  new Scene(
    'scene11',
    './scene_6.png',
    [
      new Character('char1', 'Rei', ReiImage, { x: 10, y: 250 },true),
      new Character('char2', 'Kaede', KaedeImage, { x: 1300, y: 450 },false),
      new Character('char3', 'Takeshi', TakeshiImage, { x: 1300, y: 50 },false),
    ],
    [
      { characterId: 'char1', text: 'We have found the truth! Let us leave the shrine.', dialoguePath: 'scene11/dialogue1.mp3' },
      { characterId: 'char3', text: 'Stop right here. You think you’ve uncovered the truth? The shrine keeps this village alive. Without it, we’re nothing.', dialoguePath: 'scene11/dialogue2.mp3' },
      { characterId: 'char2', text: 'Takeshi, this has gone on long enough. We can’t keep hurting people to protect a lie.', dialoguePath: 'scene11/dialogue3.mp3' },
      { characterId: 'char3', text: 'But Kaede, we cannot just let them leave', dialoguePath: 'scene11/dialogue4.mp3' },
      { characterId: 'char2', text: 'Please let them go Takeshi, lets end it right here', dialoguePath: 'scene11/dialogue5.mp3' }
    ],
    true
  ),
  new Scene(
    'scene12',
    './scene_12.png',
    [
      new Character('char1', 'Rei', ReiImage, { x: 10, y: 50 },true),
      new Character('char2', 'Yuki', YukiImage, { x: 10, y: 450 },true),
      new Character('char3', 'OldVillager', OldVillagerImage, { x: 1300, y: 250 },false),
    ],
    [
      { characterId: 'char3', text: 'What is this chatter about, people are talking about the snow spirit? Was all this just a story?', dialoguePath: 'scene12/dialogue1.mp3' },
      { characterId: 'char2', text: 'Yes, but this village can thrive on its own. You don’t need fear to survive.', dialoguePath: 'scene12/dialogue2.mp3' },
      { characterId: 'char1', text: 'Or… we can keep the legend alive, but without the harm. What would you choose to do?', dialoguePath: 'scene12/dialogue3.mp3' }
    ],
    true
  )
];


function App() {

  useEffect(() => {
        // Reset state when the scene changes
        const bgaudio = new Audio('./bgm.mp4'); // Replace with your audio file URL or blob
        // Set the loop property to true
        bgaudio.loop = true;
        bgaudio.volume = 0.3;
        // Play the audio
        bgaudio.play();

        // Cleanup function to pause audio when component unmounts
        return () => {
            bgaudio.pause();
            bgaudio.currentTime = 0;
        };
}, []);

  const { user, signOut } = useAuthenticator();
  const [isGameStarted, setIsGameStarted] = useState(false);

  
  const startGame = () => {
    setIsGameStarted(true);
  };


  return (
    <main>


      
      {!isGameStarted ? (
        <div className="start-page" style={{
          background: `url(${wallpaperImage})`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

<div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
  <h4 style={{color:"white"}}>
    {user?.signInDetails?.loginId}
  </h4>
  <button 
    onClick={signOut}
    style={{
      padding: '8px 16px',
      background: 'linear-gradient(to right,rgb(186, 148, 146),rgb(202, 24, 24))',
      color: '#1a1a1a',
      border: '2px solidrgb(152, 18, 3)', 
      borderRadius: '20px',
      cursor: 'pointer'
    }}
  >
    Sign out
  </button>
</div>         

 <h1 style={{
            fontSize: '4rem',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            marginBottom: '2rem'
          }}>
            Yuki No Kage
          </h1>
          <button 
            onClick={startGame}
            style={{
              padding: '1.2rem 3rem',
              fontSize: '1.4rem',
              background: 'linear-gradient(to right,rgb(6, 111, 160), #ffffff)',
              color: '#1a1a1a',
              border: '2px solid #b3e0ff',
              borderRadius: '2px', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              borderRadius: '20px',
            }}
            onMouseOver={e => {
              e.target.style.background = 'linear-gradient(to bottom,rgb(18, 155, 223), #e6f7ff)';
              e.target.style.borderColor = '#80ccff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.target.style.background = 'linear-gradient(to bottom,rgb(10, 150, 214), #ffffff)';
              e.target.style.borderColor = '#b3e0ff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Play
          </button>
        </div>
      ) : (
        <SceneComponent scenes={scenes} />
      )}     
     
    </main>
  );
}

export default App;
