## Dall-Ecam

Dall-Ecam is an iOS camera app that allows you to generate images from scratch based on a text prompt, and overlay them on top of the photo you took. The generated image can be scaled, rotated, and positioned anywhere on the photo and can be saved to the user's camera roll, or the photo can be discarded.

Dall-Ecam uses OpenAI's Images API for the image generation.

"Sun wearing glasses with a blue sky background"
![Alt Text](https://media.giphy.com/media/1mrT5SWeVXSkbXjMty/giphy.gif)

## Installation

- Clone this repository to your local machine
- Install Node.js
- Install Yarn: npm install -g yarn
- Install the Expo CLI: yarn global add expo-cli
- Install dependencies: yarn install
- Create a .env file in the root directory of your project
- Obtain an OpenAI API key from https://beta.openai.com/
- Add your OpenAI API key to the .env file: OPENAI_API_KEY=your-api-key
- Start the app: yarn start
- On your iOS device, install the Expo app from the App Store
- Scan the QR code that appears in the terminal with the Expo app
- The Dall-Ecam app should now open on your iOS device

## Features

- Take a photo with your camera
- Generate an image on top of the photo
- Scale, rotate, and position the image anywhere on the photo
- Save the edited photo to your camera roll
- Discard the photo if you don't want to save it
- Haptic feedback when performing certain actions
- Easy to use interface
