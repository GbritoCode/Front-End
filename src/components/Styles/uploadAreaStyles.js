import styled from "styled-components";

export const FileUploadContainer = styled.section`
  position: relative;
  width: 66.67%;
  margin: 0 0 15px;
  margin-right: 5px;
  border: 2px dotted lightgray;
  padding: 9px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  float: left;
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

export const InputLabel = styled.label`
  top: -21px;
  font-size: 13px;
  color: black;
  left: 0;
  position: absolute;
`;

export const DragDropText = styled.p`
  letter-spacing: 2px;
  margin-top: 0;
  text-align: center;
  font-weight: 10;
  color: blue;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid #3498db;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  font-weight: 700;
  border-radius: 6px;
  color: #3498db;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: "Open Sans", sans-serif;
  width: 65%;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: #3498db;
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: 22px;
    margin-right: 5px;
    border-right: 2px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }

  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  margin-bottom: 15px;

  span {
    font-size: 8px;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div`
  display: ${props => (props.isImageFile ? "none" : "flex")};
  width: 95%;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  background-color: rgba(5, 5, 5, 0.55);
  font-size: 8px;
  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  margin: 0 0 0 0;
  width: 50%;
  height: 64px;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0 0;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 95%;
  height: 100%;
`;
