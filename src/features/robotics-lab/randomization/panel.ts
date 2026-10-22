import { mountExperiment } from '../grasp/player';

export function mount(host: HTMLElement, locale: 'zh' | 'en'): void {
  mountExperiment(host, locale, 'randomization');
}
