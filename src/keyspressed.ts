class KeysPressed {
  keysPressed: Set<string> = new Set();
  constructor() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
      }
      this.keysPressed.add(event.key);
    });
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      this.keysPressed.delete(event.key);
    });
  }
  getKeysPressed(): Set<string> {
    return new Set(this.keysPressed);
  }
}

const keysPressed = new KeysPressed();

export default keysPressed;
