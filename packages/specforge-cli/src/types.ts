export type Framework = 'nextjs' | 'react' | 'vue' | 'angular' | 'express' | 'fastapi' | 'flutter' | 'react-native' | 'ionic-angular' | 'ionic-react' | 'ionic-vue';

export interface NewProjectOptions {
  name: string;
  framework: Framework;
  author: string;
}

export interface ExistingProjectOptions {
  author: string;
}

export interface FrameworkConfig {
  name: string;
  description: string;
  language: string;
  testing: string;
  lint: string;
  scripts: Record<string, string>;
  structure: string[];
  dependencies: string[];
  devDependencies: string[];
}
