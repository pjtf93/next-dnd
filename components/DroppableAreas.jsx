import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

const DroppableAreas = () => {
  const droppedItems = useSelector((state) => state.items.droppedItems);

  const HeadingType = (props) => {
    return (
      <>
        <Flex direction='column'>
          <Heading>{props.type}</Heading>
          <Input placeholder={props.type} />
        </Flex>
      </>
    );
  };

  return (
    <Droppable droppableId='form'>
      {(provided, snapshot) => (
        <Flex
          direction='column'
          minH='50vh'
          ref={provided.innerRef}
          bgColor={snapshot.isDraggingOver ? 'blue' : 'gray'}
          {...provided.droppableProps}
        >
          <Text>Drop here</Text>
          {droppedItems.map((item, index) => {
            return (
              <Draggable key={item?.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.type === 'HEADING' ? (
                      <HeadingType {...item} />
                    ) : (
                      <Text textTransform='capitalize'>
                        {item.type.toLowerCase()}
                      </Text>
                    )}
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

export default DroppableAreas;
