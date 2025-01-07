import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import TakeshiImage from './assets/takeshi-removebg-preview.png'
import ReiImage from './assets/rei-removebg-preview.png'
import YukiImage from './assets/yuki-removebg-preview.png'
import InnkeeperImage from './assets/innkeeper Background Removed.png'
import BlacksmithImage from './assets/blacksmith Background Removed.png'
import KaedeImage from './assets/kaede-removebg-preview.png'
import HaruImage from './assets/haru Background Removed.png'


import { Scene } from './models/SceneModel';
import { Character } from './models/CharacterModel';
import SceneComponent from './components/Scene';



const scenes: Scene[] = [
  new Scene(
    'Scene_0',
    './scene_0.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 70, y: 350 }),
      new Character('char2', 'Haru', HaruImage, { x: 550, y: 350 }),
      new Character('char3', 'Rei', ReiImage, { x: 1000, y: 350 }),
    ],
    [
      { characterId: 'char2', text: 'The journey was too tiresome, but I am super excited for the Frost festival!' },
      { characterId: 'char1', text: 'I know right! Since I heard of it last month, I have been meaning to visit this village and see the vibrance of the festival myself.' },
      { characterId: 'char2', text: 'I am really hungry too, let\'s just grab something to eat as soon as we reach there.' },
      { characterId: 'char1', text: 'Of course! Let’s go check it out!' },
      { characterId: 'char3', text: 'You two go ahead. I want to take a look around the village.' },
      { characterId: 'char2', text: 'Oh.. Okay. Suit yourself, but don’t get lost.' },
      { characterId: 'char3', text: 'I\'ll see you guys directly at the inn.' },
      { characterId: 'char1', text: 'Sure thing, see you!' }
    ]
  ),
  new Scene(
    'scene2',
    './scene2.png',
    [
      new Character('char1', 'Innkeeper', InnkeeperImage, { x: 70, y: 250 }),
      new Character('char2', 'Blacksmith', BlacksmithImage, { x: 550, y: 250 }),
      new Character('char3', 'Kaede', KaedeImage, { x: 1000, y: 250 }),
    ],
    [
      { characterId: 'char1', text: 'It’s better not to ask questions about what happens here. The spirit watches over us.' },
      { characterId: 'char2', text: 'If the shrine falls, the village falls. But some of us wonder if the spirit’s protection is worth the cost.' },
      { characterId: 'char3', text: 'I’ve seen things… things that don’t make sense. You must find Rei, but be careful.' }
    ]
  ),
  new Scene(
    'scene3',
    './scene3.png',
    [
      new Character('char1', 'Yuki', YukiImage, { x: 70, y: 250 }),
      new Character('char2', 'Haru', HaruImage, { x: 1000, y: 250 })
    ],
    [
      { characterId: 'char1', text: 'There’s something strange about this mural. It looks altered.' },
      { characterId: 'char2', text: 'The map in Rei’s notebook says we should look beneath the altar.' },
      { characterId: 'char1', text: 'Look, there’s a trapdoor. But it’s locked… and there’s a symbol missing.' }
    ]
  ),
  new Scene(
    'scene4',
    './scene4.png',
    [
      new Character('char1', 'Takeshi', TakeshiImage, { x: 70, y: 250 }),
      new Character('char2', 'Kaede', KaedeImage, { x: 550, y: 250 }),
      new Character('char3', 'Yuki', YukiImage, { x: 1000, y: 250 }),
    ],
    [
      { characterId: 'char1', text: 'You have no idea what you’re meddling in. This shrine keeps the village alive.' },
      { characterId: 'char2', text: 'Stop, Takeshi! They deserve to know the truth.' },
      { characterId: 'char3', text: 'We’re not leaving without Rei. Where is he?' }
    ]
  ),
  new Scene(
    'scene5',
    './scene5.png',
    [
      new Character('char1', 'Rei', ReiImage, { x: 70, y: 250 }),
      new Character('char2', 'Yuki', YukiImage, { x: 550, y: 250 }),
      new Character('char3', 'Haru', HaruImage, { x: 1000, y: 250 }),
    ],
    [
      { characterId: 'char1', text: 'They’ve been using the legend to control the village for years!' },
      { characterId: 'char2', text: 'This is bigger than we thought. What do we do now?' },
      { characterId: 'char3', text: 'We expose them. The villagers deserve the truth.' }
    ]
  ),
  new Scene(
    'scene6',
    './scene6.png',
    [
      new Character('char1', 'Takeshi', TakeshiImage, { x: 70, y: 250 }),
      new Character('char2', 'Yuki', YukiImage, { x: 550, y: 250 }),
      new Character('char3', 'Haru', HaruImage, { x: 1000, y: 250 }),
    ],
    [
      { characterId: 'char1', text: 'You think this is simple greed? Without the shrine, there’s no village. We do what we must to survive.' },
      { characterId: 'char2', text: 'You manipulated everyone with lies and fear. The villagers deserve better.' },
      { characterId: 'char3', text: 'It’s up to us now. What will we choose?' }
    ]
  ),
];


function App() {
  // const { user, signOut } = useAuthenticator();
  
  
  useEffect(() => {
    
  }, []);


  return (
    <main>
      {/* <h1>Welcome {user?.signInDetails?.loginId}</h1> */}
      <SceneComponent
        scenes={scenes}
      />
      
      {/* <button onClick={signOut}>Sign out</button> */}
    </main>
  );
}

export default App;
