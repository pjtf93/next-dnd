import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, orderItems } from '../features/itemSlice';
import CopyList from './CopyList';
import DroppableAreas from './DroppableAreas';
import { v4 as uuid } from 'uuid';

const ItemList = () => {
  const dispatch = useDispatch();
  //   const select = useSelector();

  const [activeItem, setActiveItem] = useState(null);
  const droppedItems = useSelector((state) => state.items.droppedItems);

  //   console.log('active', activeItem);

  const [testItems, setTestItems] = useState(null);

  const itemInfo = useSelector((state) =>
    state.items?.blockItems?.find((item) => item.id === activeItem)
  );

  useEffect(() => {
    if (droppedItems) {
      setTestItems(droppedItems);
    }
  });

  console.log('test items', testItems);

  //   const reorder = (list, startIndex, endIndex) => {
  //     const [removed] = list?.splice(startIndex, 1);
  //     console.log(removed);

  //     list?.splice(endIndex, 0, removed);
  //     return list;
  //   };

  //   console.log(reorder());

  const onDragStart = (event) => {
    const { draggableId } = event;
    console.log('start', event);
    setActiveItem(draggableId);
  };

  const onDragEnd = (event) => {
    const { destination, source } = event;
    if (!destination) {
      return;
    }

    if (source.droppableId === 'blocks') {
      console.log('item info', itemInfo);

      itemInfo &&
        dispatch(
          addItem({
            id: uuid(),
            type: itemInfo?.id,
          })
        );
    } else {
      dispatch(
        orderItems({
          startIndex: source.index,
          endIndex: destination.index,
        })
      );
      //   reorder(testItems, source.index, destination.index);
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Flex direction='column' px={[4]}>
        <Flex justify='center' align='center'>
          <Heading>Testing this app</Heading>
        </Flex>
        <Flex justify='space-around'>
          <Flex direction='column'>
            <Heading>Items to drag</Heading>
            <CopyList />
          </Flex>
          <Flex direction='column'>
            <Heading>Droppable Zones</Heading>
            <DroppableAreas />
          </Flex>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

export default ItemList;
