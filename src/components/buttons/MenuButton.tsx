import Cancel from "@icons/cancel.svg";
import Menu from "@icons/menu.svg";

type menuButtonProps = {
  isOpen: boolean;
  setOpen: any;
};

export function MenuButton({ isOpen, setOpen }: menuButtonProps) {
  return (
    <button onClick={() => setOpen(!isOpen)}>
      {isOpen ? (
        <span>
          <Cancel />
        </span>
      ) : (
        <span>
          <Menu />
        </span>
      )}
    </button>
  );
}
