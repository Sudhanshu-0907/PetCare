module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    "__DEV__": "readonly"
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'react-hooks',
    'prettier',
    'import', // merged here
    'unused-imports',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // General rules
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-raw-text': 'off',

    // // Import sorting
    // 'import/order': [
    //   'warn',
    //   {
    //     groups: [
    //       'builtin',
    //       'external',
    //       'internal',
    //       ['parent', 'sibling', 'index'],
    //     ],
    //     pathGroups: [
    //       {
    //         pattern: 'react',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: 'react-native',
    //         group: 'external',
    //         position: 'after',
    //       },
    //       {
    //         pattern: '@/**',
    //         group: 'internal',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['react'],
    //     'newlines-between': 'always',
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //   },
    // ],

    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // Required for tsconfig path alias support
    },
  },
};
