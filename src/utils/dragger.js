import dragula from "dragula";
import "dragula/dist/dragula.css";

const dragger = {
  init(container) {
    return dragula([...container]);
  },
  siblings({ el, wrapper, candidates, type }) {
    /*
      el = >  지금있는 target element
      wrapper =>  
      candidates => 배열을 돌 수 있는 후보군  
      type => 드래그앤 드랍 할 대상
      */
    const curId = el.dataset[type + "Id"] * 1;
    let prevCard = null;
    let nextCard = null;

    candidates.forEach((el, idx, arr) => {
      const id = el.dataset[type + "Id"] * 1;
      if (cardId == targetCard.id) {
        //배열을 순회하면서 prevCard와 nextCard를 찾는 로직
        prevCard =
          idx > 0
            ? {
                id: arr[idx - 1].dataset.cardId * 1,
                pos: arr[idx - 1].dataset.cardPos * 1
              }
            : null;
        nextCard =
          idx < arr.length - 1
            ? {
                id: arr[idx + 1].dataset.cardId * 1,
                pos: arr[idx + 1].dataset.cardPos * 1
              }
            : null;
      }
    });
    return { prev, next };
  }
};

export default dragger;
