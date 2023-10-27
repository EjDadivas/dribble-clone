// This is a generated file. It should not be edited manually.
//
// You can decide to commit this file or add it to your `.gitignore`.
//
// By convention, this module is imported as `@grafbase/generated`. To make this syntax possible,
// add a `paths` entry to your `tsconfig.json`.
//
//  "compilerOptions": {
//    "paths": {
//      "@grafbase/generated": ["./grafbase/generated"]
//    }
//  }

export type Schema = {
  'User': {
    __typename?: 'User';
    name: string;
    email: string;
    description: string | null;
    projects?: Array<Schema['Project']> | null;
  };
  'Project': {
    __typename?: 'Project';
    title: string;
    description: string;
    category: string;
    createdBy?: Schema['User'];
  };
};
