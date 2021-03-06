import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import {FunctionName} from 'app/components/events/interfaces/frame';
import space from 'app/styles/space';
import {t} from 'app/locale';

type Props = {
  frame: object;
  onShowAllImages: () => void;
};

const ImageForBar: React.FC<Props> = ({frame, onShowAllImages}) => {
  return (
    <Wrapper>
      <MatchedFunctionWrapper>
        <MatchedFunctionCaption>{t('Image for: ')}</MatchedFunctionCaption>
        <FunctionName frame={frame} />
      </MatchedFunctionWrapper>
      <ResetAddressFilterCaption onClick={onShowAllImages}>
        {t('Show all images')}
      </ResetAddressFilterCaption>
    </Wrapper>
  );
};

ImageForBar.propTypes = {
  frame: PropTypes.object.isRequired,
  onShowAllImages: PropTypes.func.isRequired,
};

const Wrapper = styled('div')`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: ${space(0.5)} ${space(2)};
  background: ${p => p.theme.whiteDark};
  border-bottom: 1px solid ${p => p.theme.borderDark};
  font-weight: 700;
  code {
    color: ${p => p.theme.blueDark};
    font-size: ${p => p.theme.fontSizeSmall};
    background: ${p => p.theme.whiteDark};
  }
  a {
    color: ${p => p.theme.blueDark};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MatchedFunctionWrapper = styled('div')`
  display: flex;
  align-items: baseline;
`;

const MatchedFunctionCaption = styled('span')`
  font-size: ${p => p.theme.fontSizeSmall};
  font-weight: 400;
  color: ${p => p.theme.gray2};
  flex-shrink: 0;
`;

const ResetAddressFilterCaption = styled('a')`
  display: flex;
  flex-shrink: 0;
  padding-left: ${space(0.5)};
  font-size: ${p => p.theme.fontSizeSmall};
  font-weight: 400;
  color: ${p => p.theme.gray2} !important;
  &:hover {
    color: ${p => p.theme.gray2} !important;
  }
`;

export default ImageForBar;
