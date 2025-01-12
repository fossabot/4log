import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  TransitionPortal,
  TransitionState,
} from 'gatsby-plugin-transition-link';
import { TimelineLite, Power1 } from 'gsap';
// Utils
import { rhythm } from '@style/typography';
// Components
import TOC from '@molecule/TOC';

enum TransitionStatusList {
  entering = 'entering',
  entered = 'entered',
  exited = 'exited',
  exiting = 'exiting',
}
interface TransitionStateType {
  mount: boolean;
  transitionStatus: TransitionStatusList;
}

const TocView = styled.div`
  --margin: 45px;
  position: fixed;
  top: calc(var(--margin) + ${rhythm(1)});
  left: 55%;
  transform: translateX(calc(960px / 2 + var(--margin) / 2));
  opacity: 0;
  height: calc(100vh - var(--margin) - ${rhythm(2)});
  overflow-y: scroll;
  padding-right: 16px;
`;

interface Props {
  data: Array<string>;
}

export default ({ data }: Props) => {
  useEffect(() => {
    const tl = new TimelineLite();
    tl.to(['.TocEl'], 0.6, {
      opacity: 1,
      delay: 0.5,
      left: '50%',
      ease: Power1.easeIn,
    });
  });

  return (
    <TransitionPortal>
      <TransitionState>
        {({ mount, transitionStatus }: TransitionStateType) => {
          if (transitionStatus === TransitionStatusList.entered && mount)
            return (
              <TocView className="TocEl">
                <TOC data={data} />
              </TocView>
            );
          return null;
        }}
      </TransitionState>
    </TransitionPortal>
  );
};
