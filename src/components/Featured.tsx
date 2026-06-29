export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/21b48f8c-ed29-439c-97c9-a40b68401acc/files/c75801df-bd24-4e26-81ac-6a624411c6e3.jpg"
          alt="Погрузка груза в машину"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Перевозки, на которые можно положиться</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Перевезём что угодно и куда угодно — от мебели и техники до коммерческих партий. Подадим машину под ваш груз,
          подберём маршрут и довезём в срок в любую точку страны.
        </p>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Рассчитать стоимость
        </button>
      </div>
    </div>
  );
}