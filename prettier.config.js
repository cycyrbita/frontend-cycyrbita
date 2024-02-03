/**
 * Created with: https://keyzog.com/tools/prettier-config
 */
module.exports = {
  /**
   * Рекомендуемая длина строки
   * @type number
   * @default 80
   */
  printWidth: 160,

  /**
   * Размер табуляции (в пробелах)
   * @type number
   * @default 2
   */
  tabWidth: 2,

  /**
   * Использовать табы вместо пробелов
   * @type boolean
   * @default false
   */
  useTabs: false,

  /**
   * Добавлять автоматически точки с запятой
   * @type boolean
   * @default true
   */
  semi: false,

  /**
   * Использовать одинарные кавычки, где это возможно (игнорируется в JSX)
   * @type boolean
   * @default false
   */
  singleQuote: true,

  /**
   * Использовать одинарные кавычки вместо двойных в JSX
   * @type boolean
   * @default false
   */
  jsxSingleQuote: true,

  /**
   * Ставить запятые в конце многострочных структур, разделяемых запятыми
   * @type "es5" | "none" | "all"
   * @default "es5"
   */
  trailingComma: 'all',

  /**
   * Оборачивать в скобки единственный параметр стрелочной функции
   * @type "always" | "avoid"
   * @default "always"
   */
  arrowParens: 'avoid',

  /**
   * Добавлять пробелы между фигурными скобками
   * @type boolean
   * @default true
   */
  bracketSpacing: true,

  /**
   * Оборачивать ключи свойств объектов в кавычки
   * @type "as-needed" | "consistent" | "preserve"
   * @default "as-needed"
   */
  quoteProps: 'as-needed',

  /**
   * Настраивает логику переноса текста для Markdown
   * @type "always" | "never" | "preserve"
   * @default "preserve"
   */
  proseWrap: 'never',

  /**
   * Задаёт глобальную чувствительность к пробелам внутри тегов в HTML, Vue, Angular и т.д.
   * @type "css" | "strict" | "ignore"
   * @default "css"
   */
  htmlWhitespaceSensitivity: 'css',

  /**
   * Делать отступ для кода внутри <script> и <style> тегов в файлах Vue
   * @type boolean
   * @default false
   */
  vueIndentScriptAndStyle: true,

  /**
   * Позволяет указать каким "знаком переноса" должны заканчиваться строки/линии
   * @type "lf" | "crlf" | "cr" | "auto"
   * @default "lf"
   */
  endOfLine: 'lf',

  /**
   * Расставлять атрибуты html тегов только по одному в строку (для HTML, Vue и JSX документов)
   * @type boolean
   * @default false
   */
  singleAttributePerLine: true,

  /**
   * Оставлять знак `>` многострочного HTML элемента (HTML, JSX, Vue, Angular) в тойже строке что и последний параметр
   * @type boolean
   * @default false
   */
  bracketSameLine: false,

  /**
   * Контролирует форматирование кода в кавычках
   * @type "auto" | "off"
   * @default "auto"
   */
  embeddedLanguageFormatting: 'auto',

  /**
   * Добавлять метку "@format" в отформатированные файлы
   * @type boolean
   * @default false
   */
  insertPragma: false,

  /**
   * Форматировать только документы с меткой "@prettier"
   * @type boolean
   * @default false
   */
  requirePragma: false,
}
