import { Ref, computed } from 'vue';
import CloudDrizzle from '../../assets/icons/Cloud-Drizzle.svg';
import CloudFog from '../../assets/icons/Cloud-Fog.svg';
import CloudHail from '../../assets/icons/Cloud-Hail.svg';
import CloudMoon from '../../assets/icons/Cloud-Moon.svg';
import CloudSnowAlt from '../../assets/icons/Cloud-Snow-Alt.svg';
import CloudSun from '../../assets/icons/Cloud-Sun.svg';
import Cloud from '../../assets/icons/Cloud.svg';
import Moon from '../../assets/icons/Moon.svg';
import Sun from '../../assets/icons/Sun.svg';
import Wind from '../../assets/icons/Wind.svg';
import { weatherCode } from './weather-codes';

type CodedIcon = { codes: number[]; day: string; night: string; alt: string };

const matches: CodedIcon[] = [
  {
    day: CloudDrizzle,
    night: CloudDrizzle,
    alt: 'cloud drizzle',
    codes: [4000, 4200, 4201],
  },
  { day: CloudFog, night: CloudFog, alt: 'cloud fog', codes: [2100, 2000] },
  {
    day: CloudHail,
    night: CloudHail,
    alt: 'cloud hail',
    codes: [6000, 6200, 6001, 6201, 7102, 7000, 7101],
  },
  {
    day: CloudSnowAlt,
    night: CloudSnowAlt,
    alt: 'cloud snow',
    codes: [5001, 5100, 5000, 5101],
  },
  { day: CloudSun, night: CloudMoon, alt: 'cloud sun', codes: [1100, 1101] },
  { day: Cloud, night: Cloud, alt: 'cloud', codes: [1001, 1102] },
  { day: Sun, night: Moon, alt: 'sun', codes: [1000] },
  { day: Wind, night: Wind, alt: 'wind', codes: [8000] },
];

export function useWeatherVisual(code: Ref<number>) {
  const match = computed(() =>
    matches.find((m) => m.codes.indexOf(code.value) !== -1),
  );
  const text = computed(() => {
    const codeKey = `${code.value}` as keyof typeof weatherCode;
    return weatherCode[codeKey];
  });
  const weatherVisual = computed(() => {
    if (match.value) {
      return {
        ...match.value,
        text: text.value,
      };
    } else {
      return {
        alt: 'unknown',
        text: text.value,
        day: null,
        night: null,
      };
    }
  });

  return {
    weatherVisual,
  };
}
