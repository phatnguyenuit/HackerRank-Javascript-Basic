const VALID_STATES = ['completed', 'active', 'others'];

class NotesStore {
  //add your code here
  constructor() {
    this.notes = [];
  }

  addNote(state, name) {
    if (!name) {
      throw new Error('Name cannot be empty');
    }
    if (!VALID_STATES.includes(state)) {
      throw new Error(`Invalid state ${state}`);
    }
    this.notes.push({ name, state });
  }

  getNotes(state) {
    if (!VALID_STATES.includes(state)) {
      throw new Error(`Invalid state ${state}`);
    }
    return this.notes
      .filter((note) => note.state === state)
      .map((note) => note.name);
  }
}
