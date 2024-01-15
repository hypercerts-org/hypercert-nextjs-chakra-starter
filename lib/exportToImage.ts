import html2canvas from "html2canvas";
import { MutableRefObject } from "react";

export const exportAsImage = async (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const el = ref.current;

  if (!el) {
    return;
  }

  const canvas = await html2canvas(el, {
    logging: true,
    backgroundColor: null,
    //useCORS: true,
    imageTimeout: 0,
    onclone: (el) => {
      const elementsWithShiftedDownwardText =
        el.querySelectorAll(".shifted-text");
      console.log(elementsWithShiftedDownwardText);
      elementsWithShiftedDownwardText.forEach((el) => {
        // adjust styles or do whatever you want here
        // @ts-ignore
        if (el.style) {
          // @ts-ignore
          el.style.transform = `${el.style.transform} translateY(-40%)`;
          return;
        }
      });
    },
  });
  return canvas.toDataURL("image/png", 1.0);
};
