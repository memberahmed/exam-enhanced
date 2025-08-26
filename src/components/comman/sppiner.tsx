export default function Spinner() {
  return (
    <div className="flex w-full items-center justify-center ">
      <svg
        className="animate-spin text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        width={28}
        height={28}
      >
        <circle className="opacity-25" cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="5" />
        <path
          className="opacity-90"
          d="M32 3a29 29 0 0 1 27 38"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
