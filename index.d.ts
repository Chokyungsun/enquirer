interface BasePromptOptions {
  name: string | (() => string)
  type: string | (() => string)
  message: string | (() => string) | (() => Promise<string>)
  initial?: any
  format?(value: string): string | Promise<string>
  result?(value: string): string | Promise<string>
  validate?(value: string): boolean | Promise<boolean>
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
}

interface Choice {
  name: string
  message?: string
  value?: string
  hint?: string
  disabled?: boolean | string
}

interface ArrayPromptOptions extends BasePromptOptions {
  type:
    | 'autocomplete'
    | 'editable'
    | 'form'
    | 'hmultiselect'
    | 'hselect'
    | 'multiselect'
    | 'select'
    | 'survey'
  choices: string[] | Choice[]
  maxChoices?: number
  muliple?: boolean
  initial?: number
  delay?: number
}

interface BooleanPromptOptions extends BasePromptOptions {
  type: 'confirm'
  initial?: boolean
}

interface StringPromptOptions extends BasePromptOptions {
  type: 'input' | 'invisible' | 'list' | 'password' | 'text'
  initial?: string
}

interface NumberPromptOptions extends BasePromptOptions {
  type: 'numeral'
  min?: number
  max?: number
  delay?: number
  float?: boolean
  round?: boolean
  major?: number
  minor?: number
  initial?: number
}

interface SnippetPromptOptions extends BasePromptOptions {
  type: 'snippet'
}

interface SortPromptOptions extends BasePromptOptions {
  type: 'sort'
  hint?: string
}

type PromptOptions =
  | ArrayPromptOptions
  | BooleanPromptOptions
  | StringPromptOptions
  | NumberPromptOptions
  | SnippetPromptOptions
  | SortPromptOptions
  | BasePromptOptions

declare class BasePrompt extends NodeJS.EventEmitter {
    constructor(options?: PromptOptions);

    render(): void;

    run(): Promise<any>;
  }

declare class Enquirer<T = object> extends NodeJS.EventEmitter {
  constructor(options?: object, answers?: T);

  /**
   * Register a custom prompt type.
   *
   * @param type
   * @param fn `Prompt` class, or a function that returns a `Prompt` class.
   */
  register(type: string, fn: typeof BasePrompt | (() => typeof BasePrompt)): this;

  /**
   * Register a custom prompt type.
   */
  register(type: { [key: string]: typeof BasePrompt | (() => typeof BasePrompt) }): this;

  /**
   * Prompt function that takes a "question" object or array of question objects,
   * and returns an object with responses from the user.
   *
   * @param questions Options objects for one or more prompts to run.
   */
  prompt(questions: PromptOptions | PromptOptions[]): Promise<T>;

  /**
   * Use an enquirer plugin.
   *
   * @param plugin Plugin function that takes an instance of Enquirer.
   */
  use(plugin: (this: this, enquirer: this) => void): this;
}

declare namespace Enquirer {
  function prompt(questions: PromptOptions | PromptOptions[]): Promise<object>;

  class Prompt extends BasePrompt {}
}

export = Enquirer;
