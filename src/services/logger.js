import colors from 'colors';

class Logger {

  #timestamp() {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false
    });
  }

  #print(level, parent, colour, message) {
    const timestamp = this.#timestamp();

    console.log(
      `${timestamp.dim} ${level[colour].bold} ${parent.white} › ${message}`
    );
  }

  info(parent, message) {
    this.#print('INFO', parent, 'cyan', message);
  }

  success(parent, message) {
    this.#print('SUCCESS', parent, 'green', message);
  }

  failure(parent, message) {
    this.#print('FAILURE', parent, 'red', message);
  }

  warn(parent, message) {
    this.#print('WARN', parent, 'yellow', message);
  }

  error(parent, message) {
    this.#print('ERROR', parent, 'red', message);
  }

}

export default new Logger();