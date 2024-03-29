import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.3);
  backdrop-filter: blur(1px);
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  & .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;

    & .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
    & .modal-content.smallModal {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
      max-width: 50%;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  min-height: 50px;
  min-width: 50px;
  max-height: 80%;
  max-width: 90%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
  overflow-y: auto;
  th {
    font-weight: 1;
  }
  .col-md-4 {
    padding: 15px 15px 15px 0;
  }
`;

export const Header = styled.div`
  position: relative;
  padding: 5px 0px;
  box-sizing: border-box;
  min-width: 50px;
  height: 15%;
  max-width: 100%;
  background-color: white;
  border-radius: 2px;

  h4.modalHeader {
    text-align: left;
    fontSize: 18px
    color: #1d253b;
  }
`;
export const Footer = styled.div`
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    color: #767676;
    &:hover {
      color: #1e8bf8;
    }
  }
`;
