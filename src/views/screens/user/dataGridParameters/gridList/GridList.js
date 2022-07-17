import React from 'react';
import useViews from 'views';

export default function GridList() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableList} = useTables();

  return (
    <>
      <TableList />
    </>
  );
}
