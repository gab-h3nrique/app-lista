import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const ListSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 512 512" fill={'black'} { ...props }>
        <Path d={"M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"}/>
      </Svg>
    </>

  );
};

export default ListSvg;