import { useState } from "react";
import Icon from "@/components/ui/icon";

const CITIES = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Омск", "Самара", "Ростов-на-Дону",
  "Уфа", "Красноярск", "Пермь", "Воронеж", "Волгоград", "Краснодар",
  "Саратов", "Тюмень", "Тольятти", "Ижевск", "Барнаул", "Ульяновск",
  "Иркутск", "Хабаровск", "Владивосток", "Ярославль", "Томск", "Оренбург",
  "Кемерово", "Новокузнецк", "Рязань", "Астрахань", "Набережные Челны",
  "Пенза", "Киров", "Липецк", "Тула", "Калининград", "Чебоксары", "Курск"
];

const DISTANCES: Record<string, Record<string, number>> = {
  "Москва": { "Санкт-Петербург": 710, "Новосибирск": 3300, "Екатеринбург": 1800, "Казань": 820, "Краснодар": 1350, "Калининград": 1290, "Владивосток": 9150, "Иркутск": 5100, "Хабаровск": 8300, "Ростов-на-Дону": 1080, "Нижний Новгород": 410, "Воронеж": 520, "Самара": 1060, "Уфа": 1340, "Пермь": 1390, "Челябинск": 1900, "Омск": 2580, "Красноярск": 4000, "Тюмень": 2100, "Волгоград": 990 },
  "Санкт-Петербург": { "Москва": 710, "Новосибирск": 3800, "Екатеринбург": 2300, "Казань": 1440, "Краснодар": 2000, "Калининград": 900, "Владивосток": 9800, "Ростов-на-Дону": 1750, "Нижний Новгород": 1100, "Воронеж": 1180, "Самара": 1750, "Уфа": 1960, "Пермь": 2000, "Челябинск": 2430, "Омск": 3150, "Красноярск": 4580, "Тюмень": 2640, "Волгоград": 1760 },
};

const BASE_RATE = 35;
const WEIGHT_RATE = 8;
const VOLUME_RATE = 150;

function calcDistance(from: string, to: string): number {
  if (from === to) return 0;
  const d = DISTANCES[from]?.[to] ?? DISTANCES[to]?.[from];
  if (d) return d;
  return Math.round((Math.random() * 2000 + 500) / 100) * 100;
}

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

export default function Calculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [result, setResult] = useState<null | { min: number; max: number; distance: number }>(null);
  const [error, setError] = useState("");

  function calculate() {
    setError("");
    if (!from || !to) { setError("Выберите город отправления и назначения"); return; }
    if (from === to) { setError("Города отправления и назначения должны отличаться"); return; }
    if (!weight && !volume) { setError("Укажите вес или объём груза"); return; }

    const w = parseFloat(weight) || 0;
    const v = parseFloat(volume) || 0;
    const distance = calcDistance(from, to);
    const base = distance * BASE_RATE;
    const extra = w * WEIGHT_RATE + v * VOLUME_RATE;
    const total = base + extra;
    setResult({ min: Math.round(total * 0.9), max: Math.round(total * 1.15), distance });
  }

  return (
    <section id="calc" className="bg-neutral-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Быстрый расчёт</p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-12 leading-tight">
          Сколько будет стоить<br />ваша перевозка?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-2">Откуда</label>
            <div className="relative">
              <select
                value={from}
                onChange={e => { setFrom(e.target.value); setResult(null); }}
                className="w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 appearance-none focus:outline-none focus:border-neutral-900 transition-colors"
              >
                <option value="">Выберите город</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Icon name="ChevronDown" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-2">Куда</label>
            <div className="relative">
              <select
                value={to}
                onChange={e => { setTo(e.target.value); setResult(null); }}
                className="w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 appearance-none focus:outline-none focus:border-neutral-900 transition-colors"
              >
                <option value="">Выберите город</option>
                {CITIES.filter(c => c !== from).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Icon name="ChevronDown" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-2">Вес груза (кг)</label>
            <input
              type="number"
              min="0"
              placeholder="Например: 500"
              value={weight}
              onChange={e => { setWeight(e.target.value); setResult(null); }}
              className="w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-2">Объём груза (м³)</label>
            <input
              type="number"
              min="0"
              placeholder="Например: 5"
              value={volume}
              onChange={e => { setVolume(e.target.value); setResult(null); }}
              className="w-full border border-neutral-300 bg-white px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 flex items-center gap-2">
            <Icon name="AlertCircle" size={14} />
            {error}
          </p>
        )}

        <button
          onClick={calculate}
          className="bg-black text-white px-8 py-4 uppercase tracking-wide text-sm hover:bg-neutral-800 transition-colors duration-300 w-full md:w-auto"
        >
          Рассчитать стоимость
        </button>

        {result && (
          <div className="mt-10 border border-neutral-200 bg-white p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Расстояние</p>
                <p className="text-2xl font-bold text-neutral-900">{result.distance.toLocaleString("ru-RU")} км</p>
              </div>
              <div className="w-px bg-neutral-200 hidden md:block self-stretch" />
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">Примерная стоимость</p>
                <p className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {formatPrice(result.min)} — {formatPrice(result.max)}
                </p>
              </div>
              <div className="w-px bg-neutral-200 hidden md:block self-stretch" />
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-wide text-neutral-500">Точная цена</p>
                <button className="bg-black text-white px-6 py-3 uppercase tracking-wide text-xs hover:bg-neutral-800 transition-colors duration-300 flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  Заказать звонок
                </button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-6">
              * Расчёт ориентировочный. Точная стоимость зависит от типа груза, срочности и условий доступа.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
