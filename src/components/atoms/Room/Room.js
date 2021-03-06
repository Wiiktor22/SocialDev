import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Text from '../Text/Text';
import { auth } from '../../../firebase/firebase';
import RemoveIcon from '../../../assets/delete.svg';
import isUserOwnerShip from '../../../utils/isUserOwnerShip';

const StyledRoomWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #e6ecf1;
  border-top: none;
  padding: 2rem 3rem;
  :focus,
  :hover {
    background-color: #f5f8fa;
    cursor: pointer;
  }

  ${({ heading }) =>
    heading &&
    css`
      border: none;
      background-color: #f5f8fa;
      width: 100%;
      height: 10%;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 3rem;
    `}
`;
const StyledButtonWrapper = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.button`
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 60% 60%;
  background-color: transparent;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 2rem;
  z-index: 5;

  :focus,
  :hover {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.primaryColor};
  }

  ${({ remove }) =>
    remove &&
    css`
      :focus,
      :hover {
        background-color: hsla(341, 75%, 51%, 0.2);
      }
    `}
`;
const StyledLink = styled(Link)`
  height: 100%;
  width: 80%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledText = styled(Text)`
  padding: 0;
  margin: 0;
`;

const Room = ({ title, id, user, handleRemove }) => {
  const currentUser = auth.currentUser;

  return (
    <StyledRoomWrapper key={id} tabIndex="0">
      {isUserOwnerShip(currentUser, user) ? (
        <>
          <StyledLink to={`/rooms/${id}`}>
            <StyledText as="h2">{title}</StyledText>
          </StyledLink>
          <StyledButtonWrapper>
            <StyledIcon tabIndex="0" remove icon={RemoveIcon} onClick={() => handleRemove(id)} />
          </StyledButtonWrapper>
        </>
      ) : (
        <StyledLink to={`/rooms/${id}`}>
          <Text as="h2">{title}</Text>
        </StyledLink>
      )}
    </StyledRoomWrapper>
  );
};

Room.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.object,
  handleRemove: PropTypes.func,
};

Room.defaultProps = {
  user: {},
  handleRemove: () => {},
};

export default Room;
