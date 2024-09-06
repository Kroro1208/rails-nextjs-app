"use client";

type ButtonProps = {
  text: string;
};

const SimpleButton = (props: ButtonProps) => {
  const handleClick = () => {
    alert("クリックされました");
  };

  return (
    <div>
      <button
        className="px-4 py-3 border border-slate-200 rounded-lg"
        type="button"
        onClick={handleClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default SimpleButton;
