import { Language, LanguagesList } from '../interfaces/languages.interface';
import { Options } from '../interfaces/select.interface';

export function mapToNamesArray(languagesList: LanguagesList): Options[] {
  return languagesList.languages.map((language: Language) => {
    return {
      id: language.code,
      name: language.name,
    };
  });
}
