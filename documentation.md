# Speech Recognition

Speech recognition is done through the react-speech-recognition library. When the microphone icon is pressed, the Speech Recognition\
library starts listening. When the user clicks "Stop", the library stops listening.\

The text of the users' speech is stored in the state variable 'transcript'. The avatar's dialog is stored in the state variable 'transcript2'.\
The avatar's dialogue is currently hard coded, meaning it is not responsive.\

# Animation

Avatar animation is done in App.css. The keyframe animations named sampleanimation and sampleanimation1, alternate the opacity of two pngs\
of the avatar, with different mouth positions. This gives the appearance of a mouth opening and closing.\

The two pngs used for the animation are located in the icons folder, and are avatar1.png and avatar2.png.\