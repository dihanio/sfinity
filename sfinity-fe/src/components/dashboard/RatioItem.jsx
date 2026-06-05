export default function RatioItem({

  label,

  value,

}) {

  return (

    <div>

      <div
        className="
          mb-2
          flex
          justify-between
        "
      >

        <span
          className="
            text-sm
            font-medium
          "
        >
          {label}
        </span>

        <span
          className="
            text-sm
            font-bold
          "
        >
          {value}%
        </span>

      </div>

      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-slate-200
        "
      >

        <div

          style={{
            width:
              `${value}%`,
          }}

          className="
            h-full
            bg-emerald-500
          "

        />

      </div>

    </div>

  );

}