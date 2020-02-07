import React, { useContext } from 'react';
import { useDrop } from "react-dnd";
import { MdAdd } from "react-icons/md";

import BoardContext from '../Board/context';

import Card from "../Card";

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: 'CARD',
    drop(item) {

      const dragged = { list: item.listIndex, index: item.index };
      const target = { list: listIndex, index: data.cards.length };

      if (listIndex === item.listIndex) {
        return;
      }

      move(dragged, target);
    }
  });


  return (
    <Container done={data.done} ref={dropRef}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) =>
          <Card
            key={card.id}
            listIndex={listIndex}
            index={index}
            data={card}
          />
        )}
      </ul>
    </Container>
  );
}
