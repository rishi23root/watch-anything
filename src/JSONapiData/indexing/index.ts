import { Endpoints, filterType, indexedMagnet } from '@/types/indexing';
import data from './data.json';

export const indexingData = data as Endpoints<filterType<indexedMagnet[]>>;