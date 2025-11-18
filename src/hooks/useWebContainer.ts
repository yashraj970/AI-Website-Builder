import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

let globalWebContainer: WebContainer | null = null;

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer>();

  useEffect(() => {
    async function init() {
      if (!globalWebContainer) {
        globalWebContainer = await WebContainer.boot();
      }
      setWebcontainer(globalWebContainer);
    }

    init();
  }, []);

  return webcontainer!;
}
