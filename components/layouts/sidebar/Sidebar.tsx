"use client";

import MenuList from "../../ui/MenuList";
import Button from "../../ui/Button";

interface Ibtn {
  onClick: () => void;
}

export default function Sidebar({ onClick }: Ibtn) {
  return (
    <aside>
      <nav>
        <Button existImg={true} src="/imgs/icons/ic_Close.svg" alt="닫기" onClick={onClick} />
        <MenuList isTab={false} />
      </nav>
    </aside>
  );
}
