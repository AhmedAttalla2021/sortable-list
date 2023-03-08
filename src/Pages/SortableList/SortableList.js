import styles from "./Sortable.module.css";
import { useState } from "react";
export const SortableList = () => {
  // states
  const [items, setItems] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [sortArr, setSortArr] = useState([]);
  const [itemStartIndex, setItemStartIndex] = useState(null);
  const [itemOverIndex, setItemOverIndex] = useState(null);

  const [displayOrder, setDisplayOrder] = useState(false);

  // handlers
  const dragEndFunc = () => {
    let altItemsArr = [...items];
    let removedItem = altItemsArr.splice(itemStartIndex, 1)[0];

    altItemsArr.splice(itemOverIndex, 0, removedItem);

    setItems(altItemsArr);
    let arr = [];
    for (let i = 0; i < altItemsArr.length; i++) {
      let obj = {
        id: altItemsArr[i].id,
        order: i + 1,
      };

      arr.push(obj);
      setSortArr([...arr]);
      setDisplayOrder(true);
    }
    setItems([...arr]);
    console.log("sortArr", arr.sort((a, b) => a.id - b.id));
  };

  return (
    <>
      <h1 className={styles.header}> Sortable List </h1>
      <div className={styles.listDiv}>
        {items.map((item, index) => {
          return (
            <div
              key={item.id}
              className={styles.listItem}
              draggable
              onDragStart={() => setItemStartIndex(index)}
              onDragEnter={() => setItemOverIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={dragEndFunc}
            >
              <p className={styles.itemTxt}>Item with id : {item.id}</p>
              {displayOrder ? (
                <p className={styles.itemTxt}>order : {item.order}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
