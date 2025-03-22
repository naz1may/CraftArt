// import globals from "globals";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.node }},
// ];

import globals from 'globals';
import airbnbBase from 'eslint-config-airbnb-base';
import pluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      import: pluginImport, // Плагин подключаем как объект
    },
    rules: {
      ...airbnbBase.rules, // Добавляем правила из конфигурации Airbnb
  
    },
  },
];



