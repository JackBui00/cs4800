import { Prediction } from '../pages/api/predict';
import { City } from '../data/cityCache';
import { PredictionInput } from '../pages/api/predict';
import { ContextType } from '../pages';

export const getPredictions = async (context: ContextType) => {
  const populated: City[] = [];
  for (const city of context.cities) {
    const res = await fetch('http://localhost:3000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: {
          day: context.day,
          month: context.month,
          year: context.year,
        },
        location: {
          lat: city.lat,
          lng: city.lng,
        },
        rainfall: {
          30: context.rain_30,
          60: context.rain_60,
          90: context.rain_90,
        },
      } as PredictionInput),
    });
    const data = (await res.json()) as Prediction;
    populated.push(Object.assign({}, Object.assign(city, data)));
  }
  return populated;
};
