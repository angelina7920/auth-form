import { LanguagesList } from '../interfaces/languages.interface';

export function mapToNamesArray(languagesList: LanguagesList): string[] {
  return languagesList.languages.map((language) => language.name);
}
