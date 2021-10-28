import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import { v4 as uuid } from 'uuid';

import React, { useEffect, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addBlocks } from '../features/itemSlice';

const CopyList = () => {
  const items = useSelector((state) => state.items.blockItems);

  return (
    <Droppable
      droppableId='blocks'
      // type='elements'
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <Flex
          direction='column'
          ref={provided.innerRef}
          bgColor={snapshot.isDraggingOver ? 'blue' : 'gray'}
          {...provided.droppableProps}
        >
          {items?.map((x, index) => {
            return (
              <Draggable draggableId={x.id} index={index} key={x.id}>
                {(provided, snapshot) => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Text>{x.type}</Text>
                  </Flex>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </Flex>
      )}
    </Droppable>
  );
};

export default CopyList;

//   useEffect(() => {
//     const testing = () => {
//       if (typeof window !== 'undefined') {
//         const test = [
//           {
//             id: uuid(),
//             content: 'Heading',
//             type: 'heading',
//           },
//           {
//             id: uuid(),
//             content: 'Block',
//             type: 'block',
//           },
//           {
//             id: uuid(),
//             content: 'Text',
//             type: 'text',
//           },
//           {
//             id: uuid(),
//             content: 'Image',
//             type: 'image',
//           },
//         ];
//         return test;
//       }
//     };
//     setItems(testing);
//     dispatch(addBlocks(items));
//   }, []);
