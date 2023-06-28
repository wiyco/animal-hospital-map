import Cancel from "@p/icons/cancel.svg";
import Menu from "@p/icons/menu.svg";

type props = {
  isOpen: boolean;
  setOpen: any;
}

export function MenuButton({isOpen, setOpen} : props) {
  return (
    <button onClick={() => setOpen(!isOpen)}>
      {isOpen ? <span><Cancel /></span> : <span><Menu /></span>}
    </button>
    )
}