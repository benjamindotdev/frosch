# Frosch

## Overview

Frosch is an exciting and interactive browser game where players control a frog trying to navigate various lanes filled with obstacles. The goal is to reach the top of the screen without running out of time or lives.

## Features

- **Dynamic Lanes**: The game consists of different lane types, including road, water, bike, grass, and pavement. The lanes are ordered randomly.
- **Dynamic enemies**: Each lane has unique obstacles that the frog must avoid.
- **Countdown timer**: The player must complete the level within the given time.
- **Victory and Game Over Screens**: The game provides clear feedback when the player wins or loses.

## Gameplay

- **Movement**: Use the arrow keys to move the frog left, right, up, and down.
- **Objective**: Navigate through the lanes to reach the top of the screen before time runs out.
- **Restart**: After a game over or victory, you can restart the game by clicking the restart button.

## Installation

1. Clone the repository to your local machine.
2. Ensure you have a web server to serve the files. You can use a simple HTTP server such as `http-server`.
3. Place all game assets in the appropriate directories as referenced in the code.

## Usage

1. Open the game in your browser.
2. Click the start button to begin the game.
3. Use the arrow keys to move the frog and avoid obstacles.
4. Try to reach the top of the screen before the timer runs out.

## Code Structure

- **script.js**: Handles the game initialization, event listeners, and music control.
- **game.js**: Contains the main game logic, including the game loop, lane creation, collision detection, and game state management.

## Controls

- **ArrowLeft**: Move left
- **ArrowRight**: Move right
- **ArrowUp**: Move up
- **ArrowDown**: Move down

## Assets

- **Sounds**: Background music and sound effects are located in the `public/assets/sounds/` directory.
- **Images**: Lane textures and frog animations are stored in the `public/assets/lanes/` and `public/assets/player/` directories, respectively.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Game concept inspired by Frogger and other classic arcade games.
- Music by T. Bless and Ian Post.

Enjoy playing Frosch @ https://playfrosch.netlify.app

---
