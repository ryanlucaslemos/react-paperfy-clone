import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from "react-dnd";

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {

      const dragged = { list: item.listIndex, index: item.index };
      const target = { list: listIndex, index };

      if (JSON.stringify(dragged) === JSON.stringify(target)) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (dragged.index < target.index && draggedTop < targetCenter) {
        return;
      }

      if (dragged.index > target.index && draggedTop > targetCenter) {
        return;
      }

      move(dragged, target);

      item.index = target.index;
      item.listIndex = target.list;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {
        data.user && (<img src={data.user} alt="" />)
      }
    </Container>

  );
}
