import { mountExperiment } from './player';

export function mount(host: HTMLElement, locale: 'zh' | 'en'): void {
  mountExperiment(host, locale, 'grasp');
}
