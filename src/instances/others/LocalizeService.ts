import { injectable } from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import { ILocalizeService } from './LocalizeService.interface';

@injectable()
export class LocalizeService implements ILocalizeService {
  public getLocalizationMessage(key: string): string {
    const localePath = `../../resources/locales/${process.env.locale}.json`;
    const localizeData = String(fs.readFileSync(path.resolve(__dirname, localePath)));
    const localize = JSON.parse(localizeData);
    const message = localize[key];
    return message;
  }
}
