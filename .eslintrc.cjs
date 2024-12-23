module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env'],
      parserOpts: {
        plugins: ['jsx'],
      },
    },
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', '@babel', 'prettier'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    // semi: ['error', 'never'],
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    version: 'detect',
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
