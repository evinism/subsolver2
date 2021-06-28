class KeysPressed {
  keysPressed: Set<string> = new Set();
  constructor() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
      }
      this.keysPressed.add(event.code);
    });
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      this.keysPressed.delete(event.code);
    });
  }
  getKeysPressed(): Set<string> {
    return new Set(this.keysPressed);
  }
}

const keysPressed = new KeysPressed();

export default keysPressed;
