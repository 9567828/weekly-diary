import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PathName() {
  const [name, setName] = useState("");
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
    }
  }, [path]);

  return name;
}
