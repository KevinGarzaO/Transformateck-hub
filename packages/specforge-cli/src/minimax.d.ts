declare module 'minimax' {
  export default class Minimax {
    constructor(apiKey: string, groupId: string);
    chat: {
      completions: {
        create(options: any): Promise<any>;
      };
    };
  }
}