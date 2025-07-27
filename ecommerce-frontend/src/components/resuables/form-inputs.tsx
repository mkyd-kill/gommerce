/* eslint-disable @typescript-eslint/no-explicit-any */
export function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs font-medium text-[#344054]">{label}</label>
      <input
        className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
        placeholder={label}
        {...props}
      />
    </div>
  );
}

export function TextArea({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs font-medium text-[#344054]">
        {label}
      </label>
      <textarea
        className="w-full border border-[#d0d5dd] rounded-md py-2 px-2.5 text-black"
        placeholder={label}
        { ...props }
        rows={4}
      />
    </div>
  );
}
