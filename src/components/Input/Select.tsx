export default function Select({
  item,
}: {
  item: {title: string; enum: string[]; enum_titles: string[]; fieldId: string};
}) {
  return (
    <div className="w-full">
      <select
        id={item.fieldId}
        name={item.fieldId}
        defaultValue={item.title.split('_').join(' ')}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option value={item.title.split('_').join(' ')} disabled selected>
          {item.title.split('_').join(' ')}
        </option>
        {item.enum_titles.map((item: string) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
