import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

// import { ReactComponent as SquarePollSvg } from '.src/assets/svgs/items.svg';

const PlusSvg = (props: any) => {

  return (
    <>
      <Svg height={50} width={50} viewBox="0 0 448 512" fill={'black'} { ...props }>
        <Path d={"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"}/>
      </Svg>
    </>

  );
};

export default PlusSvg;
