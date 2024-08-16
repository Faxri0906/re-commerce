
const Input = ({label,onChange,value,type,onBlur,error,defaultValue = undefined}) => {
  return (
    <div className="relative w-full">
      <input defaultValue={defaultValue} placeholder="" name={label.toLowerCase()} id={label.toLowerCase()} type={type} onChange={onChange} onBlur={onBlur} value={value} className={`border-[2px] pt-1.5 peer pl-4 focus:outline-none h-14 font-medium rounded-3xl w-full ${error ? "!border-red-500" : ""}`}/>
      <label htmlFor={label.toLowerCase()} className={`absolute top-3 peer-focus:top-3 peer-focus:text-base peer-focus:scale-[0.8] opacity-60 peer-placeholder-shown:text-lg peer-placeholder-shown:opacity-80 left-2 pointer-events-none scale-75 peer-placeholder-shown:left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 -translate-y-1/2 
        ${value?.length < 1 ? "!scale-100 !left-4 !top-[40%] !-translate-y-1/2" : ""}`}>
        {label}
      </label>
      {error && <h1 className="text-red-500 text-sm">{error}</h1>}
    </div>
  );
};

export default Input;