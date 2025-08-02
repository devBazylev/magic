import styled from 'styled-components';
import { Link } from 'react-router-dom';

export type ErrorProps = {
  size?: number;
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const H1 = styled.h1<ErrorProps>`
  margin: 0;
  font-size: ${(props) => props.size ? `${props.size}px` : 'inherit'};
  color: red;
`;

const A = styled(Link)<ErrorProps>`
  font-size: ${(props) => props.size ? `${props.size}px` : 'inherit'};
  color: #3e92ec;
`;

export {
  Div,
  H1,
  A,
};
